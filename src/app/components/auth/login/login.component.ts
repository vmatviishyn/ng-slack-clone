import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

    this.authService.loginWithEmail(this.loginForm.value).then(() => {
      this.loginForm.reset();
      this.router.navigate(['/home']);
      this.loader.hide();
    }).catch(error => {
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
    this.authService.loginWithGoogle().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  loginWithGithub(): void {
    this.authService.loginWithGithub().subscribe(() => {
      this.router.navigate(['/home']);
    }, error => {
      if (error.code === 'auth/account-exists-with-different-credential') {
       console.error('ERROR:::', 'User with such email already exists');
      }
    });
  }
}
