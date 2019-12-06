import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TestService} from './test-view-component.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {AdminViewService} from '../admin-view/admin-view-component.service';
import {Specification, SpecificationCollection} from '../admin-view/Specification';
import {AuthService} from '../auth/auth.service';



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
  selectedSepecification: number;
  sessionId: number;
  currentId: number;
  bestScore: number;

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
      const model = {
        specification: specificationId
      };
      this.service.createSession(model).subscribe ( content => {
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
    this.getBestScore();
  }

  getBestScore() {
    const test = this.form.value;
    const specificationId = test.specification;
    this.testService.getBestScore(this.currentId, specificationId).subscribe(
      data => this.bestScore = data.content
    );
  }
}
