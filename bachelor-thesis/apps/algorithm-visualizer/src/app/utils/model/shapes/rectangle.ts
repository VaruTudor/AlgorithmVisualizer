export class Rectangle {
  constructor(height: number, width: number, color: string) {
    this._height = height;
    this._width = width;
    this._color = color;
  }

  private _height: number;
  get height(): number {return this._height;}
  set height(value: number) {this._height = value;}

  private _width: number;
  get width(): number {return this._width;}
  set width(value: number) {this._width = value;}

  private _color: string;
  get color(): string {return this._color;}
  set color(value: string) {this._color = value;}
}
