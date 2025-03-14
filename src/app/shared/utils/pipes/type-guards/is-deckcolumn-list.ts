import {Pipe, PipeTransform} from '@angular/core';
import {DeckColumnType, ListDeckColumn} from "~/src/app/api/models/deck-column";

@Pipe({
  name: 'isDeckColumnList'
})
export class IsDeckColumnListPipe implements PipeTransform {
  transform(value: unknown): value is ListDeckColumn {
    const typedValue = value as ListDeckColumn;
    return typedValue && typedValue.type && typedValue.type == DeckColumnType.LIST;
  }
}
