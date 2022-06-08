import { Component, OnInit, ViewChild } from '@angular/core';
import { Sizes } from '../utils/model/sizes.enum';
import { Colors } from '../utils/theme/colors.enum';
import { dijkstra } from '../algorithms/pathfinding/dijkstra';
import { getShortestPath } from '../algorithms/pathfinding/utils/helper-functions';
import { GridElement } from '../utils/model/shapes/grid-element';
import { AlgorithmNames, Algorithms, AlgorithmSections } from '../utils/model/algorithms';
import { Delays } from '../utils/model/delays';
import { ComponentSizes } from '../utils/model/component-sizes';
import { Location } from '@angular/common';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { AnimationBasic } from '../utils/model/animations-basic';
import { dfs } from '../algorithms/pathfinding/dfs';
import { aStar } from '../algorithms/pathfinding/aStar';
import { bfs } from '../algorithms/pathfinding/bfs';

@Component({
  selector: 'app-pathfinding',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.css']
})
export class PathfindingComponent implements OnInit {
  @ViewChild(TopNavComponent, { static: false })
  private topNavComponent: TopNavComponent;

  private nrRows: number = 16;
  private nrColumns: number = 52;

  private delay: Delays = Delays.normal;
  private size: Sizes = Sizes.medium;
  private name: AlgorithmNames;

  private startRow: number = 1; //TODO make configurable (remove from updateSize)
  private startColumn: number = 1;
  private endRow: number = this.nrRows - 2;
  private endColumn: number = this.nrColumns - 2;
  private isMousePressed: boolean = false;

  private enteredStartNode: boolean = false;
  private enteredEndNode: boolean = false;

  isAlgorithmSelected: boolean = false;
  array: GridElement[][];
  section = AlgorithmSections;

  constructor(private _location: Location) {
  }

  ngOnInit(): void {
    this.resetGrid();
  }

  resetGrid() {
    this.array = [...Array(this.nrRows)].map((_, i) => {
      return ([...Array(this.nrColumns)].map((_, j) => new GridElement(this.size,
        this.getInitialElementColor(i, j), i, j, (i === this.startRow && j === this.startColumn),
        (i === this.endRow && j === this.endColumn)
      )));
    });
  }

  executeAnimations() {
    this.topNavComponent.isDisabled = true;
    let animations: AnimationBasic[] = [];
    switch (this.name) {
      case AlgorithmNames.dijkstra: {
        animations = dijkstra(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
        break;
      }
      case AlgorithmNames.bfs: {
        animations = bfs(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
        break;
      }
      case AlgorithmNames.dfs: {
        animations = dfs(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
        break;
      }
      case AlgorithmNames.aStar: {
        animations = aStar(this.array, this.array[this.startRow][this.startColumn], this.array[this.endRow][this.endColumn]);
        break;
      }
    }
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
      this.topNavComponent.isDisabled = false;
    }, (animations.length + shortestPathAnimations.length) * this.delay);
  }

  handleMouseDown(node: GridElement) {
    this.isMousePressed = true;
    if (node.isStart) {
      this.enteredStartNode = true;
    } else if (node.isEnd) {
      this.enteredEndNode = true;
    } else {
      node.markAsWall();
    }
  }

  handleMouseEnter(node: GridElement) {
    if (this.isMousePressed) {
      if (this.enteredStartNode) {
        if (!node.isEnd) this.updateStartNode(node);
      } else if (this.enteredEndNode) {
        if (!node.isStart) this.updateEndNode(node);
      } else {
        node.markAsWall();
      }
    }
  }

  handleMouseUp() {
    this.enteredStartNode = false;
    this.enteredEndNode = false;
    this.isMousePressed = false;
  }

  private updateStartNode(node: GridElement) {
    let previous = this.array[this.startRow][this.startColumn];
    previous.isStart = false;
    previous.color = Colors.default;
    this.startRow = node.row;
    this.startColumn = node.column;
    node.unmarkAsWall();
    node.color = this.getInitialElementColor(node.row, node.column);
    node.isStart = true;
  }

  private updateEndNode(node: GridElement) {
    let previous = this.array[this.endRow][this.endColumn];
    previous.isEnd = false;
    previous.color = Colors.default;
    this.endRow = node.row;
    this.endColumn = node.column;
    node.unmarkAsWall();
    node.color = this.getInitialElementColor(node.row, node.column);
    node.isEnd = true;
  }

  private getInitialElementColor(row: number, column: number): string {
    if (row === this.startRow && column === this.startColumn) return Colors.start;
    if (row === this.endRow && column === this.endColumn) return Colors.end;
    return Colors.default;
  }

  onDelay(delay: Delays) {
    this.delay = delay;
    this.resetGrid();
  }

  onBack() {
    this._location.back();
  }

  private updateSize(size: Sizes, nrRows: number, nrColumns: number) {
    this.size = size;
    this.nrRows = nrRows;
    this.nrColumns = nrColumns;
    this.endRow = this.nrRows - 2;
    this.endColumn = this.nrColumns - 2;
    this.resetGrid();
  }

  onSize(size: ComponentSizes) {
    switch (size) {
      case ComponentSizes.small: {
        this.updateSize(Sizes.smallMedium, 20, 68);
        break;
      }
      case ComponentSizes.medium: {
        this.updateSize(Sizes.medium, 16, 52);
        break;
      }
      case ComponentSizes.large: {
        this.updateSize(Sizes.large, 8, 28);
        break;
      }
    }
  }

  onAlgorithm(selectedAlgorithm: string) {
    this.name = Algorithms.PATHFINDING.filter(algorithm => algorithm === selectedAlgorithm)[0];
    this.resetGrid();
    this.isAlgorithmSelected = true;
  }
}
