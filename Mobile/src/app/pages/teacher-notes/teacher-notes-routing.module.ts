import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherNotesPage } from './teacher-notes.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherNotesPageRoutingModule {}
