import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numberFormatter'
})
export class NumberFormatterPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1e5) return (value / 1e3).toFixed() + 'K';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value.toString();
  }
}
