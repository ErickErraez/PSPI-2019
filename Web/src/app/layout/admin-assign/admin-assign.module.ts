import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAssignRoutingModule } from './admin-assign-routing.module';
import {AdminAssignComponent} from './admin-assign.component';


@NgModule({
  declarations: [AdminAssignComponent],
  imports: [
    CommonModule,
    AdminAssignRoutingModule
  ]
})
export class AdminAssignModule { }
