import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'top-nav-action-element',
  templateUrl: './action-element.component.html',
  styleUrls: ['./action-element.component.css']
})
export class ActionElementComponent implements OnInit {

  @Input()
  template: any;

  constructor() { }

  ngOnInit(): void {
  }

}
