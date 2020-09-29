import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = null;

  constructor(
    private afu: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    this.afu.authState.subscribe(user => {
      this.authState = user;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  registerWithEmail(form: any): any {
    return from(this.afu.createUserWithEmailAndPassword(form.email, form.password))
      .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
        const user = {
          displayName: form.email.split('@')[0],
          photoURL: '',
          email: form.email
        };

        this.authState = userCredential;
        return this.userService.updateUser(user);
      }));
  }

  loginWithEmail(form: any): any {
    return from(this.afu.signInWithEmailAndPassword(form.email, form.password))
      .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
        const user = {
          displayName: form.email.split('@')[0],
          photoURL: '',
          email: form.email
        };

        this.authState = userCredential;
        return this.userService.updateUser(user);
      }));
  }

  loginWithGoogle(): Observable<any> {
    return from(this.afu.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
        const { displayName, photoURL, email } = userCredential.user;
        this.authState = userCredential.user;
        return this.userService.updateUser({ displayName, photoURL, email });
      }));
  }

  loginWithFacebook(): Observable<any> {
    return from(this.afu.signInWithPopup(new auth.FacebookAuthProvider()))
    .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
      const { displayName, photoURL, email } = userCredential.user;
      this.authState = userCredential.user;
      return this.userService.updateUser({ displayName, photoURL, email });
    }));
  }

  loginWithGithub(): Observable<any> {
    return from(this.afu.signInWithPopup(new auth.GithubAuthProvider()))
    .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
      const { displayName, photoURL, email } = userCredential.user;
      this.authState = userCredential.user;
      return this.userService.updateUser({ displayName, photoURL, email });
    }));
  }

  logout(): void {
    this.afu.signOut().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
