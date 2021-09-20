import { Component, OnInit } from '@angular/core';
import { DialogSignupComponent } from '../dialog-signup/dialog-signup.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogSigninComponent } from '../dialog-signin/dialog-signin.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openSignUp(): void {
    const dialogRef = this.dialog.open(DialogSignupComponent);
  }

  openLogIn(): void {
    const dialogRef = this.dialog.open(DialogSigninComponent);
  }
}
