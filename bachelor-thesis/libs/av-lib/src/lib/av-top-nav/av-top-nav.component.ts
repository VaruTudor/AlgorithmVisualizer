import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { AvTopNavElementComponent } from './av-top-nav-element/av-top-nav-element.component';

@Component({
  selector: 'av-top-nav',
  templateUrl: './av-top-nav.component.html',
  styleUrls: ['./av-top-nav.component.css']
})
export class AvTopNavComponent implements OnInit {

  @ContentChildren(AvTopNavElementComponent)
  elements: QueryList<AvTopNavElementComponent> | undefined;

  @ContentChildren(AvTopNavElementComponent)
  actionElements: QueryList<AvTopNavElementComponent> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
