import { Rectangle } from '../../../utils/model/shapes';

export abstract class Animation {
  abstract execute(): void
}

export class ColorChange extends Animation{
  element: Rectangle;
  color: string;

  constructor(element: Rectangle, color: string) {
    super();
    this.element = element;
    this.color = color;
  }

  execute(): void {
    this.element.color = this.color;
  }
}
