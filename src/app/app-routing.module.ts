import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CdkDragDropConnectedSortingExampleComponent} from './task-component/task-view-component';
import { AuthGuard } from './auth/auth.guard';
import {TestViewComponent} from './test-component/test-view-component';
import {ResultViewComponent} from './result-component/result-view-component';

const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin-view/admin.module').then(mod => mod.AdminModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'test/:specificationId/task',
    component: CdkDragDropConnectedSortingExampleComponent
  },
  {
    path: 'test',
    component: TestViewComponent,
    canLoad: [AuthGuard]
  },
  {
    path: 'test/result',
    component: ResultViewComponent
  },
  { path: '',   redirectTo: '/test', pathMatch: 'full' }
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
