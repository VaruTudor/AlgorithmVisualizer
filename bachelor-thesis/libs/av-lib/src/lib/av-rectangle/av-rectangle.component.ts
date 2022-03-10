import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'av-rectangle',
  templateUrl: './av-rectangle.component.html',
  styleUrls: ['./av-rectangle.component.css']
})
export class AvRectangleComponent implements OnInit {
  private DEFAULT_SIZE = 100;
  private DEFAULT_COLOR = 'grey';
  @Input() height = this.DEFAULT_SIZE;
  @Input() width = this.DEFAULT_SIZE;
  @Input() color = this.DEFAULT_COLOR;


  constructor() { }

  ngOnInit(): void {
  }

}
