import { Component, OnInit } from '@angular/core';
import { Sizes } from '../utils/model/sizes.enum';
import { Colors } from '../utils/model/colors.enum';
import { dijkstra } from '../algorithms/pathfinding/dijkstra';
import { getShortestPath } from '../algorithms/pathfinding/utils/helper-functions';
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

  elementSize = Sizes.medium;
  startRow = 10;
  startColumn = 5;
  endRow = 10;
  endColumn = 34;
  configType = ConfigType.DEFAULT;
  isMousePressed = false;

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
            this.elementSize, this.getInitialElementColor(i, j), i, j,
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
    // const animations = dijkstra(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
    // const animations = bfs(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
    // const animations = dfs(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
    const animations = aStar(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        animations[i].execute();
      }, i * this.delay);
    }

    const shortestPathAnimations = getShortestPath(this.array[this.endRow][this.endColumn]);
    for (let i = animations.length; i < animations.length + shortestPathAnimations.length; i++) {
      setTimeout(() => {
        shortestPathAnimations[i - animations.length].execute();
      }, i * this.delay);
    }

    setTimeout(() => {
      this.disabledStatus = false;
    }, (animations.length + shortestPathAnimations.length) * this.delay);
  }

  handleMouseDown(node: GridElement) {
    this.isMousePressed = true;
    node.markAsWall();
  }

  handleMouseEnter(node: GridElement) {
    if (this.isMousePressed) {
      node.markAsWall();
    }
  }

  handleMouseUp() {
    this.isMousePressed = false;
  }

  private getInitialElementColor(row: number, column: number): string {
    if (row === this.startRow && column === this.startColumn) return Colors.start;
    if (row === this.endRow && column === this.endColumn) return Colors.end;
    return Colors.defaultColor;
  }
}
