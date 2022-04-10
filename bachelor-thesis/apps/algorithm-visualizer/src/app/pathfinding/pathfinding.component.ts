import { Component, OnInit } from '@angular/core';
import { Node, Square } from '../utils/model/shapes';
import { getRandomInt } from '../utils/computations';
import { Sizes } from '../utils/model/sizes.enum';
import { Colors } from '../utils/model/colors.enum';

@Component({
  selector: 'app-pathfinding',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.css']
})
export class PathfindingComponent implements OnInit {
  disabledStatus = false;
  array: Node[];
  nrRows = 20;
  nrColumns = 40;

  nodeSize = Sizes.small;
  elementDefaultColor = Colors.defaultColor;
  startNode = [10, 5];
  endNode = [10, 15];

  constructor() {
  }

  ngOnInit(): void {
  }

  resetGrid() {
    this.array = [];
    for (let i = 0; i < this.nrRows; i++) {
      for (let j = 0; j < this.nrColumns; j++) {
        this.array.push(
          new Node(
            this.nodeSize, this.elementDefaultColor, i, j,
            (i === this.startNode[0] && j === this.startNode[1]),
            (i === this.endNode[0] && j === this.endNode[1])
          )
        );
      }
    }

  }

  executeAnimations() {

  }
}
