import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'linkExtractorStarterPack',
})
export class LinkExtractorStarterPackPipe implements PipeTransform {
  transform(uri: string, handle?: string): string {
    let url = 'https://bsky.app/starter-pack/';

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

      // Remove slash
      const rkey = uri.substring(uri.indexOf('/') + 1);

      return url + authority + '/' + rkey;
    }
  }
}
