import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'av-top-nav-element',
  templateUrl: './av-top-nav-element.component.html',
  styleUrls: ['./av-top-nav-element.component.css']
})
export class AvTopNavElementComponent implements OnInit {

  @Input()
  template: any;

  constructor() { }

  ngOnInit(): void {
  }

}
