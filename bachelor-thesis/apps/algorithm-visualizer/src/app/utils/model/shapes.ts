import { Infinity } from '../computations';
import { Colors } from './colors.enum';

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

export class Node extends Rectangle {
  row: number;
  column: number;
  distance: number;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isWall: boolean;
  previousNode: Node;

  constructor(size: number, color: string, row: number, column: number, isStart: boolean, isEnd: boolean) {
    super(size, size, color);
    this.row = row;
    this.column = column;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.distance = Infinity;
    this.isVisited = false;
    this.isWall = false;
  }

  public markAsWall() {
    if (!this.isWall) this.isWall = true;
    this.color = Colors.wall;
  }

  public markAsVisited() {
    if (!this.isVisited) this.isVisited = true;
  }

  public updatePreviousNode(previous: Node) {
    this.previousNode = previous;
  }

  public updateDistance(newDistance: number) {
    this.distance = newDistance;
  }
}
