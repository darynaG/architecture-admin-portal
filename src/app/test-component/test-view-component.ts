import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TestService} from './test-view-component.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {AdminViewService} from '../admin-view/admin-view-component.service';
import {SpecificationCollection} from '../admin-view/Specification';



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
  specifications: SpecificationCollection;

  constructor(private fb: FormBuilder,
              private router: Router,
              private service: TestService,
              private adminService: AdminViewService) {}

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

    this.adminService.getAllSpecifications().subscribe(
      content => this.specifications = content
    );
  }

}
