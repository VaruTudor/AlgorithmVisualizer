import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvRectangleComponent } from './av-rectangle/av-rectangle.component';
import { AvSquareComponent } from './av-square/av-square.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AvRectangleComponent,
    AvSquareComponent
  ],
  exports: [
    AvRectangleComponent,
    AvSquareComponent
  ]
})
export class AvLibModule {}
