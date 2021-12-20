import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';

@NgModule({
  declarations: [
    AppComponent,
    BubbleSortComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
