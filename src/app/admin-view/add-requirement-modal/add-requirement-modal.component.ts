import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSnackBar, MatSnackBarConfig, MatSort} from '@angular/material';
import {AdminViewService} from '../admin-view-component.service';

@Component({
  selector: 'app-add-characteristics-modal',
  templateUrl: './add-requirement-modal.component.html',
  styleUrls: ['./add-requirement-modal.component.less']
})
export class AddRequirementModalComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRequirementModalComponent>,
    private service: AdminViewService,
    private snackBar: MatSnackBar) {
  }

  form: FormGroup;
  resError: any;
  isDisabled = true;
  types = [
    {title: 'Функціональні вимоги', value: 1},
    {title: 'Вимоги до інтерфейсів', value: 2},
    {title: 'Вимоги до продуктивності', value: 3},
    {title: 'Вимоги безпеки', value: 4},
    {title: 'Вимоги надійності', value: 5},
    {title: 'Інші вимоги', value: 6}
  ]

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
      text: ['', []],
      typeId: ['', []]
    });

    const updating = this.data && this.data.requirement && this.data.requirement.id;
    if (updating) {
      this.form.setValue({
        text: AddRequirementModalComponent.valueOrEmpty(this.data.requirement.text),
        typeId: AddRequirementModalComponent.valueOrEmpty(this.data.requirement.typeId),
      });
    }
  }

  processData($event) {
    $event.preventDefault();
    if (this.validate()) {
      this.isDisabled = false;
      const requirement = this.form.value;
      const model = {
        text: requirement.text,
        typeId: requirement.typeId
      };
      const updating = this.data && this.data.requirement && this.data.requirement.id;
      const observable = updating
        ? this.service.updateRequirement(this.data.specificationId, this.data.requirement.id, model)
        : this.service.createRequirement(this.data.specificationId, model);
      observable.subscribe(() => {
          this.close($event);
          this.snackBar.open(`Requirement successfully ${updating ? 'updated' : 'added'}!`, undefined, {
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
            this.snackBar.open(`Requirement failed to ${updating ? 'update' : 'create'}.`,
              undefined,
              {duration: 7000, panelClass: 'style-error'} as MatSnackBarConfig);
          }
        });
    }
  }
}
