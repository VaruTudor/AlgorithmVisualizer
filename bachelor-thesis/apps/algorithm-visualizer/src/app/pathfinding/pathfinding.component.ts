import { Component, OnInit } from '@angular/core';
import { Sizes } from '../utils/model/sizes.enum';
import { Colors } from '../utils/model/colors.enum';
import { dijkstra } from '../algorithms/pathfinding/dijkstra';
import { getNodesInShortestPathOrder } from '../algorithms/pathfinding/utils/helper-functions';
import { bfs } from '../algorithms/pathfinding/bfs';
import { dfs } from '../algorithms/pathfinding/dfs';
import { aStar } from '../algorithms/pathfinding/aStar';
import { GridElement } from '../utils/model/shapes/grid-element';

enum ConfigType {
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
  array: GridElement[][];
  nrRows = 20;
  nrColumns = 40;
  delay = 5;

  nodeSize = Sizes.medium;
  startRow = 10;
  startColumn = 5;
  endRow = 10;
  endColumn = 34;
  configType = ConfigType.DEFAULT;
  mouseIsPressed = false;

  constructor() {
  }

  ngOnInit(): void {
    this.resetGrid();
  }

  resetGrid() {
    this.array = [];
    for (let i = 0; i < this.nrRows; i++) {
      let row: GridElement[] = [];
      for (let j = 0; j < this.nrColumns; j++) {
        row.push(
          new GridElement(
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
    this.disabledStatus = true;
    // const animationsArray = dijkstra(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
    // const animationsArray = bfs(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
    // const animationsArray = dfs(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
    const animationsArray = aStar(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
    for (let i = 0; i < animationsArray.length; i++) {
      setTimeout(() => {
        animationsArray[i].execute();
      }, i * this.delay);
    }

    const shortestPathAnimationsArray = getNodesInShortestPathOrder(this.array[this.endRow][this.endColumn]);
    for (let i = animationsArray.length; i < animationsArray.length + shortestPathAnimationsArray.length; i++) {
      setTimeout(() => {
        shortestPathAnimationsArray[i - animationsArray.length].execute();
      }, i * this.delay);
    }

    setTimeout(() => {
      this.disabledStatus = false;
    }, (animationsArray.length + shortestPathAnimationsArray.length) * this.delay);
  }

  handleMouseDown(node: GridElement) {
    this.mouseIsPressed = true;
    node.markAsWall();
  }

  handleMouseEnter(node: GridElement) {
    if (this.mouseIsPressed) {
      node.markAsWall();
    }
  }

  handleMouseUp() {
    this.mouseIsPressed = false;
  }

  private getInitialNodeColor(row: number, column: number): string {
    if (row === this.startRow && column === this.startColumn) return Colors.start;
    if (row === this.endRow && column === this.endColumn) return Colors.end;
    return Colors.defaultColor;
  }
}
