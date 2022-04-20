import { Component, OnInit } from '@angular/core';
import { Sizes } from '../utils/model/sizes.enum';
import { Colors } from '../utils/model/colors.enum';
import { getRandomInt } from '../utils/computations';
import { linearSearch } from '../algorithms/searching/linear-search';
import { binarySearch } from '../algorithms/searching/binary-search';
import { fibonacciSearch } from '../algorithms/searching/fibonacci-search';
import { jumpSearch } from '../algorithms/searching/jump-search';
import { interpolationSearch } from '../algorithms/searching/interpolation-search';
import { exponentialSearch } from '../algorithms/searching/exponential-search';
import { Square } from '../utils/model/shapes/square';

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
          this.squareSize, Colors.defaultColor, numbersArray[i]));
    }
  }

  executeAnimations(): void {
    this.disabledStatus = true;
    let values = this.array.map(element => element.value);
    // const animations = linearSearch(valuesArray.slice(), this.target);
    // const animations = binarySearch(valuesArray.slice(), this.target);
    // const animations = fibonacciSearch(valuesArray.slice(), this.target);
    const animations = jumpSearch(values.slice(), this.target);
    // const animations = interpolationSearch(valuesArray.slice(), this.target);
    // const animations = exponentialSearch(valuesArray.slice(), this.target);
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
