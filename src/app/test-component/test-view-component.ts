import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TestService} from './test-view-component.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';



/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-test-view-component',
  templateUrl: 'test-view-component.html',
  styleUrls: ['test-view-component.css'],
})

export class TestViewComponent implements OnInit {

  form: FormGroup;
  specifications = [{title: 'Specification 1', value: '1'},
                    {title: 'Specification 2', value: '2'},
                    {title: 'Specification 3', value: '3'}];

  constructor(private fb: FormBuilder,
              private router: Router,
              private service: TestService) {}

  ngOnInit() {
    this.initForm();
  }

  startTest($event) {
      $event.preventDefault();
      const test = this.form.value;
      const specificationId = test.specification;
      this.router.navigate(['/test', specificationId, 'task'], {queryParams: {sessionId: '1'}});
  }

  initForm() {
    this.form = this.fb.group({
      specification: ['', []]
    });
  }
}
