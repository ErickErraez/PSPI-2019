import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentProyectRoutingModule} from './student-proyect-routing.module';
import {StudentProyectComponent} from './student-proyect.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [StudentProyectComponent],
  imports: [
    CommonModule,
    StudentProyectRoutingModule,
    FormsModule
  ]
})
export class StudentProyectModule {


}
