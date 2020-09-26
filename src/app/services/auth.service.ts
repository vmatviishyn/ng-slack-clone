import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = null;

  constructor(
    private afu: AngularFireAuth,
    private router: Router
  ) {
    this.afu.authState.subscribe(user => {
      this.authState = user;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  registerWithEmail(form: any): any {
    return this.afu.createUserWithEmailAndPassword(form.email, form.password).then(user => this.authState = user);
  }

  loginWithEmail(form: any): any {
    return this.afu.signInWithEmailAndPassword(form.email, form.password).then(user => this.authState = user);
  }

  loginWithGoogle(): Observable<any> {
    return from(this.afu.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
        const { displayName, photoURL, email } = userCredential.user;
        this.authState = userCredential.user;

        return of({
          name: displayName,
          profilePhoto: photoURL,
          email
        });
      }));
  }

  loginWithFacebook(): Observable<any> {
    return from(this.afu.signInWithPopup(new auth.FacebookAuthProvider()))
    .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
      const { displayName, photoURL, email } = userCredential.user;
      this.authState = userCredential.user;

      return of({
        name: displayName,
        profilePhoto: photoURL,
        email
      });
    }));
  }

  loginWithGithub(): Observable<any> {
    return from(this.afu.signInWithPopup(new auth.GithubAuthProvider()))
    .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
      const { displayName, photoURL, email } = userCredential.user;
      this.authState = userCredential.user;

      return of({
        name: displayName,
        profilePhoto: photoURL,
        email
      });
    }));
  }

  logout(): void {
    this.afu.signOut().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
