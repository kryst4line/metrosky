import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'as',
  pure: true
})
export class TypeCastPipe implements PipeTransform {

  transform<T>(value: any, _type: (new (...args: any[]) => T) | T): T {
    return value as T;
  }

}
