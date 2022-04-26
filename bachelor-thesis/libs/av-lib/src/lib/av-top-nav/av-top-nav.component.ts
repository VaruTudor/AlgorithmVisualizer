import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { ElementComponent } from './element/element.component';
import { ActionElementComponent } from './action-element/action-element.component';

@Component({
  selector: 'av-top-nav',
  templateUrl: './av-top-nav.component.html',
  styleUrls: ['./av-top-nav.component.css']
})
export class AvTopNavComponent implements OnInit {

  @ContentChildren(ElementComponent)
  elements: QueryList<ElementComponent> | undefined;

  @ContentChildren(ActionElementComponent)
  actionElements: QueryList<ActionElementComponent> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
