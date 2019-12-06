import {Component,  OnInit} from '@angular/core';
import {ResultService} from './result-view-component.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Specification} from '../admin-view/Specification';
import {AuthService} from '../auth/auth.service';
import {SpecificationDetails, TestResult} from '../task-component/Task';
import {TestService} from '../test-component/test-view-component.service';

@Component({
  selector: 'app-result-view-component',
  templateUrl: 'result-view-component.html',
  styleUrls: ['result-view-component.less'],
})

export class ResultViewComponent implements OnInit {
  selectedSpecificationDetails: SpecificationDetails;
  result: TestResult;
  specificationId: number;
  sessionId: number;
  currentId: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private testService: TestService,
              private resultService: ResultService,
              private authService: AuthService) {}

  ngOnInit() {
    this.currentId = this.authService.getCurrentUser().id;
    this.sessionId = this.route.snapshot.queryParams.sessionId;
    this.getResults();
  }

  getResults() {
  this.resultService.getTestResults(this.sessionId).subscribe(
    data => this.result = data.content
  );
  }

  getSpecifications() {

  }
}
