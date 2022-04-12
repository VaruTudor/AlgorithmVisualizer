import { Component, OnInit } from '@angular/core';
import { Node } from '../utils/model/shapes';
import { Sizes } from '../utils/model/sizes.enum';
import { Colors } from '../utils/model/colors.enum';
import { dijkstra } from '../algorithms/pathfinding/dijkstra';

enum ConfigType{
  DEFAULT,
  START_NODE,
  END_NODE,
  WALL

}

@Component({
  selector: 'app-pathfinding',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.css']
})
export class PathfindingComponent implements OnInit {
  disabledStatus = false;
  array: Node[][];
  nrRows = 20;
  nrColumns = 40;

  nodeSize = Sizes.medium;
  startRow = 10;
  startColumn = 5;
  endRow = 10;
  endColumn = 34;
  configType = ConfigType.DEFAULT;

  constructor() {
  }

  ngOnInit(): void {
    this.resetGrid();
  }

  resetGrid() {
    this.array = [];
    for (let i = 0; i < this.nrRows; i++) {
      let row: Node[] = [];
      for (let j = 0; j < this.nrColumns; j++) {
        row.push(
          new Node(
            this.nodeSize, this.getInitialNodeColor(i, j), i, j,
            (i === this.startRow && j === this.startColumn),
            (i === this.endRow && j === this.endColumn)
          )
        );
      }
      this.array.push(row);
    }
  }

  executeAnimations() {
    console.log(dijkstra(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]));
  }

  private getInitialNodeColor(row: number, column: number): string {
    if (row === this.startRow && column === this.startColumn) return Colors.start;
    if (row === this.endRow && column === this.endColumn) return Colors.end;
    return Colors.defaultColor;
  }
}
