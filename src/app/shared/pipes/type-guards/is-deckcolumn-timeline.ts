import {Pipe, PipeTransform} from '@angular/core';
import {DeckColumnType, TimelineDeckColumn} from "@models/deck-column";

@Pipe({
  name: 'isDeckColumnTimeline'
})
export class IsDeckColumnTimelinePipe implements PipeTransform {
  transform(value: unknown): value is TimelineDeckColumn {
    const typedValue = value as TimelineDeckColumn;
    return typedValue && typedValue.type && typedValue.type == DeckColumnType.TIMELINE;
  }
}
