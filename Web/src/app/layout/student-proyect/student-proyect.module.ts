import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProyectRoutingModule } from './student-proyect-routing.module';
import {StudentProyectComponent} from './student-proyect.component';


@NgModule({
  declarations: [StudentProyectComponent],
  imports: [
    CommonModule,
    StudentProyectRoutingModule
  ]
})
export class StudentProyectModule { }
