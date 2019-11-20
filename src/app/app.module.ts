import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {CdkDragDropConnectedSortingExampleComponent} from './task-component/task-view-component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AdminViewComponent} from './admin-view/admin-view-component';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';

import {MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AdminViewComponent,
    CdkDragDropConnectedSortingExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
