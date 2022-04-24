import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PathfindingComponent } from './pathfinding/pathfinding.component';
import { SortingComponent } from './sorting/sorting.component';
import { SearchingComponent } from './searching/searching.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'searching', component: SearchingComponent },
  { path: 'sorting', component: SortingComponent },
  { path: 'pathfinding', component: PathfindingComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
