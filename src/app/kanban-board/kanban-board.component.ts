import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueAddTaskComponent } from '../dialogue-add-task/dialogue-add-task.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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

  todo: any = [];
  inProgress: any = [];
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

        console.log(task);

        this.todo = task.filter((t: any) => t['currentStatus'] == 'todo');
        this.inProgress = task.filter((t: any) => t['currentStatus'] == 'inProgress');
        this.testing = task.filter((t: any) => t['currentStatus'] == 'testing');
        this.done = task.filter((t: any) => t['currentStatus'] == 'done');
      });

  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      this.currentTask = event.container.data[event.currentIndex];
      // this.saveTasks();
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.currentTask = event.container.data[event.currentIndex];
      this.updateTasksStatus(event);
    };
    console.log('EVENT: ', event);
  }

  updateTasksStatus(event: CdkDragDrop<string[]>) {
    if (event.container.id == 'cdk-drop-list-0') {
      this.todo[event.currentIndex].currentStatus = 'todo';
    } else if (event.container.id == 'cdk-drop-list-1') {
      this.inProgress[event.currentIndex].currentStatus = 'inProgress';
    } else if (event.container.id === 'cdk-drop-list-2') {
      this.testing[event.currentIndex].currentStatus = 'testing';
    } else if (event.container.id === 'cdk-drop-list-3') {
      this.done[event.currentIndex].currentStatus = 'done';
    }

    // this.saveTasks();
  }

  saveTasks() {

    this
      .firestore
      .collection('tasks')
      .doc(this.currentTask.taskId)
      .update({
        currentStatus: this.currentTask.currentStatus
      })
      .then(() => {
        console.log('SAVE SUCCESSFULL');
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogueAddTaskComponent);
  }

}
