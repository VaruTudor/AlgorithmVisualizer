import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bachelor-thesis-top-nav-action-element',
  templateUrl: './top-nav-action-element.component.html',
  styleUrls: ['./top-nav-action-element.component.css']
})
export class TopNavActionElementComponent implements OnInit {

  @Input()
  template: any;

  constructor() { }

  ngOnInit(): void {
  }

}
