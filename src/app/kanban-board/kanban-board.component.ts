import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueAddTaskComponent } from '../dialogue-add-task/dialogue-add-task.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {


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

      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogueAddTaskComponent);
  }

}
