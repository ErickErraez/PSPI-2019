import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalTareasPage } from './modal-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: ModalTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalTareasPageRoutingModule {}
