interface IBasicRectangle {
  height: number;
  width: number;
  color: string;
}

export class BasicRectangle implements IBasicRectangle {

  color: string;
  height: number;
  width: number;

  constructor(height: number, width: number, color: string) {
    this.height = height;
    this.width = width;
    this.color = color;
  }
}

interface IBasicSquare{
  size: number;
  color: string;
}

interface ISearchingSquare extends IBasicSquare{
  value: number;
}

export class BasicSquare implements ISearchingSquare {

  size: number;
  color: string;
  value: number;

  constructor(size: number, color: string, value: number) {
    this.size = size;
    this.color = color;
    this.value = value;
  }
}
