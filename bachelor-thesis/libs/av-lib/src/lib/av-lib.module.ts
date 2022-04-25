import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvRectangleComponent } from './av-rectangle/av-rectangle.component';
import { AvSquareComponent } from './av-square/av-square.component';
import { AvNodeComponent } from './av-node/av-node.component';
import { AvTopNavComponent } from './av-top-nav/av-top-nav.component';
import { AvTopNavElementComponent } from './av-top-nav/av-top-nav-element/av-top-nav-element.component';
import { TopNavActionElementComponent } from './av-top-nav/top-nav-action-element/top-nav-action-element.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AvRectangleComponent,
    AvSquareComponent,
    AvNodeComponent,
    AvTopNavComponent,
    AvTopNavElementComponent,
    TopNavActionElementComponent
  ],
  exports: [
    AvRectangleComponent,
    AvSquareComponent,
    AvNodeComponent,
    AvTopNavComponent,
    AvTopNavElementComponent
  ]
})
export class AvLibModule {}
