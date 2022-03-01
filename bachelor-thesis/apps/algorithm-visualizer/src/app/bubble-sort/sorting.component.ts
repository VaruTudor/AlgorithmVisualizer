import {AfterContentInit, Component, Input} from '@angular/core';
import {getRandomInt, swapArrayElements} from '../utils/computations';
import {Colors} from '../utils/colors.enum';
import {ChangeTypes} from '../utils/change-types.enum';
import {selectionSort} from '../algorithms/sorting/selection-sort';
import {bubbleSort} from '../algorithms/sorting/bubble-sort';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})

/*TODO:
*   - refactoring - one file / algorithm and improve readability + naming
*/
export class SortingComponent implements AfterContentInit {
  array: number[];
  length = 50;
  minHeight = 5;
  maxHeight = 700;
  delay = 10;
  disabledStatus = false;

  constructor() {
    this.array = [];
  }

  ngAfterContentInit(): void {
    this.resetArray();
  }

  resetArray(): void {
    this.array = [];
    // tslint:disable-next-line:prefer-for-of
    for (let _ = 0; _ < this.length; _++) {
      this.array.push(getRandomInt(this.minHeight, this.maxHeight));
    }
    const arrayElementsInDom = document.getElementsByClassName('array-element');
    this.array.forEach((_, index) => {
      (arrayElementsInDom[index] as HTMLElement).style.backgroundColor = Colors.defaultColor;
    });
  }

  performAnimations(): void {
    this.disabledStatus = true;
    // const animationsArray = bubbleSort(this.array.slice());
    const animationsArray = selectionSort(this.array.slice());
    for (let i = 0; i < animationsArray.length; i++) {
      const arrayElementsInDom = document.getElementsByClassName('array-element');
      const [type, first, second] = animationsArray[i];
      if (type === ChangeTypes.newCurrent) {
        setTimeout(() => {
          (arrayElementsInDom[first] as HTMLElement).style.backgroundColor = Colors.defaultColor;
          (arrayElementsInDom[second] as HTMLElement).style.backgroundColor = Colors.currentElementColor;
        }, i * this.delay);
      } else if (type === ChangeTypes.foundBetterMatch) {
        setTimeout(() => {
          (arrayElementsInDom[first] as HTMLElement).style.backgroundColor = Colors.currentBestMatchElementColor;
          (arrayElementsInDom[second] as HTMLElement).style.backgroundColor = Colors.defaultColor;
        }, i * this.delay);
      } else if (type === ChangeTypes.height) {
        setTimeout(() => {
          (arrayElementsInDom[first] as HTMLElement).style.height = `${second}px`;
        }, i * this.delay);
      } else {
        setTimeout(() => {
          (arrayElementsInDom[first] as HTMLElement).style.backgroundColor = Colors.sortedColor;
        }, i * this.delay);
      }
    }
    setTimeout(() => {
      this.disabledStatus = false;
    }, animationsArray.length * this.delay);
  }
}
