import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherNotesPageRoutingModule } from './teacher-notes-routing.module';

import { TeacherNotesPage } from './teacher-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherNotesPageRoutingModule
  ],
  declarations: [TeacherNotesPage]
})
export class TeacherNotesPageModule {}
