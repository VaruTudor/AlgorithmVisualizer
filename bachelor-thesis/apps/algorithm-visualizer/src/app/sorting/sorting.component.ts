import {
  Component,
  OnInit
} from '@angular/core';
import { getRandomInt } from '../utils/computations';
import { Colors } from '../utils/model/colors.enum';
import { selectionSort } from '../algorithms/sorting/selection-sort';
import { bubbleSort } from '../algorithms/sorting/bubble-sort';
import { Sizes } from '../utils/model/sizes.enum';
import { BasicRectangle } from '../utils/model/shapes';
import { insertionSort } from '../algorithms/sorting/insertion-sort';
import { mergeSort } from '../algorithms/sorting/merge-sort';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})

export class SortingComponent implements OnInit {
  array: BasicRectangle[];
  length = 10;
  delay = 10;
  disabledStatus = false;

  minElementHeight = 5;
  maxElementHeight = 700;
  elementWidth = Sizes.small;
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
        new BasicRectangle(
          getRandomInt(this.minElementHeight, this.maxElementHeight), this.elementWidth, this.elementDefaultColor));
    }
  }

  executeAnimations(): void {
    this.disabledStatus = true;
    let heightsArray = this.array.map(element => element.height);
    // const animationsArray = bubbleSort(heightsArray.slice());
    // const animationsArray = insertionSort(heightsArray.slice());
    // const animationsArray = selectionSort(heightsArray.slice());
    const animationsArray = mergeSort(heightsArray.slice());
    for (let i = 0; i < animationsArray.length; i++) {
      setTimeout(() => {
        animationsArray[i].execute(this.array);
      }, i * this.delay);
    }

    setTimeout(() => {
      this.disabledStatus = false;
    }, animationsArray.length * this.delay);
  }
}
