import { Component, OnInit } from '@angular/core';
import { BasicRectangle, BasicSquare } from '../utils/model/shapes';
import { Sizes } from '../utils/model/sizes.enum';
import { Colors } from '../utils/model/colors.enum';
import { getRandomInt } from '../utils/computations';
import { mergeSort } from '../algorithms/sorting/merge-sort';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {
  array: BasicSquare[];
  length = 20;
  delay = 300;
  disabledStatus = false;

  squareSize = Sizes.medium;
  min = 1;
  max = 100;
  elementDefaultColor = Colors.defaultColor;

  constructor() {
    this.array = [];
  }

  ngOnInit(): void {
    this.resetArray();
  }

  resetArray(): void {
    this.array = [];
    for (let _ = 0; _ < this.length; _++) {
      this.array.push(
        new BasicSquare(
          this.squareSize, this.elementDefaultColor, getRandomInt(this.min, this.max)));
    }
  }

  executeAnimations(): void {
    this.disabledStatus = true;
    let sizesArray = this.array.map(element => element.size);
    // const animationsArray = bubbleSort(sizesArray.slice());
    // const animationsArray = insertionSort(sizesArray.slice());
    // const animationsArray = selectionSort(sizesArray.slice());
    const animationsArray = mergeSort(sizesArray.slice());
    /*for (let i = 0; i < animationsArray.length; i++) {
      setTimeout(() => {
        animationsArray[i].execute(this.array);
      }, i * this.delay);
    }*/

    setTimeout(() => {
      this.disabledStatus = false;
    }, animationsArray.length * this.delay);
  }

}
