import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  @Output() back = new EventEmitter<any>();
  @Output() delay = new EventEmitter<string>();
  @Output() size = new EventEmitter<string>();
  @Output() start = new EventEmitter<any>();
  @Output() reset = new EventEmitter<any>();

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

}
