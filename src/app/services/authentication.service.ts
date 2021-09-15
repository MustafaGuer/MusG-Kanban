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
    })
    .catch (error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }

  singInUser(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      const user = res.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }

  


}
