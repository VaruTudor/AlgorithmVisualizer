import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'av-square',
  templateUrl: './av-square.component.html',
  styleUrls: ['./av-square.component.css']
})
export class AvSquareComponent implements OnInit {
  private DEFAULT_SIZE = 100;
  private DEFAULT_VALUE = 0;
  private DEFAULT_COLOR = 'grey';
  @Input() size = this.DEFAULT_SIZE;
  @Input() value = this.DEFAULT_VALUE;
  @Input() color = this.DEFAULT_COLOR;

  constructor() { }

  ngOnInit(): void {
  }

}
