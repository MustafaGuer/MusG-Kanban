import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueAddTaskComponent } from '../dialogue-add-task/dialogue-add-task.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  tasks: any = [];

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.
      firestore
      .collection('tasks')
      .valueChanges()
      .subscribe((task: any) => {
        console.log('Task is: ', task);
        this.tasks = task;
        console.log('This Tasks are: ', this.tasks);
      });
  }

  todo: any = [
    'Get to work',
    'Pick up groceries',
    'Get up',
    'Brush teeth',
    'Check e-mail',
    'Take a shower',
    'Walk dog',
    'Go home',
    'Fall asleep'
  ];

  inprogress: any = [
    {
      'title': 'Test',
      'urgency': 'high',
      'description': 'This is a test message.'
    },
    {
      'title': 'Test 2',
      'urgency': 'medium',
      'description': 'This is a second test message.'
    }
  ];

  testing: any  = [];

  done: any  = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogueAddTaskComponent);
  }

}
