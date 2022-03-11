import {
  Component,
  OnInit
} from '@angular/core';
import { getRandomInt } from '../utils/computations';
import { Colors } from '../utils/model/colors.enum';
import { AnimationTypes } from '../utils/model/animation-types.enum';
import { selectionSort } from '../algorithms/sorting/selection-sort';
import { bubbleSort } from '../algorithms/sorting/bubble-sort';
import { Sizes } from '../utils/model/sizes.enum';
import { BasicRectangle } from '../utils/model/basic-shapes';
import { insertionSort } from '../algorithms/sorting/insertion-sort';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})

export class SortingComponent implements OnInit {
  array: BasicRectangle[];
  length = 30;
  delay = 20;
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

  performAnimations(): void {
    this.disabledStatus = true;
    let heightsArray = this.array.map(element => element.height);
    // const animationsArray = bubbleSort(heightsArray.slice());
    const animationsArray = insertionSort(heightsArray.slice());
    // const animationsArray = selectionSort(heightsArray.slice());
    for (let i = 0; i < animationsArray.length; i++) {
      const [type, first, second] = animationsArray[i];

      setTimeout(() => {
        if (type === AnimationTypes.newCurrent) {
            this.array[first].color = Colors.defaultColor;
            this.array[second].color = Colors.currentElementColor;
        } else if (type === AnimationTypes.foundBetterMatch) {
            this.array[first].color = Colors.currentBestMatchElementColor;
            this.array[second].color = Colors.defaultColor;
        } else if (type === AnimationTypes.height) {
            this.array[first].height = second;
        } else if (type === AnimationTypes.sorted) {
            this.array[first].color = Colors.sortedColor;
        } else if (type === AnimationTypes.default) {
            this.array[first].color = Colors.defaultColor;
        }
      }, i * this.delay);
    }

    setTimeout(() => {
      this.disabledStatus = false;
    }, animationsArray.length * this.delay);
  }
}
