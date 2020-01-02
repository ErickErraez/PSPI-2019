import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAssignPage } from './admin-assign.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAssignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAssignPageRoutingModule {}
