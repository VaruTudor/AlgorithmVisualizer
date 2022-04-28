import { Component, OnInit, ViewChild } from '@angular/core';
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
import { TopNavComponent } from '../top-nav/top-nav.component';
import { Location } from '@angular/common';
import { executeAnimations } from '../utils/helper-functions';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {
  @ViewChild(TopNavComponent, { static: false })
  private topNavComponent: TopNavComponent;

  private length: number = 52;
  private target: number; //TODO make this configurable

  private delay: Delays = Delays.normal;
  private size: Sizes = Sizes.medium;
  private name: AlgorithmNames;

  array: Square[] = [];
  isAlgorithmSelected: boolean = false;
  section = AlgorithmSections;

  constructor(private _location: Location) {
  }

  ngOnInit(): void {
    this.resetArray();
  }

  resetArray(): void {
    this.array = ([...Array(this.length)].map(() => getRandomInt(10, 100))).sort().map(number => new Square(this.size, Colors.default, number));
    this.target = this.array[this.array.length - 5].value;
  }

  executeAnimations(): void {
    this.topNavComponent.isDisabled = true;
    let values = this.array.map(element => element.value).slice();
    let animations: Animation[] = [];
    switch (this.name) {
      case AlgorithmNames.binarySearch: {
        animations = binarySearch(values, this.target);
        break;
      }
      case AlgorithmNames.exponentialSearch: {
        animations = exponentialSearch(values, this.target);
        break;
      }
      case AlgorithmNames.fibonacciSearch: {
        animations = fibonacciSearch(values, this.target);
        break;
      }
      case AlgorithmNames.interpolationSearch: {
        animations = interpolationSearch(values, this.target);
        break;
      }
      case AlgorithmNames.jumpSearch: {
        animations = jumpSearch(values, this.target);
        break;
      }
      case AlgorithmNames.linearSearch: {
        animations = linearSearch(values, this.target);
        break;
      }
    }
    executeAnimations(animations, this.array, this.delay);

    setTimeout(() => {
      this.topNavComponent.isDisabled = false;
    }, animations.length * this.delay);
  }

  onDelay(delay: Delays) {
    this.delay = delay;
    this.resetArray();
  }

  onBack() {
    this._location.back();
  }

  private updateSize(size: Sizes, length: number) {
    this.size = size;
    this.length = length;
    this.resetArray();
  }

  onSize(size: ComponentSizes) {
    switch (size) {
      case ComponentSizes.small: {
        this.updateSize(Sizes.medium, 52);
        break;
      }
      case ComponentSizes.medium: {
        this.updateSize(Sizes.large, 28);
        break;
      }
      case ComponentSizes.large: {
        this.updateSize(Sizes.extraLarge, 14);
        break;
      }
    }
  }

  onAlgorithm(selectedAlgorithm: string) {
    this.name = Algorithms.SEARCHING.filter(algorithm => algorithm === selectedAlgorithm)[0];
    this.resetArray();
    this.isAlgorithmSelected = true;
  }
}
