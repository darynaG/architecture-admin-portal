import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CdkDragDropConnectedSortingExampleComponent} from './task-component/task-view-component';
import {AdminViewComponent} from './admin-view/admin-view.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin-view/admin.module').then(mod => mod.AdminModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'task',
    component: CdkDragDropConnectedSortingExampleComponent
  },
  { path: '',   redirectTo: '/task', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
