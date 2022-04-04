interface IRectangle {
  height: number;
  width: number;
  color: string;
}

interface ISearchingSquare {
  value: number;
}

export class Rectangle implements IRectangle {
  color: string;
  height: number;
  width: number;

  constructor(height: number, width: number, color: string) {
    this.height = height;
    this.width = width;
    this.color = color;
  }
}

export class Square extends Rectangle implements ISearchingSquare {
  value: number;

  constructor(size: number, color: string, value: number) {
    super(size, size, color);
    this.value = value;
  }
}
