import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {UrlMetadata} from "~/src/app/api/models/url-metadata";

@Injectable({
  providedIn: 'root'
})
export class EmbedService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getUrlMetadata(url: string): Observable<UrlMetadata> {
    return this.httpClient.get(`https://cardyb.bsky.app/v1/extract?url=${url}`)
      .pipe(
        map((res: any) => {
          const metadata = new UrlMetadata();
          metadata.url = res.url;
          metadata.title = res.title;
          metadata.description = res.description;
          metadata.imageUrl = res.image;
          metadata.likelyType = res.likely_type;
          metadata.error = res.error;
          return metadata;
        })
      )
  }
}
