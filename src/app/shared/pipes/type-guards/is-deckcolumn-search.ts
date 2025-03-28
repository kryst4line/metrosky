import {Pipe, PipeTransform} from '@angular/core';
import {DeckColumnType, SearchDeckColumn} from "@models/deck-column";

@Pipe({
  name: 'isDeckColumnSearch'
})
export class IsDeckColumnSearchPipe implements PipeTransform {
  transform(value: unknown): value is SearchDeckColumn {
    const typedValue = value as SearchDeckColumn;
    return typedValue && typedValue.type && typedValue.type == DeckColumnType.SEARCH;
  }
}
