import { Rectangle } from './rectangle';

export class Square extends Rectangle {
  constructor(size: number, color: string, value: number) {
    super(size, size, color);
    this._value = value;
  }

  private _value: number;
  get value(): number {return this._value;}
  set value(value: number) {this._value = value;}
}
