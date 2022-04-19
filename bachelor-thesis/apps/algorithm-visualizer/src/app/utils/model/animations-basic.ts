import { Rectangle } from './shapes/rectangle';

export abstract class AnimationBasic {
  abstract execute(): void
}

export class UpdateColor extends AnimationBasic {
  private _element: Rectangle;
  private readonly _color: string;

  constructor(element: Rectangle, color: string) {
    super();
    this._element = element;
    this._color = color;
  }

  execute(): void {
    this._element.color = this._color;
  }
}
