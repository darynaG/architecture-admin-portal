import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ResultService} from './result-view-component.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Specification} from '../admin-view/Specification';
import {AuthenticationService} from '../auth/auth.service';
import {SpecificationDetails, TestAnswer, TestResult} from '../task-component/Task';
import {TestService} from '../test-component/test-view-component.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-result-view-component',
  templateUrl: 'result-view-component.html',
  styleUrls: ['result-view-component.less'],
})

export class ResultViewComponent implements OnInit, AfterViewInit {
  selectedSpecificationDetails: SpecificationDetails;
  result: TestResult;

  specificationId: number;
  sessionId: number;
  currentId: number;
  message: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private testService: TestService,
              private resultService: ResultService,
              private authService: AuthenticationService,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'positive',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/positive-vote.icon.svg'));
    iconRegistry.addSvgIcon(
      'negative',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/negative-vote.icon.svg'));
  }

  ngOnInit() {
    this.currentId = this.authService.currentUserValue.id;
    this.sessionId = this.route.snapshot.queryParams.sessionId;
    this.getResults();
    this.getSpecifications();
  }

  ngAfterViewInit() {

  }

  getResults() {
  this.resultService.getTestResults(this.sessionId).subscribe(
    data => this.result = data.content
  );
  }

  getSpecifications() {
    this.resultService.getSpecificationDetailsForSession(this.sessionId).subscribe(
       content => {
         this.selectedSpecificationDetails = content.content;
       } );

  }

  setMessage() {
    if (this.result.passed) {
      return 'Вам вдалося успішно пройти тестування!\nЯкщо бажаєте покращити оцінку - спробуйте ще раз!\n Бажаємо удачі!';
    } else {
      return 'Вам не вдалося успішно пройти тестування!\nЯкщо бажаєте покращити оцінку - спробуйте ще раз!\n Бажаємо удачі!';
    }
  }
  onClick() {

        this.router.navigate(['/test']);

  }
}
