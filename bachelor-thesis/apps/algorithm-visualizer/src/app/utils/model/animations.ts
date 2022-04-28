import { Colors } from '../color/colors.enum';
import { Rectangle } from './shapes/rectangle';
import { UpdateColor } from './animations-basic';

export abstract class Animation {
  protected first: number;
  protected second: number;

  protected constructor(first: number, second: number) {
    this.first = first;
    this.second = second;
  }

  abstract execute(array: Rectangle[]): void
}

export class UpdateCurrent extends Animation {
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
    if (array[this.first].color !== Colors.match) new UpdateColor(array[this.first], Colors.default).execute();
    if (this.second < array.length && array[this.second].color !== Colors.match)
      new UpdateColor(array[this.second], Colors.current).execute();
  }
}

export class UpdateMatch extends Animation {
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
    new UpdateColor(array[this.second], Colors.default).execute();
    new UpdateColor(array[this.first], Colors.match).execute();
  }
}

export class UpdateHeight extends Animation {
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

export class UpdateColorSorted extends Animation {
  /**
   * Mark the element on index with sorted color.
   * @param index - position of element in array
   */
  constructor(index: number) {
    super(index, index);
  }

  execute(array: Rectangle[]): void {
    new UpdateColor(array[this.first], Colors.sorted).execute();
  }
}

export class UpdateColorFound extends UpdateColorSorted {
}

export class UpdateColorDefault extends Animation {
  /**
   * Mark the element on index with default color.
   * @param index - position of element in array
   */
  constructor(index: number) {
    super(index, index);
  }

  execute(array: Rectangle[]): void {
    new UpdateColor(array[this.first], Colors.default).execute();
  }
}
