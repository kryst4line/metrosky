import {Injectable, signal, WritableSignal} from "@angular/core";
import {
  $Typed,
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  AppBskyEmbedVideo,
  AppBskyFeedDefs,
  RichText
} from "@atproto/api";
import {from, Subject} from "rxjs";
import {EmbedType, ExternalEmbed, ImageEmbed, VideoEmbed} from "@models/embed";
import {DOC_ORIENTATION, NgxImageCompressService} from "ngx-image-compress";
import {HttpErrorResponse} from "@angular/common/http";
import {PostCompose} from '@models/post-compose';
import {agent} from '@core/bsky.api';
import {MskyDialogService} from '@services/msky-dialog.service';

export const posts: Map<string, WritableSignal<AppBskyFeedDefs.PostView>> =
  new Map<string, WritableSignal<AppBskyFeedDefs.PostView>>();

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public postCompose: WritableSignal<PostCompose> = signal(undefined);
  public refreshFeeds: Subject<void> = new Subject<void>();

  constructor(
    private dialogService: MskyDialogService,
    private imageCompressService: NgxImageCompressService
  ) {}

  setPost(post: AppBskyFeedDefs.PostView): WritableSignal<AppBskyFeedDefs.PostView> {
    const existingPost = posts.get(post.uri);
    if (existingPost) {
      existingPost.set(post);
      return existingPost;
    } else {
      const newPost = signal(post);
      posts.set(post.uri, newPost);
      return newPost;
    }
  }

  getPost(uri: string): WritableSignal<AppBskyFeedDefs.PostView> | undefined {
    return posts.get(uri);
  }

  createPost() {
    if (this.postCompose()) return;

    this.postCompose.set(new PostCompose());
    this.dialogService.openPostComposer(this.postCompose);
  }

  like(uri: string, cid: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      from(agent.like(uri, cid)).subscribe({
        next: () => {
          agent.getPosts({
            uris: [uri]
          }).then(response => {
            this.setPost(response.data.posts[0]);
            resolve();
          });
        }, error: err => reject(err.message)
      })
    })
  }

  deleteLike(uri: string, likeKey: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      from(agent.deleteLike(likeKey)).subscribe({
        next: () => {
          agent.getPosts({
            uris: [uri]
          }).then(response => {
            this.setPost(response.data.posts[0]);
            resolve();
          });
        }, error: err => reject(err.message)
      })
    })
  }

  repost(uri: string, cid: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      from(agent.repost(uri, cid)).subscribe({
        next: () => {
          agent.getPosts({
            uris: [uri]
          }).then(response => {
            this.setPost(response.data.posts[0]);
            resolve();
          });
        }, error: err => reject(err.message)
      });
    });
  }

  deleteRepost(uri: string, repostKey: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      from(agent.deleteRepost(repostKey)).subscribe({
        next: () => {
          agent.getPosts({
            uris: [uri]
          }).then(response => {
            this.setPost(response.data.posts[0]);
            resolve();
          });
        }, error: err => reject(err.message)
      });
    });
  }

  renewRepost(uri: string, cid: string, repostKey: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      from(agent.deleteRepost(repostKey)).subscribe({
        next: () => {
          from(agent.repost(uri, cid)).subscribe({
            next: () => {
              agent.getPosts({
                uris: [uri]
              }).then(response => {
                this.setPost(response.data.posts[0]);
                resolve();
              });
            }, error: err => reject(err.message)
          });
        }, error: err => reject(err.message)
      });
    });
  }

  replyPost(uri: string) {
    if (!this.postCompose()) this.createPost();

    agent.getPostThread({
      uri: uri
    }).then(response => {
      if (!AppBskyFeedDefs.isThreadViewPost(response.data.thread)) return;
      this.setPost(response.data.thread.post as AppBskyFeedDefs.PostView);

      let root;
      if (AppBskyFeedDefs.isThreadViewPost(response.data.thread.parent)) {
        root = response.data.thread.parent;

        while (AppBskyFeedDefs.isThreadViewPost(root.parent)) {
          root = root.parent;
        }

        root = root.post;
      } else {
        root = response.data.thread.post;
      }

      let replyRef = {
        parent: {
          uri: (response.data.thread.post).uri,
          cid: (response.data.thread.post).cid
        },
        root: {
          uri: root.uri,
          cid: root.cid
        },
      };

      this.postCompose().post.update(post => {
        post.reply = replyRef;
        return post;
      });

      this.postCompose().reply.set(response.data.thread.post);
    });
  }

  quotePost(uri:string) {
    if (!this.postCompose()) this.createPost();

    agent.getPosts({
      uris: [uri]
    }).then(response => {
      if (!response.data.posts[0]) return;
      const quotedPost = this.setPost(response.data.posts[0]);

      if (!this.postCompose()) this.createPost();
      this.postCompose().recordEmbed.set({
        $type: 'app.bsky.embed.record#viewRecord',
        uri: quotedPost().uri,
        cid: quotedPost().cid,
        author: quotedPost().author,
        indexedAt: quotedPost().indexedAt,
        value: quotedPost().record,
        embeds: [quotedPost().embed]
      } as $Typed<AppBskyEmbedRecord.ViewRecord>);
    });
  }

  attachMedia(files: File[]) {
    if (!files.length) return;
    if (!this.postCompose()) this.createPost();

    //Fix array methods because it comes as FileList
    files = Array.from(files);

    if (files.some(f => f.type.includes('image'))) {
      //Filelist has images
      if (!this.postCompose().mediaEmbed()) {
        this.postCompose().mediaEmbed.set(new ImageEmbed());
      }
      if (this.postCompose().mediaEmbed().type == EmbedType.IMAGE) {
        const imageEmbed = this.postCompose().mediaEmbed as WritableSignal<ImageEmbed>;

        //Our embed list is for images
        files.forEach(file => {
          if (file.type.includes('image') && imageEmbed().images.length < 4) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
              const newEmbed = new ImageEmbed();
              newEmbed.images = [...imageEmbed().images, {data: event.srcElement.result, alt: ''}];
              imageEmbed.set(newEmbed);
            };
            reader.readAsDataURL(file);
          }
        })
      }
    } else if (files.some(f => f.type.includes('video'))) {
      const videoEmbed = this.postCompose().mediaEmbed as WritableSignal<VideoEmbed>;

      //Filelist has video
      while (!videoEmbed()) {
        files.forEach(file => {
          if (file.type.includes('video')) {
            videoEmbed.set(new VideoEmbed(file, undefined));
          }
        });
      }
    }
  }

  publishPost(): Promise<void> {
    return new Promise((resolve, reject) => {
      const rt = new RichText({
        text: this.postCompose().post().text
      });

      Promise.all([
        this.prepareRecord(),
        this.prepareMedia(),
        rt.detectFacets(agent)
      ]).then(([record, media]) => {
        if (record && media) {
          this.postCompose().post().embed = {
            $type: 'app.bsky.embed.recordWithMedia',
            record: record,
            media: media
          } as $Typed<AppBskyEmbedRecordWithMedia.Main>;
        } else {
          this.postCompose().post().embed = record ?? media;
        }
        this.postCompose().post.update(post => {
          post.text = rt.text;
          post.facets = rt.facets;
          post.createdAt = new Date().toISOString();
          return post;
        });

        from(agent.post(this.postCompose().post())).subscribe({
          next: () => {
            this.postCompose.set(undefined);

            setTimeout(() => {
              this.refreshFeeds.next();
            }, 1e3);

            resolve();
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          }
        });
      });
    });
  }

  private prepareRecord(): Promise<$Typed<AppBskyEmbedRecord.Main>> {
    return new Promise(resolve => {
      if (!this.postCompose().recordEmbed()) {
        resolve(undefined)
      } else {
        resolve({
          $type: 'app.bsky.embed.record',
          record: {
            uri: this.postCompose().recordEmbed().uri,
            cid: this.postCompose().recordEmbed().cid
          }
        });
      }
    });
  }

  private prepareMedia(): Promise<$Typed<AppBskyEmbedImages.Main> | $Typed<AppBskyEmbedVideo.Main> | $Typed<AppBskyEmbedExternal.Main>> {
    return new Promise((resolve, reject) => {
      if (!this.postCompose().mediaEmbed()) resolve(undefined);

      if (this.postCompose().mediaEmbed()?.type == EmbedType.IMAGE) {
        const imageEmbed = this.postCompose().mediaEmbed as WritableSignal<ImageEmbed>;

        from(Promise.all(
          imageEmbed().images.map(i => {
            return this.imageCompressService.compressFile(i.data, DOC_ORIENTATION.Default, undefined, undefined, 2000, 2000);
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
                    resolve({
                      $type: 'app.bsky.embed.images',
                      images: upload.map(response => {
                        return {
                          alt: '',
                          image: response.data.blob
                        }
                      })
                    } as $Typed<AppBskyEmbedImages.Main>);
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

      if (this.postCompose().mediaEmbed()?.type == EmbedType.VIDEO) {
        // const videoEmbed = this.postCompose().mediaEmbed as WritableSignal<VideoEmbed>;
        resolve(undefined);
      }

      if (this.postCompose().mediaEmbed().type == EmbedType.EXTERNAL) {
        const externalEmbed = this.postCompose().mediaEmbed as WritableSignal<ExternalEmbed>;

        from(
          fetch(externalEmbed().metadata.imageUrl)
            .then(res => res.blob())
            .then(blob => agent.uploadBlob(blob))
        ).subscribe({
          next: response => {
            resolve({
              $type: 'app.bsky.embed.external',
              external: {
                uri: externalEmbed().metadata.url,
                title: externalEmbed().metadata.title,
                description: externalEmbed().metadata.description,
                thumb: response.data.blob
              }
            } as $Typed<AppBskyEmbedExternal.Main>)
          }, error: err => reject(err)
        })
      }
    });
  }
}
