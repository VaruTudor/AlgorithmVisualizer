import {
  Component,
  OnInit
} from '@angular/core';
import { getRandomInt } from '../utils/computations';
import { Colors } from '../utils/model/colors.enum';
import { selectionSort } from '../algorithms/sorting/selection-sort';
import { bubbleSort } from '../algorithms/sorting/bubble-sort';
import { Sizes } from '../utils/model/sizes.enum';
import { insertionSort } from '../algorithms/sorting/insertion-sort';
import { mergeSort } from '../algorithms/sorting/merge-sort';
import { Rectangle } from '../utils/model/shapes/rectangle';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})

export class SortingComponent implements OnInit {
  array: Rectangle[];
  length = 20;
  delay = 30;
  disabledStatus = false;
  minElementHeight = 5;
  maxElementHeight = 700;

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
        new Rectangle(
          getRandomInt(this.minElementHeight, this.maxElementHeight), Sizes.small, Colors.default));
    }
  }

  executeAnimations(): void {
    this.disabledStatus = true;
    let heights = this.array.map(element => element.height);
    const animations = bubbleSort(heights.slice());
    // const animations = insertionSort(heightsArray.slice());
    // const animations = selectionSort(heightsArray.slice());
    // const animations = mergeSort(heightsArray.slice());
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        animations[i].execute(this.array);
      }, i * this.delay);
    }

    setTimeout(() => {
      this.disabledStatus = false;
    }, animations.length * this.delay);
  }
}
