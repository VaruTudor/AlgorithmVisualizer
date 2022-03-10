import {
  AfterViewInit, ChangeDetectorRef,
  Component, ElementRef,
  OnInit, QueryList,
  ViewChildren
} from '@angular/core';
import { getRandomInt, swapArrayElements } from '../utils/computations';
import { Colors } from '../utils/model/colors.enum';
import { ChangeTypes } from '../utils/model/change-types.enum';
import { selectionSort } from '../algorithms/sorting/selection-sort';
import { bubbleSort } from '../algorithms/sorting/bubble-sort';
import { Sizes } from '../utils/model/sizes.enum';
import { BasicRectangle } from '../utils/model/basic-rectangle';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})

export class SortingComponent implements OnInit {
  array: BasicRectangle[];
  length = 20;
  delay = 10;
  disabledStatus = false;

  minElementHeight = 5;
  maxElementHeight = 700;
  elementWidth = Sizes.small;
  elementDefaultColor = Colors.defaultColor;

  constructor(private cdr: ChangeDetectorRef) {
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
    const animationsArray = bubbleSort(heightsArray.slice());
    // const animationsArray = selectionSort(heightsArray.slice());
    for (let i = 0; i < animationsArray.length; i++) {
      const [type, first, second] = animationsArray[i];
      const timeout = i * this.delay
      if (type === ChangeTypes.newCurrent) {
        setTimeout(() => {
          this.array[first].color = Colors.defaultColor;
          this.array[second].color = Colors.currentElementColor;
        }, timeout);
      } else if (type === ChangeTypes.foundBetterMatch) {
        setTimeout(() => {
          this.array[first].color = Colors.currentBestMatchElementColor;
          this.array[second].color = Colors.defaultColor;
        }, timeout);
      } else if (type === ChangeTypes.height) {
        setTimeout(() => {
          this.array[first].height = second;
        }, timeout);
      } else {
        setTimeout(() => {
          this.array[first].color = Colors.sortedColor;
        }, timeout);
      }
    }
    setTimeout(() => {
      this.disabledStatus = false;
    }, animationsArray.length * this.delay);
  }
}
