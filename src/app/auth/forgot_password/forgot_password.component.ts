import { Component } from '@angular/core';
import { Router,
  NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-forgot_password',
  templateUrl: './forgot_password.component.html',
  styleUrls: ['./forgot_password.component.css', './forgot_password.component.less']
})
export class ForgotPasswordComponent {
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
      email_input: ['', []]
    });
  }

  forgot_password() {
    const model = {
      email: this.form.value.email_input
    };

    this.authService.forgot_password(model).subscribe(() => {
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
