import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TestService} from './test-view-component.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {AdminViewService} from '../admin-view/admin-view-component.service';
import {Specification, SpecificationCollection} from '../admin-view/Specification';
import {AuthService} from '../auth/auth.service';
import {SpecificationDetails} from '../task-component/Task';



/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-test-view-component',
  templateUrl: 'test-view-component.html',
  styleUrls: ['test-view-component.less'],
})

export class TestViewComponent implements OnInit {

  form: FormGroup;
  specifications: Specification[];
  selectedSpecificationDetails: SpecificationDetails;
  sessionId: number;
  currentId: number;
  isShown = false;
  shouldBeDisabled = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private service: TestService,
              private adminService: AdminViewService,
              private testService: TestService,
              private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
    this.currentId = this.authService.getCurrentUser().id;
  }

  startTest($event) {
    $event.preventDefault();
    const test = this.form.value;
    const specificationId = test.specification;
    this.service.createSession(specificationId, this.currentId).subscribe ( content => {
        this.sessionId = content.content;
        this.router.navigate(['/test', specificationId, 'task'], {queryParams: {sessionId: this.sessionId}});
      }
    );
  }

  initForm() {
    this.form = this.fb.group({
      specification: ['', []]
    });

    this.adminService.getAllSpecifications().subscribe(
      content => this.specifications = content.content
    );

  }

  selectedSpecification(tab: any) {
    // this.getBestScore();
    this.getSpecifications();
  }

  getBestScore() {
    const test = this.form.value;
    const specificationId = test.specification;
    this.testService.getBestScore(this.currentId, specificationId).subscribe(
      data => this. selectedSpecificationDetails.score = data.content
    );
  }

  getSpecifications() {
    const test = this.form.value;
    const specificationId = test.specification;
    this.testService.getSpecifications(this.currentId, specificationId).subscribe(
      data => {
        this.selectedSpecificationDetails = data.content;
        this.isShown = true;
        data.content.attempts === 0 ? this.shouldBeDisabled = true : this.shouldBeDisabled = false;
      }
    );
  }
}
