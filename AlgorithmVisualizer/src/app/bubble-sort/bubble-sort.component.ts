import {AfterContentInit, Component} from '@angular/core';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.css']
})

/*TODO:
*   - refactoring - one file / algorithm and improve readability + naming
*/
export class BubbleSortComponent implements AfterContentInit {
  array: number[];
  numberOfElements = 50;
  minimumHeight = 5;
  maximumHeight = 700;
  delay = 10;
  secondaryColor = 'red';
  defaultColor = 'gray';
  primaryColor = 'gray';
  sortedColor = 'green';
  foundMinColor = 'blue';

  colorChangeFoundMin = 'colorChangeFoundMin';
  colorChangeMoving = 'colorChangeMoving';
  heightChange = 'heightChange';
  oneMoreSorted = 'oneMoreSorted';
  disabledStatus = false;

  constructor() {
  }

  ngAfterContentInit(): void {
    this.resetArray();
  }

  resetArray(): void {
    this.array = [];
    for (let i = 0; i < this.numberOfElements; i++) {
      this.array.push(this.getRandomInt(this.minimumHeight, this.maximumHeight));
    }
    const arrayElementsInDom = document.getElementsByClassName('array-element');
    this.array.forEach((_, index) => {
      (arrayElementsInDom[index] as HTMLElement).style.backgroundColor = this.defaultColor;
    });
  }

  getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  bubbleSort(array, animationsArray): void {
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - 1 - i; j++) {
        animationsArray.push([this.colorChangeMoving, j, j + 1]);
        if (array[j] > array[j + 1]) {
          animationsArray.push([this.heightChange, j, array[j + 1]]);
          animationsArray.push([this.heightChange, j + 1, array[j]]);
          this.swapArrayElements(array, j, j + 1);
        }
        animationsArray.push([this.oneMoreSorted, array.length - (i + 1), null]);
      }
    }
  }

  selectionSort(array, animationsArray): void {
    for (let i = 0; i < array.length - 1; i++) {
      let min = this.maximumHeight;
      let swapWithIndex = i + 1;
      for (let j = i + 1; j < array.length; j++) {
        animationsArray.push([this.colorChangeMoving, j, j + 1]);
        if (array[j] < min) {
          animationsArray.push([this.colorChangeFoundMin, j, swapWithIndex]);
          min = array[j];
          swapWithIndex = j;
        }
      }
      animationsArray.push([this.heightChange, i, array[swapWithIndex]]);
      animationsArray.push([this.heightChange, swapWithIndex, array[i]]);
      this.swapArrayElements(array, i, swapWithIndex);
      animationsArray.push([this.oneMoreSorted, i, null]);
    }
  }

  performAnimations(): void {
    this.disabledStatus = true;
    const animationsArray = [];
    const auxiliaryArray = this.array.slice();
    // this.bubbleSort(auxiliaryArray, animationsArray);
    this.selectionSort(auxiliaryArray, animationsArray);
    for (let i = 0; i < animationsArray.length; i++) {
      const arrayElementsInDom = document.getElementsByClassName('array-element');
      const [type, first, second] = animationsArray[i];
      if (type === this.colorChangeMoving) {
        setTimeout(() => {
          (arrayElementsInDom[first] as HTMLElement).style.backgroundColor = this.primaryColor;
          (arrayElementsInDom[second] as HTMLElement).style.backgroundColor = this.secondaryColor;
        }, i * this.delay);
      } else if (type === this.colorChangeFoundMin) {
        setTimeout(() => {
          (arrayElementsInDom[first] as HTMLElement).style.backgroundColor = this.foundMinColor;
          (arrayElementsInDom[second] as HTMLElement).style.backgroundColor = this.primaryColor;
        }, i * this.delay);
      } else if (type === this.heightChange) {
        setTimeout(() => {
          (arrayElementsInDom[first] as HTMLElement).style.height = `${second}px`;
        }, i * this.delay);
      } else {
        setTimeout(() => {
          (arrayElementsInDom[first] as HTMLElement).style.backgroundColor = this.sortedColor;
        }, i * this.delay);
      }
    }
    setTimeout(() => {
      this.disabledStatus = false;
    }, animationsArray.length * this.delay);
  }

  swapArrayElements(array, firstIndex, secondIndex): void {
    const firstElement = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = firstElement;
  }
}
