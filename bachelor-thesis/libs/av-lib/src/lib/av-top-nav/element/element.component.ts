import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'top-nav-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  @Input()
  template: any;

  constructor() { }

  ngOnInit(): void {
  }

}
