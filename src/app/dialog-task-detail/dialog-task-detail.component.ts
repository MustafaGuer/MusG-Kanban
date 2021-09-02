import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';

@Component({
  selector: 'app-dialog-task-detail',
  templateUrl: './dialog-task-detail.component.html',
  styleUrls: ['./dialog-task-detail.component.scss']
})
export class DialogTaskDetailComponent implements OnInit {

  task: Task = new Task;
  taskId: string = '';
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogTaskDetailComponent>,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveTask() {
    this
      .firestore
      .collection('tasks')
      .doc(this.taskId)
      .update(this.task.toJSON())
      .then(() => {
        this.dialogRef.close();
      });
  }

  deleteTask() {
    this
    .firestore
    .collection('tasks')
    .doc(this.taskId)
    .delete()
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
