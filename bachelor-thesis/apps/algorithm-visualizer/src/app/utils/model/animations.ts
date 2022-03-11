import { BasicRectangle } from './shapes';
import { Colors } from './colors.enum';

export abstract class BasicAnimation {
  first: number;
  second: number;

  protected constructor(first: number, second: number) {
    this.first = first;
    this.second = second;
  }

  abstract execute(array: BasicRectangle[]): void
}

export class CurrentChange extends BasicAnimation {
  constructor(first: number, second: number) {
    super(first, second);
  }

  execute(array: BasicRectangle[]): void {
    array[this.first].color = Colors.defaultColor;
    if (this.second < array.length){
      array[this.second].color = Colors.currentElementColor;
    }
  }
}

export class BetterMatchFind extends BasicAnimation {
  constructor(first: number, second: number) {
    super(first, second);
  }

  execute(array: BasicRectangle[]): void {
    array[this.first].color = Colors.currentBestMatchElementColor;
    array[this.second].color = Colors.defaultColor;
  }
}

export class HeightChange extends BasicAnimation {
  constructor(first: number, second: number) {
    super(first, second);
  }

  execute(array: BasicRectangle[]): void {
    array[this.first].height = this.second;
  }
}

export class SortedMark extends BasicAnimation {
  constructor(first: number, second: number) {
    super(first, second);
  }

  execute(array: BasicRectangle[]): void {
    array[this.first].color = Colors.sortedColor;
  }
}

export class DefaultMark extends BasicAnimation {
  constructor(first: number, second: number) {
    super(first, second);
  }

  execute(array: BasicRectangle[]): void {
    array[this.first].color = Colors.defaultColor;
  }
}
