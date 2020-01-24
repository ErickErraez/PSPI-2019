import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAssignRoutingModule } from './admin-assign-routing.module';
import {AdminAssignComponent} from './admin-assign.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [AdminAssignComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminAssignRoutingModule
  ]
})
export class AdminAssignModule { }
