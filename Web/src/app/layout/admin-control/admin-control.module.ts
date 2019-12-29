import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminControlRoutingModule } from './admin-control-routing.module';
import {AdminControlComponent} from './admin-control.component';


@NgModule({
  declarations: [AdminControlComponent],
  imports: [
    CommonModule,
    AdminControlRoutingModule
  ]
})
export class AdminControlModule { }
