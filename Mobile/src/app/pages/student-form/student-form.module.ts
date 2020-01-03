import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserFormPageRoutingModule } from './student-form-routing.module';

import { StudentFormPage } from './student-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserFormPageRoutingModule
  ],
  declarations: [StudentFormPage]
})
export class StudentFormPageModule {}
