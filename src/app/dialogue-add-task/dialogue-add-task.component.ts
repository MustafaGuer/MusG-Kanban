import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogue-add-task',
  templateUrl: './dialogue-add-task.component.html',
  styleUrls: ['./dialogue-add-task.component.scss']
})
export class DialogueAddTaskComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DialogueAddTaskComponent> ) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
