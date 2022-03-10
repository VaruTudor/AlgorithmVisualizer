import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SortingComponent } from './sorting/sorting.component';
import { AvLibModule } from '@bachelor-thesis/av-lib';

@NgModule({
  declarations: [
    AppComponent,
    SortingComponent,
  ],
  imports: [
    BrowserModule,
    AvLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
