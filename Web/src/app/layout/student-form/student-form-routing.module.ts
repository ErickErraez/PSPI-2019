import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {StudentFormComponent} from './student-form.component';


const routes: Routes = [{
  path: '',
  component: StudentFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentFormRoutingModule { }
