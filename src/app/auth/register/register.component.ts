import {Component, OnInit} from '@angular/core';
import {
  Router,
  NavigationExtras, ActivatedRoute
} from '@angular/router';
import {AuthenticationService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './register.component.less']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(public authService: AuthenticationService,
              public router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  register() {
    // this.authService.isLoggedIn = false;
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const model = {
      email: this.f.email.value,
      login: this.f.login.value,
      password: this.f.password.value
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
        this.error = `Виникла помилка під час реєстрації. Можливо, ви вже зареєстровані?`;
        this.loading = false;
      });
  }
}
