import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'linkExtractor',
})
export class LinkExtractorPipe implements PipeTransform {
  transform(uri: string, handle?: string): string {
    let url = 'https://bsky.app/profile/';

    if (!uri && !handle) return undefined;
    if (!uri && handle) return url + handle;

    if (uri.includes('at://')) {
      uri = uri.substring(5);
    }

    if (!uri.includes('/')) {
      return url + uri;
    } else {
      let authority;

      if (handle) {
        authority = handle;
      } else {
        authority = uri.substring(0, uri.indexOf('/'))
      }

      // Remove slash
      uri = uri.substring(uri.indexOf('/') + 1);

      let collection = uri.substring(0, uri.indexOf('/'));

      switch (collection) {
        case 'app.bsky.feed.post':
          collection = 'post';
          break;
        case 'app.bsky.feed.generator':
          collection = 'feed';
          break;
        case 'app.bsky.graph.list':
          collection = 'lists';
          break;
      }

      // Remove slash
      const rkey = uri.substring(uri.indexOf('/') + 1);

      return url + authority + '/' + collection + '/' + rkey;
    }
  }
}
