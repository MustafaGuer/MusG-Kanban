import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogTaskDetailComponent } from './dialog-task-detail/dialog-task-detail.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';

const routes: Routes = [
  {path: '', component: KanbanBoardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
