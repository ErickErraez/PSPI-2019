import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {AdminControlComponent} from './admin-control.component';


const routes: Routes = [{
  path: '',
  component: AdminControlComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminControlRoutingModule { }
