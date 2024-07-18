import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineBoardComponent } from './timeline-board/timeline-board.component';

const routes: Routes = [
  {
    path: '',
    component: TimelineBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
