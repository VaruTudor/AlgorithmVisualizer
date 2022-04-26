import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SortingComponent } from './sorting/sorting.component';
import { AvLibModule } from '@bachelor-thesis/av-lib';
import { SearchingComponent } from './searching/searching.component';
import { PathfindingComponent } from './pathfinding/pathfinding.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    SortingComponent,
    SearchingComponent,
    PathfindingComponent,
    HomeComponent,
    TopNavComponent,
  ],
  imports: [
    BrowserModule,
    AvLibModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
