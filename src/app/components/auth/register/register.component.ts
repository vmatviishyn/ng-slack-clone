import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoaderService } from '../../../services/loader.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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

    this.authService.registerWithEmail(this.registrationForm.value).then(() => {
      this.registrationForm.reset();
      this.router.navigate(['/home']);
      this.loader.hide();
    }).catch(error => {
      this.registrationForm.get('email').setErrors({
        serverErrorEmail: error.message
      });
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
       console.warn('ERROR:::', 'User with such email already exists');
      }
    });
  }
}
