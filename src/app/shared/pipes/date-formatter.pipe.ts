import {Pipe, PipeTransform} from '@angular/core';
import {formatDistanceToNowStrict} from "date-fns";

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: string | Date): string {
    return formatDistanceToNowStrict(value, {
     locale: {
       formatDistance: (unit, count) => {
         switch (true) {
           case unit === 'xSeconds':
             return `${count}s`;

           case unit === 'xMinutes':
             return `${count}m`;

           case unit === 'xHours':
             return `${count}h`;

           case unit === 'xDays':
             return `${count}d`;

           case unit === 'xMonths':
             return `${count}mon`;

           case unit === 'xYears':
             return `${count}y`;
         }

         return '%d hours';
       }
     }
    });
  }
}
