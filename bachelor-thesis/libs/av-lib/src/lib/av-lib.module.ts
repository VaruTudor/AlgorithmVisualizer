import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvRectangleComponent } from './av-rectangle/av-rectangle.component';
import { AvSquareComponent } from './av-square/av-square.component';
import { AvNodeComponent } from './av-node/av-node.component';
import { AvTopNavComponent } from './av-top-nav/av-top-nav.component';
import { ElementComponent } from './av-top-nav/element/element.component';
import { ActionElementComponent } from './av-top-nav/action-element/action-element.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AvRectangleComponent,
    AvSquareComponent,
    AvNodeComponent,
    AvTopNavComponent,
    ElementComponent,
    ActionElementComponent
  ],
  exports: [
    AvRectangleComponent,
    AvSquareComponent,
    AvNodeComponent,
    AvTopNavComponent,
    ElementComponent,
    ActionElementComponent
  ]
})
export class AvLibModule {}
