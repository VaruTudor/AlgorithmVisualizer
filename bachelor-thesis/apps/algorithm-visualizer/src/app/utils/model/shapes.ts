interface IBasicRectangle {
  height: number;
  width: number;
  color: string;
}

export class BasicRectangle implements IBasicRectangle {

  constructor(height: number, width: number, color: string) {
    this.height = height;
    this.width = width;
    this.color = color;
  }

  color: string;
  height: number;
  width: number;
}
