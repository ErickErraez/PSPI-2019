import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentProyectPage } from './student-proyect.page';

const routes: Routes = [
  {
    path: '',
    component: StudentProyectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentProyectPageRoutingModule {}
