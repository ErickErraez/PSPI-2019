import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {AdminAssignComponent} from './admin-assign.component';


const routes: Routes = [{
  path: '',
  component: AdminAssignComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAssignRoutingModule { }
