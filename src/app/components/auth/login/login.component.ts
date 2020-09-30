import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  emailLogin(): void {
    this.loader.show();

    if (this.loginForm.invalid) { return; }

    this.authService.loginWithEmail(this.loginForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.loginForm.reset();
          this.router.navigate(['/app']);
          this.loader.hide();
        }, error => {
          switch (error.code) {
            case 'auth/wrong-password':
              this.loginForm.get('password').setErrors({ serverErrorPassword: 'Password is incorrect' });
              break;
            case 'auth/user-not-found':
              this.loginForm.get('email').setErrors({ serverErrorEmail: 'There is no user with such email' });
              break;
            default:
              break;
          }

          this.loader.hide();
      });
  }

  loginWithGoogle(): void {
    this.loader.show();

    this.authService.loginWithGoogle()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['/app']);
        this.loader.hide();
      });
  }

  loginWithFacebook(): void {
    this.loader.show();

    this.authService.loginWithFacebook()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['/app']);
        this.loader.hide();
      });
  }

  loginWithGithub(): void {
    this.loader.show();

    this.authService.loginWithGithub()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['/app']);
        this.loader.hide();
      },
      error => {
        this.loader.hide();
        if (error.code === 'auth/account-exists-with-different-credential') {
          console.error('ERROR:::', 'User with such email already exists');
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
