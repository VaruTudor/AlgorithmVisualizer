import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SortingComponent } from './sorting/sorting.component';
import { AvLibModule } from '@bachelor-thesis/av-lib';
import { SearchingComponent } from './searching/searching.component';
import { PathfindingComponent } from './pathfinding/pathfinding.component';

@NgModule({
  declarations: [
    AppComponent,
    SortingComponent,
    SearchingComponent,
    PathfindingComponent,
  ],
  imports: [
    BrowserModule,
    AvLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
