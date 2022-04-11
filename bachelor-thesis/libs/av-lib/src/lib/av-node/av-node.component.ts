import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'av-node',
  templateUrl: './av-node.component.html',
  styleUrls: ['./av-node.component.css']
})
export class AvNodeComponent implements OnInit {
  private DEFAULT_SIZE = 100;
  private DEFAULT_COLOR = 'grey';
  private DEFAULT_ROW_COL = 0;
  private DEFAULT_START_FINISH = false;

  @Input() size = this.DEFAULT_SIZE;
  @Input() color = this.DEFAULT_COLOR;
  @Input() row = this.DEFAULT_ROW_COL;
  @Input() column = this.DEFAULT_ROW_COL;
  @Input() isStart = this.DEFAULT_START_FINISH;
  @Input() isEnd = this.DEFAULT_START_FINISH;

  constructor() { }

  ngOnInit(): void {
  }

}
