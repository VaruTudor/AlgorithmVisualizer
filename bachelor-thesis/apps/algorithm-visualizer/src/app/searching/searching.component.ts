import { Component, OnInit } from '@angular/core';
import { Square } from '../utils/model/shapes';
import { Sizes } from '../utils/model/sizes.enum';
import { Colors } from '../utils/model/colors.enum';
import { getRandomInt } from '../utils/computations';
import { linearSearch } from '../algorithms/searching/linear-search';
import { binarySearch } from '../algorithms/searching/binary-search';
import { fibonacciSearch } from '../algorithms/searching/fibonacci-search';
import { jumpSearch } from '../algorithms/searching/jump-search';
import { interpolationSearch } from '../algorithms/searching/interpolation-search';
import { exponentialSearch } from '../algorithms/searching/exponential-search';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {
  array: Square[];
  length = 40;
  delay = 1000;
  disabledStatus = false;

  squareSize = Sizes.medium;
  min = 10;
  max = 100;
  elementDefaultColor = Colors.defaultColor;
  target: number;

  constructor() {
    this.array = [];
  }

  ngOnInit(): void {
    this.resetArray();
    this.target = this.array[this.array.length - 5].value;
  }

  resetArray(): void {
    this.array = [];
    const numbersArray = ([...Array(this.length)].map(() => getRandomInt(this.min, this.max))).sort();
    for (let i = 0; i < this.length; i++) {
      this.array.push(
        new Square(
          this.squareSize, this.elementDefaultColor, numbersArray[i]));
    }
  }

  executeAnimations(): void {
    this.disabledStatus = true;
    let valuesArray = this.array.map(element => element.value);
    // const animationsArray = linearSearch(valuesArray.slice(), this.target);
    // const animationsArray = binarySearch(valuesArray.slice(), this.target);
    // const animationsArray = fibonacciSearch(valuesArray.slice(), this.target);
    // const animationsArray = jumpSearch(valuesArray.slice(), this.target);
    // const animationsArray = interpolationSearch(valuesArray.slice(), this.target);
    const animationsArray = exponentialSearch(valuesArray.slice(), this.target);
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
