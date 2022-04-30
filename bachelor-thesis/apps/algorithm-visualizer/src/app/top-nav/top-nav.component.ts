import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Delays } from '../utils/model/delays';
import { ComponentSizes } from '../utils/model/component-sizes';
import { Algorithms, AlgorithmSections } from '../utils/model/algorithms';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  @Output() back = new EventEmitter<any>();
  @Output() delay = new EventEmitter<Delays>();
  @Output() size = new EventEmitter<ComponentSizes>();
  @Output() algorithm = new EventEmitter<string>();
  @Output() start = new EventEmitter<any>();
  @Output() reset = new EventEmitter<any>();

  @Input() algorithmSection: AlgorithmSections;
  @Input() isDisabled: boolean;

  selectedAlgorithmName: string = '';
  delays = Delays;
  sizes = ComponentSizes;
  showAlgorithms: boolean = false;
  showSizes: boolean = false;
  showDelays: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  isDisabledOrNoSelectedAlgorithm(): boolean {
    return this.isDisabled || !this.selectedAlgorithmName;
  }

  getAlgorithms(section: AlgorithmSections): string[] {
    if (section === AlgorithmSections.SEARCHING) return Algorithms.SEARCHING;
    else if (section === AlgorithmSections.SORTING) return Algorithms.SORTING;
    else return Algorithms.PATHFINDING;
  }

  onBack() {
    this.back.emit();
  }

  onStart(): void {
    this.start.emit();
  }

  onReset(): void {
    this.reset.emit();
  }

  onDelay(value: Delays) {
    this.delay.emit(value);
  }

  onSize(value: ComponentSizes) {
    this.size.emit(value);
  }

  onAlgorithm(algorithm: string) {
    this.algorithm.emit(algorithm);
    this.selectedAlgorithmName = algorithm;
  }
}
