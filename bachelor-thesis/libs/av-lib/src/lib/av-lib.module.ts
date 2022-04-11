import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvRectangleComponent } from './av-rectangle/av-rectangle.component';
import { AvSquareComponent } from './av-square/av-square.component';
import { AvNodeComponent } from './av-node/av-node.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AvRectangleComponent,
    AvSquareComponent,
    AvNodeComponent
  ],
  exports: [
    AvRectangleComponent,
    AvSquareComponent,
    AvNodeComponent
  ]
})
export class AvLibModule {}
