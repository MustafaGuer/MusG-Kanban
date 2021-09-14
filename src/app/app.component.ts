import { Component } from '@angular/core';
import { DialogSignupComponent } from './dialog-signup/dialog-signup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MusG-Kanban';

  constructor(public dialog: MatDialog) {

  }



  openSignUp(): void {
    const dialogRef = this.dialog.open(DialogSignupComponent);
  }
}