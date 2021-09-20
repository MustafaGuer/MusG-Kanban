import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private auth: AngularFireAuth, 
    public firebase: FirebaseApp
  ) { }

  signUpUser(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      const user = res.user;
      console.log('res signup: ', res);
    })
    .catch (error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      console.log('error signup: ', error);
      console.log('errorCode signup: ', errorCode);
      console.log('errorMessage signup: ', errorMessage);
    })
  }

  signInUser(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      const user = res.user;
      console.log('res signin: ', res);

      this.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          console.log(user.uid);
        } else {
          // User not logged in or has just logged out.
        }
      });

    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log('error signin: ', error);
      console.log('errorCode signin: ', errorCode);
      console.log('errorMessage signin: ', errorMessage);
    })
  }

  


}
