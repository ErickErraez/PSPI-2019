import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherNotesRoutingModule } from './teacher-notes-routing.module';
import {TeacherNotesComponent} from './teacher-notes.component';


@NgModule({
  declarations: [TeacherNotesComponent],
  imports: [
    CommonModule,
    TeacherNotesRoutingModule
  ]
})
export class TeacherNotesModule { }
