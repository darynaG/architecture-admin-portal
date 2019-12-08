import { Component } from '@angular/core';
import { Router,
  NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './register.component.less']
})
export class RegisterComponent {
  form: FormGroup;
  constructor(public authService: AuthService,
              public router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email_input: ['', []],
      login_input: ['', []],
      password_input: ['', []],
    });
  }

  register() {
    this.authService.isLoggedIn = false;
    const model = {
      email: this.form.value.email_input,
      login: this.form.value.login_input,
      password: this.form.value.password_input
    };

    this.authService.register(model).subscribe(() => {
        const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/login';
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
}
