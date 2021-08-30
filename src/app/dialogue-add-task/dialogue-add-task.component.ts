import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';

@Component({
  selector: 'app-dialogue-add-task',
  templateUrl: './dialogue-add-task.component.html',
  styleUrls: ['./dialogue-add-task.component.scss']
})
export class DialogueAddTaskComponent implements OnInit {

  task: Task = new Task();
  date = new FormControl(new Date()); // that makes that i get todays date automatically
  loading: boolean = false;

  constructor( 
    public dialogRef: MatDialogRef<DialogueAddTaskComponent>,
    private firestore: AngularFirestore
    ) { }
  
  ngOnInit(): void {
  }


  /**
   * this function transfer new data to firebase
   */
  saveTask() {
    this.task.date = this.date.value.getTime();
    this.loading = true;

    this
    .firestore
    .collection('tasks')
    .add(this.task.toJSON())
    .then((result: any) => {
      this.loading = false;
      this.dialogRef.close();
    })

    console.log('Current Task is: ', this.task);
  }

  /**
   * this function close the dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
