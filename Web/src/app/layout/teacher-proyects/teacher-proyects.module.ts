import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeacherProyectsRoutingModule} from './teacher-proyects-routing.module';
import {TeacherProyectsComponent} from './teacher-proyects.component';


@NgModule({
  declarations: [TeacherProyectsComponent],
  imports: [
    CommonModule,
    TeacherProyectsRoutingModule
  ]
})
export class TeacherProyectsModule {
}
