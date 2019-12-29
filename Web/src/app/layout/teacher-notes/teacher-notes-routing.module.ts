import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {TeacherNotesComponent} from './teacher-notes.component';


const routes: Routes = [{
  path: '',
  component: TeacherNotesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherNotesRoutingModule { }
