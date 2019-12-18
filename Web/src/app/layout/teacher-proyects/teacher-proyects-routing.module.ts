import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {TeacherProyectsComponent} from './teacher-proyects.component';


const routes: Routes = [{
  path: '',
  component: TeacherProyectsComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherProyectsRoutingModule { }
