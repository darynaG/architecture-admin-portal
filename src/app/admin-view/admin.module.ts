import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminViewComponent} from './admin-view.component';
import { AdminComponent} from './admin-dashboard/admin.component';


import { AdminRoutingModule } from './admin-routing.module';
import {MatCardModule, MatIconModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    AdminComponent,
    AdminViewComponent
  ]
})
export class AdminModule {}


