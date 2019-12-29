import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentFormRoutingModule} from './student-form-routing.module';
import {StudentFormComponent} from './student-form.component';


@NgModule({
  declarations: [StudentFormComponent],
  imports: [
    CommonModule,
    StudentFormRoutingModule
  ]
})
export class StudentFormModule {
}
