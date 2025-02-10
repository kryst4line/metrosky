import {Component, OnInit, WritableSignal} from '@angular/core';
import {PostFeedComponent} from "~/src/app/shared/layout/lists/post-feed/post-feed.component";
import {NotificationFeedComponent} from "~/src/app/shared/layout/lists/notification-feed/notification-feed.component";
import {SidebarComponent} from "~/src/app/shared/components/navigation/sidebar/sidebar.component";
import {PostComposerComponent} from "~/src/app/shared/layout/dialogs/post-composer/post-composer.component";
import {Drawer} from "primeng/drawer";
import {NgIcon} from "@ng-icons/core";
import {PostService} from "~/src/app/api/services/post.service";
import {AppBskyFeedPost, RichText} from "@atproto/api";
import {agent} from "~/src/app/core/bsky.api";
import {from, Subject} from "rxjs";
import {PostComposerEvent} from "~/src/app/api/models/post-composer-event";
import {EmbedType, ExternalEmbed, ImageEmbed, VideoEmbed} from "~/src/app/api/models/embed";
import {DOC_ORIENTATION, NgxImageCompressService} from "ngx-image-compress";
import {MessageService} from "primeng/api";
import {FileUploadModule} from "ng2-file-upload";

@Component({
  selector: 'app-deck',
  imports: [
    PostFeedComponent,
    NotificationFeedComponent,
    SidebarComponent,
    PostComposerComponent,
    Drawer,
    NgIcon,
    FileUploadModule
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
})
export class DeckComponent implements OnInit {
  newPost: WritableSignal<AppBskyFeedPost.Record>;
  creatingPost = false;

  refreshFeeds: Subject<void> = new Subject<void>();
  fileDrop: Subject<File[]> = new Subject<File[]>();

  constructor(
    protected postService: PostService,
    private imageCompressService: NgxImageCompressService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.newPost = this.postService.newPost;
  }

  post(event: PostComposerEvent) {
    this.creatingPost = true;

    const rt = new RichText({
      text: event.text
    });

    Promise.all([
      this.prepareEmbeds(event),
      rt.detectFacets(agent)
    ]).then(() => {
      this.postService.newPost().text = event.text;
      this.postService.newPost().facets = rt.facets;
      this.postService.newPost().createdAt = new Date().toISOString();

      from(agent.post(this.postService.newPost())).subscribe({
        next: () => {
          this.postService.newPost.set(undefined);
          this.refreshFeeds.next();
        },
        error: err => {
          this.messageService.add({
            icon: 'error',
            severity: 'error',
            summary: 'Oops!',
            detail: err
          });
        }
      }).add(() => this.creatingPost = false);
    });
  }

  prepareEmbeds(event: PostComposerEvent): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!event.mediaEmbed) resolve();

      if (event.mediaEmbed?.type == EmbedType.IMAGE) {
        event.mediaEmbed = event.mediaEmbed as ImageEmbed;

        from(Promise.all(
          event.mediaEmbed.images.map(i => {
            return this.imageCompressService.compressFile(i.thumbnail, DOC_ORIENTATION.Default, undefined, undefined, 2000, 2000)
          })
        )).subscribe({
          next: images64 => {
            from(
              Promise.all(images64.map(image => fetch(image).then(res => res.blob())))
            ).subscribe({
              next: blobs => {
                from(
                  Promise.all(blobs.map(b => agent.uploadBlob(b)))
                ).subscribe({
                  next: upload => {
                    this.newPost().embed = {
                      $type: 'app.bsky.embed.images',
                      images: upload.map(response => {
                        return {
                          alt: '',
                          image: response.data.blob
                        }
                      })
                    };
                    resolve();
                  },
                  error: err => reject(err)
                })
              },
              error: err => reject(err)
            })
          },
          error: err => reject(err)
        });
      }

      if (event.mediaEmbed?.type == EmbedType.VIDEO) {
        event.mediaEmbed = event.mediaEmbed as VideoEmbed;
        resolve();
      }

      if (event.mediaEmbed?.type == EmbedType.EXTERNAL) {
        event.mediaEmbed = event.mediaEmbed as ExternalEmbed;
        resolve();
      }
    });
  }

  onFileDrop($event: any) {
    this.postService.attachEmbed($event, this.fileDrop);
  }
}
