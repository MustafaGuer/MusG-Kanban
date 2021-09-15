import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from "../services/authentication.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dialog-signup',
  templateUrl: './dialog-signup.component.html',
  styleUrls: ['./dialog-signup.component.scss']
})
export class DialogSignupComponent implements OnInit {

  hide = true;
  loading = false;
  user: User = new User();

  constructor(
    public dialogRef: MatDialogRef<DialogSignupComponent>,
    public authenticationService: AuthenticationService,
    public auth: AngularFireAuth,
    ) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}