import {Pipe, PipeTransform} from '@angular/core';
import {DeckColumnType, GeneratorDeckColumn} from "@models/deck-column";

@Pipe({
  name: 'isDeckColumnGenerator'
})
export class IsDeckColumnGeneratorPipe implements PipeTransform {
  transform(value: unknown): value is GeneratorDeckColumn {
    const typedValue = value as GeneratorDeckColumn;
    return typedValue && typedValue.type && typedValue.type == DeckColumnType.GENERATOR;
  }
}
