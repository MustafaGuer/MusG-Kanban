import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private auth: AngularFireAuth
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
