import {Pipe, PipeTransform} from '@angular/core';
import {AuthorDeckColumn, DeckColumnType} from "@models/deck-column";

@Pipe({
  name: 'isDeckColumnAuthor'
})
export class IsDeckColumnAuthorPipe implements PipeTransform {
  transform(value: unknown): value is AuthorDeckColumn {
    const typedValue = value as AuthorDeckColumn;
    return typedValue && typedValue.type && typedValue.type == DeckColumnType.AUTHOR;
  }
}
