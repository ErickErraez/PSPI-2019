import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherProyectsPage } from './teacher-proyects.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherProyectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherProyectsPageRoutingModule {}
