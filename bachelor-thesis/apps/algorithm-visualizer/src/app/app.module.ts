import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SortingComponent } from './sorting/sorting.component';
import { AvLibModule } from '@bachelor-thesis/av-lib';
import { SearchingComponent } from './searching/searching.component';
import { PathfindingComponent } from './pathfinding/pathfinding.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SortingComponent,
    SearchingComponent,
    PathfindingComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AvLibModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
