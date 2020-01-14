import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { StudentFormRoutingModule } from './student-form-routing.module';
import { StudentFormComponent } from './student-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [StudentFormComponent],
  imports: [
    CommonModule,
    StudentFormRoutingModule,
    FormsModule
  ]
})
export class StudentFormModule {

}
