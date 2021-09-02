import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueAddTaskComponent } from '../dialogue-add-task/dialogue-add-task.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from 'src/models/task.class';
import { DialogTaskDetailComponent } from '../dialog-task-detail/dialog-task-detail.component';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  task: Task = new Task();

  console = console;
  droppedTask: any;

  tasks: any = [];

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

        console.log('TASK: ', task);
        // this.todo = [];
        // this.inProgress = [];
        // this.testing = [];
        // this.done = [];
        // task.forEach((t: any) => {
        //   if(t['currentStatus'] == 'todo') {
        //     this.todo.push(new Task(t));
        //   } else if(t['currentStatus'] == 'inProgress') {
        //     this.inProgress.push(new Task(t));
        //   } else if(t['currentStatus'] == 'testing') {
        //     this.testing.push(new Task(t));
        //   } else if(t['currentStatus'] == 'done') {
        //     this.done.push(new Task(t));
        //   }
        // });

        this.todo = task.filter((t: any) => t['currentStatus'] == 'todo');
        this.inProgress = task.filter((t: any) => t['currentStatus'] == 'inProgress');
        this.testing = task.filter((t: any) => t['currentStatus'] == 'testing');
        this.done = task.filter((t: any) => t['currentStatus'] == 'done');
        
        this.logArrays('at init');
      });
    
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      this.droppedTask = event.container.data[event.currentIndex];
      this.saveTasks();
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.droppedTask = event.container.data[event.currentIndex];
      this.updateTasksStatus(event);
    };
    console.log('EVENT: ', event);
    this.logArrays('after drop');
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

    this.saveTasks();
  }

  saveTasks() {

    this
      .firestore
      .collection('tasks')
      .doc(this.droppedTask.taskId)
      .update({
        currentStatus: this.droppedTask.currentStatus
      })
      .then(() => {
        console.log('SAVE SUCCESSFULL');
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogueAddTaskComponent);
  }

  openDialogTaskDetail(task: any) {
    const dialog = this.dialog.open(DialogTaskDetailComponent);
    dialog.componentInstance.task = new Task(task);
    dialog.componentInstance.taskId = task.taskId;
    console.log('detail task: ', task);
    console.log('detail taskId: ', task.taskId)
  }




  logArrays(c: string) {
    console.log('todo ' + c, this.todo);
    console.log('inProgress ' + c, this.inProgress);
    console.log('testing ' + c, this.testing);
    console.log('done ' + c, this.done);
  }
}
