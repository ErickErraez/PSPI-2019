import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherProyectsPageRoutingModule } from './teacher-proyects-routing.module';

import { TeacherProyectsPage } from './teacher-proyects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherProyectsPageRoutingModule
  ],
  declarations: [TeacherProyectsPage]
})
export class TeacherProyectsPageModule {}
