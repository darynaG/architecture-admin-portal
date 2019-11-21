import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSnackBar, MatSnackBarConfig, MatSort} from '@angular/material';
import {AdminViewService} from '../admin-view-component.service';

@Component({
  selector: 'app-add-characteristics-modal',
  templateUrl: './add-specification-modal.component.html',
  styleUrls: ['./add-specification-modal.component.less']
})
export class AddSpecificationModalComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSpecificationModalComponent>,
    private service: AdminViewService,
    private snackBar: MatSnackBar) {
  }

  form: FormGroup;
  resError: any;
  isDisabled = true;

  static valueOrEmpty(value: any) {
    if (value === undefined || value === null) {
      return '';
    }
    return value;
  }

  ngOnInit() {
    this.initForm();
  }

  validate() {
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }
    return true;
  }

  close($event) {
    $event.preventDefault();
    this.dialogRef.close();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', []],
      description: ['', []]
    });

    const updating = this.data && this.data.specification && this.data.specification.id;
    if (updating) {
      this.form.setValue({
        name: AddSpecificationModalComponent.valueOrEmpty(this.data.specification.name),
        description: AddSpecificationModalComponent.valueOrEmpty(this.data.specification.description),
      });
    }
  }

  processData($event) {
    $event.preventDefault();
    if (this.validate()) {
      this.isDisabled = false;
      const specification = this.form.value;
      const model = {
        name: specification.name,
        description: specification.description
      };
      const updating = this.data && this.data.specification && this.data.specification.id;
      const observable = updating
        ? this.service.updateSpecification(this.data.specification.id, model)
        : this.service.createSpecification(model);
      observable.subscribe(() => {
          this.close($event);
          this.snackBar.open(`Specification successfully ${updating ? 'updated' : 'added'}!`, undefined, {
            duration: 2500,
            panelClass: 'style-success'
          });
        },
        error => {
          if (error.status === 409) {
            this.snackBar.open(error.error.message,
              undefined,
              {duration: 7000, panelClass: 'style-error'} as MatSnackBarConfig);
          } else {
            this.snackBar.open(`Specification failed to ${updating ? 'update' : 'create'}.`,
              undefined,
              {duration: 7000, panelClass: 'style-error'} as MatSnackBarConfig);
          }
        });
    }
  }
}
