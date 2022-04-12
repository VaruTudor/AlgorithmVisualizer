import { Rectangle } from './shapes';
import { Colors } from './colors.enum';

interface Tuple {
  first: number;
  second: number;
}

export abstract class Animation implements Tuple{
  first: number;
  second: number;

  protected constructor(first: number, second: number) {
    this.first = first;
    this.second = second;
  }

  abstract execute(array: Rectangle[]): void
}

export class CurrentChangeAnimation extends Animation {
  /**
   * Mark the element on indexNew with current color and the one on
   * indexPrevious with default color
   * @param indexNew - position of the new current
   * @param indexPrevious - old position of current
   */
  constructor(indexPrevious: number, indexNew: number) {
    super(indexPrevious, indexNew);
  }

  execute(array: Rectangle[]): void {
    array[this.first].color = Colors.defaultColor;
    if (this.second < array.length) {
      array[this.second].color = Colors.currentElementColor;
    }
  }
}

export class BetterMatchAnimation extends Animation {
  /**
   * Mark the element on indexNew with better match color and the one on
   * indexPrevious with default color
   * @param indexNew - position of the new best match
   * @param indexPrevious - old position of best match
   */
  constructor(indexNew: number, indexPrevious: number) {
    super(indexNew, indexPrevious);
  }

  execute(array: Rectangle[]): void {
    array[this.second].color = Colors.defaultColor;
    array[this.first].color = Colors.currentBestMatchElementColor;
  }
}

export class HeightAnimation extends Animation {
  /**
   * Change the height of element on index to newHeight.
   * @param index - position where height will change
   * @param newHeight - new value for height
   */
  constructor(index: number, newHeight: number) {
    super(index, newHeight);
  }

  execute(array: Rectangle[]): void {
    array[this.first].height = this.second;
  }
}

export class SortedAnimation extends Animation {
  /**
   * Mark the element on index with sorted color.
   * @param index - position of element in array
   */
  constructor(index: number) {
    super(index, index);
  }

  execute(array: Rectangle[]): void {
    array[this.first].color = Colors.sortedColor;
  }
}

export class FoundAnimation extends SortedAnimation {
}

export class DefaultAnimation extends Animation {
  /**
   * Mark the element on index with default color.
   * @param index - position of element in array
   */
  constructor(index: number) {
    super(index, index);
  }

  execute(array: Rectangle[]): void {
    array[this.first].color = Colors.defaultColor;
  }
}
