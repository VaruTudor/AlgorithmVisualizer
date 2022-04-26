import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Delays } from '../utils/model/delays';
import { ComponentSizes } from '../utils/model/component-sizes';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  @Output() back = new EventEmitter<any>();
  @Output() delay = new EventEmitter<Delays>();
  @Output() size = new EventEmitter<ComponentSizes>();
  @Output() start = new EventEmitter<any>();
  @Output() reset = new EventEmitter<any>();

  delays = Delays;
  sizes = ComponentSizes;

  constructor() {
  }

  ngOnInit(): void {
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
}
