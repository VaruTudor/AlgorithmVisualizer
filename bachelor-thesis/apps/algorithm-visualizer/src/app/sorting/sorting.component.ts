import { Component, OnInit, ViewChild } from '@angular/core';
import { getRandomInt } from '../utils/computations';
import { Colors } from '../utils/model/colors.enum';
import { bubbleSort } from '../algorithms/sorting/bubble-sort';
import { Sizes } from '../utils/model/sizes.enum';
import { Rectangle } from '../utils/model/shapes/rectangle';
import { AlgorithmNames, Algorithms, AlgorithmSections } from '../utils/model/algorithms';
import { ComponentSizes } from '../utils/model/component-sizes';
import { Delays } from '../utils/model/delays';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { Location } from '@angular/common';
import { Animation } from '../utils/model/animations';
import { insertionSort } from '../algorithms/sorting/insertion-sort';
import { selectionSort } from '../algorithms/sorting/selection-sort';
import { mergeSort } from '../algorithms/sorting/merge-sort';
import { executeAnimations } from '../utils/helper-functions';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})

export class SortingComponent implements OnInit {
  @ViewChild(TopNavComponent, { static: false })
  private topNavComponent: TopNavComponent;

  array: Rectangle[] = [];
  length: number = 20;

  delay: Delays = Delays.normal;
  size: Sizes = Sizes.medium;
  name: AlgorithmNames;

  isAlgorithmSelected: boolean = false;
  section = AlgorithmSections;

  constructor(private _location: Location) {
  }

  ngOnInit(): void {
    this.resetArray();
  }

  resetArray(): void {
    this.array = [...Array(this.length)].map(() => new Rectangle(getRandomInt(10, 500), this.size, Colors.default));
  }

  executeAnimations(): void {
    this.topNavComponent.isDisabled = true;
    let heights = this.array.map(element => element.height).slice();
    let animations: Animation[] = [];
    switch (this.name) {
      case AlgorithmNames.bubbleSort: {
        animations = bubbleSort(heights);
        break;
      }
      case AlgorithmNames.insertionSort: {
        animations = insertionSort(heights);
        break;
      }
      case AlgorithmNames.selectionSort: {
        animations = selectionSort(heights);
        break;
      }
      case AlgorithmNames.mergeSort: {
        animations = mergeSort(heights);
        break;
      }
    }

    executeAnimations(animations, this.array, this.delay);

    setTimeout(() => {
      this.topNavComponent.isDisabled = false;
    }, animations.length * this.delay);
  }

  onBack() {
    this._location.back();
  }

  onDelay(delay: Delays) {
    this.delay = delay;
    this.resetArray();
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
    this.name = Algorithms.SORTING.filter(algorithm => algorithm === selectedAlgorithm)[0];
    this.resetArray();
    this.isAlgorithmSelected = true;
  }
}
