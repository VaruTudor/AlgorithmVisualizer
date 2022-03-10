import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvRectangleComponent } from './av-rectangle/av-rectangle.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AvRectangleComponent
  ],
  exports: [
    AvRectangleComponent
  ]
})
export class AvLibModule {}
