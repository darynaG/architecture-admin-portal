import {Component, Inject, OnInit} from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {log} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './login.component.less'],
})
export class LoginComponent {
  message: string;
  form: FormGroup;

  constructor(public authService: AuthService,
              public router: Router,
              private fb: FormBuilder) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
  this.form = this.fb.group({
      login_input: ['', []],
      password_input: ['', []]
    });
  }

  login() {
    this.message = 'Trying to log in ...';

    const model = {
      username: this.form.value.login_input,
      password: this.form.value.password_input
    };

    log('login: ', model.username,  'password: ', model.password);

    this.authService.login(model).subscribe(() => {
      this.authService.isLoggedIn = true;
      this.setMessage();

      const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/task';
      const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

      this.router.navigateByUrl(redirect, navigationExtras);
    },
    error => {

    }
    );
  }

  logout() {
    this.authService.logout();
    this.authService.isLoggedIn = false;
    this.setMessage();
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
