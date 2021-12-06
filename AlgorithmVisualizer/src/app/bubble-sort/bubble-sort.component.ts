import {AfterContentInit, Component} from '@angular/core';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.css']
})

/*TODO:
*   - make sure that the reset button and the bubble sort buttons are disabled during sorting
*   - use angular material for buttons
*   - center the div
*   - add one more sorting and then think about theme, customization*/
export class BubbleSortComponent implements AfterContentInit {
  array: number[];
  numberOfElements = 50;
  minimumHeight = 5;
  maximumHeight = 700;
  delay = 1;
  secondaryColor = 'red';
  defaultColor = 'gray';
  primaryColor = 'blue';

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
        animationsArray.push([j, j + 1]);
        animationsArray.push([j, j + 1]);
        if (array[j] > array[j + 1]) {
          animationsArray.push([j, array[j + 1]]);
          animationsArray.push([[j + 1], array[j]]);
          this.swapArrayElements(array, j, j + 1);
        } else {
          animationsArray.push([-1, -1]);
          animationsArray.push([-1, -1]);
        }
      }
    }
  }

  performAnimations(): void {
    const animationsArray = [];
    const auxiliaryArray = this.array.slice();
    this.bubbleSort(auxiliaryArray, animationsArray);
    for (let i = 0; i < animationsArray.length; i++) {
      const isColorChange = (i % 4 === 0) || (i % 4 === 1);
      const arrayElementsInDom = document.getElementsByClassName('array-element');
      if (isColorChange) {
        const color = (i % 4 === 0) ? this.secondaryColor : this.primaryColor;
        const [first, second] = animationsArray[i];
        setTimeout(() => {
          (arrayElementsInDom[first] as HTMLElement).style.backgroundColor = color;
          (arrayElementsInDom[second] as HTMLElement).style.backgroundColor = color;
        }, i * this.delay);
      } else {
        const [elementIndex, newHeight] = animationsArray[i];
        if (elementIndex === -1) {
          continue;
        }
        setTimeout(() => {
          (arrayElementsInDom[elementIndex] as HTMLElement).style.height = `${newHeight}px`;
        }, i * this.delay);
      }
    }
  }

  swapArrayElements(array, firstIndex, secondIndex): void {
    const firstElement = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = firstElement;
  }
}
