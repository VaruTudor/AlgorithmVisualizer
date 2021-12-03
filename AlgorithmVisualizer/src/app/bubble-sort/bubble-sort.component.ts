import {AfterContentInit, Component} from '@angular/core';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.css']
})

/*TODO:
*   - refactor code
*   - think of using classes instead of styling
*   - make sure that the reset button and the bubble sort buttons are disabled during sorting
*   - use angular material for buttons
*   - center the div
*   - add one more sorting and then think about theme, customization*/
export class BubbleSortComponent implements AfterContentInit {
  array: number[];
  numberOfElements = 50;
  lowerBound = 5;
  upperBound = 700;
  delay = 1;

  constructor() {
  }

  ngAfterContentInit(): void {
    this.resetArray();
  }

  resetArray(): void {
    this.array = [];
    for (let i = 0; i < this.numberOfElements; i++) {
      this.array.push(this.getRandomInt(this.lowerBound, this.upperBound));
    }
  }

  getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  bubbleSort(array, animations): void {
    const lastIndex = array.length - 1;
    for (let i = 0; i < lastIndex; i++) {
      for (let j = 0; j < lastIndex - i; j++) {
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        if (array[j] > array[j + 1]) {
          animations.push([j, array[j + 1]]);
          animations.push([[j + 1], array[j]]);
          this.swap(array, j, j + 1);
        } else {
          animations.push([-1, -1]);
          animations.push([-1, -1]);
        }
      }
    }
  }

  getBubbleSort(array): (any[] | any)[] {
    const animations = [];
    const auxiliaryArray = this.array.slice();
    this.bubbleSort(auxiliaryArray, animations);
    array = auxiliaryArray;
    return [animations, array];
  }

  doBubbleSort(): void {
    const animations = this.getBubbleSort(this.array)[0];
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = (i % 4 === 0) || (i % 4 === 1);
      const arrayElements = document.getElementsByClassName('array-element');
      if (isColorChange) {
        const color = (i % 4 === 0) ? 'red' : 'grey';
        const [first, second] = animations[i];
        setTimeout(() => {
          (arrayElements[first] as HTMLElement).style.backgroundColor = color;
          (arrayElements[second] as HTMLElement).style.backgroundColor = color;
        }, i * this.delay);
      } else {
        const [elementIndex, newHeight] = animations[i];
        if (elementIndex === -1) {
          continue;
        }
        setTimeout(() => {
          (arrayElements[elementIndex] as HTMLElement).style.height = `${newHeight}px`;
        }, i * this.delay);
      }
    }
  }

  swap(array, firstIndex, secondIndex): void {
    const firstValue = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = firstValue;
  }
}
