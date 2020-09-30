import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { LoaderService } from '../../../services/loader.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.buildEmailForm();
  }

  buildEmailForm(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  emailRegistration(): void {
    this.loader.show();

    if (this.registrationForm.invalid) { return; }

    this.authService.registerWithEmail(this.registrationForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.registrationForm.reset();
          this.router.navigate(['/app']);
          this.loader.hide();
        }, error => {
          this.registrationForm.get('email').setErrors({
            serverErrorEmail: error.message
          });
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
      }, error => {
        this.loader.hide();
        if (error.code === 'auth/account-exists-with-different-credential') {
          console.warn('ERROR:::', 'User with such email already exists');
        }
      });
  }
}
