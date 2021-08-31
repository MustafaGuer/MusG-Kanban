import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueAddTaskComponent } from '../dialogue-add-task/dialogue-add-task.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from 'src/models/task.class';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  task: Task = new Task();
  console = console;
  currentTask: any;

  tasks: any = [];
  todo: any = [];
  inprogress: any = [];
  testing: any = [];
  done: any = [];

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this
      .firestore
      .collection('tasks')
      .valueChanges({ idField: 'taskId' })
      .subscribe((task: any) => {
        this.tasks = task;

        this.pushToArrays();
      });
  }

  pushToArrays() {
    this.todo = [];
    this.inprogress = [];
    this.testing = [];
    this.done = [];
    this.tasks.forEach((task: any) => {
      if (task.currentStatus === 'todo') {
        this.todo.push(task);
      } else if (task.currentStatus === 'inprogress') {
        this.inprogress.push(task);
      } else if (task.currentStatus === 'testing') {
        this.testing.push(task);
      } else if (task.currentStatus === 'done') {
        this.done.push(task);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    };

    if (event.container.id == 'cdk-drop-list-0') {
      this.todo[event.currentIndex].currentStatus = 'todo';
    } else if (event.container.id == 'cdk-drop-list-1') {
      this.inprogress[event.currentIndex].currentStatus = 'inprogress';
    } else if (event.container.id === 'cdk-drop-list-2') {
      this.testing[event.currentIndex].currentStatus = 'testing';
    } else {
      this.done[event.currentIndex].currentStatus = 'done';
    }
    this.currentTask = event.container.data[event.currentIndex];
    this.updateTasks();
  }

  updateTasks() {

    this
      .firestore
      .collection('tasks')
      .doc(this.currentTask.taskId)
      .update({
        'currentStatus': this.currentTask.currentStatus
      })
      .then(() => {
        console.log('UPDATE SUCCESSFULL');
      });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogueAddTaskComponent);
  }

}
