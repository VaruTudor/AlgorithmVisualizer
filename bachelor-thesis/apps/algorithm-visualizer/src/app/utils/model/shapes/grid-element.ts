import { Infinity } from '../../computations';
import { Colors } from '../colors.enum';
import { Rectangle } from './rectangle';

export class GridElement extends Rectangle {
  constructor(size: number, color: string, row: number, column: number, isStart: boolean, isEnd: boolean) {
    super(size, size, color);
    this._row = row;
    this._column = column;
    this._isStart = isStart;
    this._isEnd = isEnd;
    this._distance = Infinity;
    this._isVisited = false;
    this._isWall = false;
    this._previousNode = null as any;
  }

  private _row: number;
  get row(): number {return this._row;}
  set row(value: number) {this._row = value;}

  private _column: number;
  get column(): number {return this._column;}

  set column(value: number) {this._column = value;}

  private _distance: number;
  get distance(): number {return this._distance;}
  public updateDistance(newDistance: number) {this._distance = newDistance;}

  private _isStart: boolean;
  get isStart(): boolean {return this._isStart;}
  set isStart(value: boolean) {this._isStart = value;}

  private _isEnd: boolean;
  get isEnd(): boolean {return this._isEnd;}
  set isEnd(value: boolean) {this._isEnd = value;}

  private _isVisited: boolean;
  get isVisited(): boolean {return this._isVisited;}
  public markAsVisited() {if (!this._isVisited) this._isVisited = true;}

  private _isWall: boolean;
  get isWall(): boolean {return this._isWall;}
  public markAsWall() {
    if (!this._isWall) this._isWall = true;
    this.color = Colors.wall;
  }

  private _previousNode: GridElement;
  get previousNode(): GridElement {return this._previousNode;}
  public updatePreviousNode(previous: GridElement) {this._previousNode = previous;}
}
