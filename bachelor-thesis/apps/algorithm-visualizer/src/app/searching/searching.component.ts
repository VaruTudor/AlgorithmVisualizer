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
import { ComponentSizes } from '../utils/model/component-sizes';
import { Delays } from '../utils/model/delays';
import { AlgorithmNames, Algorithms, AlgorithmSections } from '../utils/model/algorithms';
import { Animation } from '../utils/model/animations';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {
  array: Square[];
  length = 52;
  delay = Delays.normal;
  algorithm: AlgorithmNames;
  disabledStatus = false;

  squareSize = Sizes.medium;
  min = 10;
  max = 100;
  target: number;

  algorithmSection = AlgorithmSections;

  constructor() {
    this.array = [];
  }

  ngOnInit(): void {
    this.resetArray();
  }

  resetArray(): void {
    this.array = [];
    const numbersArray = ([...Array(this.length)].map(() => getRandomInt(this.min, this.max))).sort();
    for (let i = 0; i < this.length; i++) {
      this.array.push(
        new Square(
          this.squareSize, Colors.default, numbersArray[i]));
    }
    this.target = this.array[this.array.length - 5].value;
  }

  executeAnimations(): void {
    this.disabledStatus = true;
    let values = this.array.map(element => element.value);
    let animations: Animation[] = [];
    switch (this.algorithm) {
      case AlgorithmNames.binarySearch: {
        animations = binarySearch(values.slice(), this.target);
        break;
      }
      case AlgorithmNames.exponentialSearch: {
        animations = exponentialSearch(values.slice(), this.target);
        break;
      }
      case AlgorithmNames.fibonacciSearch: {
        animations = fibonacciSearch(values.slice(), this.target);
        break;
      }
      case AlgorithmNames.interpolationSearch: {
        animations = interpolationSearch(values.slice(), this.target);
        break;
      }
      case AlgorithmNames.jumpSearch: {
        animations = jumpSearch(values.slice(), this.target);
        break;
      }
      case AlgorithmNames.linearSearch: {
        animations = linearSearch(values.slice(), this.target);
        break;
      }
    }
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        animations[i].execute(this.array);
      }, i * this.delay);
    }

    setTimeout(() => {
      this.disabledStatus = false;
    }, animations.length * this.delay);
  }

  onDelay(delay: Delays) {
    this.delay = delay;
  }

  onBack() {

  }

  onSize(size: ComponentSizes) {
    switch (size) {
      case ComponentSizes.small: {
        this.squareSize = Sizes.medium;
        this.length = 52;
        this.resetArray();
        break;
      }
      case ComponentSizes.medium: {
        this.squareSize = Sizes.large
        this.length = 28
        this.resetArray();
        break;
      }
      case ComponentSizes.large: {
        this.squareSize = Sizes.extraLarge
        this.length = 14;
        this.resetArray();
        break;
      }
    }
  }

  onAlgorithm(selectedAlgorithm: string) {
    this.algorithm = Algorithms.SEARCHING.filter(algorithm => algorithm === selectedAlgorithm)[0];
  }
}
