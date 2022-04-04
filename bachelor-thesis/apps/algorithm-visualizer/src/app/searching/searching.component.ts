import { Component, OnInit } from '@angular/core';
import { Rectangle, Square } from '../utils/model/shapes';
import { Sizes } from '../utils/model/sizes.enum';
import { Colors } from '../utils/model/colors.enum';
import { getRandomInt } from '../utils/computations';
import { linearSearch } from '../algorithms/searching/linear-search';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {
  array: Square[];
  length = 20;
  delay = 300;
  disabledStatus = false;

  squareSize = Sizes.medium;
  min = 1;
  max = 100;
  elementDefaultColor = Colors.defaultColor;
  target: number;

  constructor() {
    this.array = [];
  }

  ngOnInit(): void {
    this.resetArray();
    this.target = this.array[this.array.length - 3].value;
  }

  resetArray(): void {
    this.array = [];
    for (let _ = 0; _ < this.length; _++) {
      this.array.push(
        new Square(
          this.squareSize, this.elementDefaultColor, getRandomInt(this.min, this.max)));
    }
  }

  executeAnimations(): void {
    this.disabledStatus = true;
    let valuesArray = this.array.map(element => element.value);
    // const animationsArray = bubbleSort(valuesArray.slice());
    // const animationsArray = insertionSort(valuesArray.slice());
    // const animationsArray = selectionSort(valuesArray.slice());
    const animationsArray = linearSearch(valuesArray.slice(), this.target);
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
