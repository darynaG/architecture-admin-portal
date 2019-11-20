import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CdkDragDropConnectedSortingExampleComponent} from './task-component/task-view-component';
import {AdminViewComponent} from './admin-view/admin-view-component';


const routes: Routes = [
  { path: 'adminPage', component: AdminViewComponent},
  { path: 'task', component: CdkDragDropConnectedSortingExampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
