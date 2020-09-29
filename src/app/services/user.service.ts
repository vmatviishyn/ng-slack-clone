import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afu: AngularFireAuth,
    private afs: AngularFirestore,
  ) { }

  updateUser(userInfo: any): Observable<any> {
    const user = {
      name: userInfo.displayName,
      profilePhoto: userInfo.photoURL,
      email: userInfo.email
    };

    let firebaseUserData: firebase.User;

    return this.afu.authState.pipe(
      switchMap((userData: firebase.User) => {
        firebaseUserData = userData;
        return this.afs.doc(`users/${userData.uid}`).get();
      }),
      switchMap((document: any) => {
        const method = document.exists ? 'update' : 'set';
        return of(this.afs.doc(`users/${firebaseUserData.uid}`)[method](user));
      }),
      switchMap(() => of(user))
    );
  }

  getUser(): Observable<any> {
    return this.afu.authState.pipe(
      switchMap((firebaseUser: any) => {
        return this.afs.doc(`users/${firebaseUser.uid}`).valueChanges();
      })
    );
  }
}
