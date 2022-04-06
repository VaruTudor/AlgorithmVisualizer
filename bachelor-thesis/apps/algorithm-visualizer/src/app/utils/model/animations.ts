import { Rectangle } from './shapes';
import { Colors } from './colors.enum';

export abstract class BasicAnimation {
  first: number;
  second: number;

  protected constructor(first: number, second: number) {
    this.first = first;
    this.second = second;
  }

  abstract execute(array: Rectangle[]): void
}

export class CurrentChange extends BasicAnimation {
  constructor(first: number, second: number) {
    super(first, second);
  }

  execute(array: Rectangle[]): void {
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

  execute(array: Rectangle[]): void {
    array[this.second].color = Colors.defaultColor;
    array[this.first].color = Colors.currentBestMatchElementColor;
  }
}

export class HeightChange extends BasicAnimation {
  constructor(first: number, second: number) {
    super(first, second);
  }

  execute(array: Rectangle[]): void {
    array[this.first].height = this.second;
  }
}

export class SortedMark extends BasicAnimation {
  constructor(first: number, second: number) {
    super(first, second);
  }

  execute(array: Rectangle[]): void {
    array[this.first].color = Colors.sortedColor;
  }
}

export class FoundMark extends SortedMark {}

export class DefaultMark extends BasicAnimation {
  /**
   * Mark the element on index with default color
   * @param index - element index in array
   */
  constructor(index: number) {
    super(index, index);
  }

  execute(array: Rectangle[]): void {
    array[this.first].color = Colors.defaultColor;
  }
}
