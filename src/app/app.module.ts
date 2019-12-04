import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkDragDropConnectedSortingExampleComponent} from './task-component/task-view-component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatSelectModule,
  MatSnackBarModule
} from '@angular/material';

import {MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AddSpecificationModalComponent} from './admin-view/add-specification-modal/add-specification-modal.component';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddRequirementModalComponent} from './admin-view/add-requirement-modal/add-requirement-modal.component';

import {AuthModule} from './auth/auth.module';
import {TestViewComponent} from './test-component/test-view-component';


@NgModule({
  declarations: [
    AppComponent,
    CdkDragDropConnectedSortingExampleComponent,
    AddSpecificationModalComponent,
    AddRequirementModalComponent,
    TestViewComponent
  ],
  entryComponents: [
    AddSpecificationModalComponent,
    AddRequirementModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
