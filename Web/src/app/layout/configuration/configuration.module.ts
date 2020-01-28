import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import {ConfigurationComponent} from './configuration.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
