import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTareasPageRoutingModule } from './modal-tareas-routing.module';

import { ModalTareasPage } from './modal-tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalTareasPageRoutingModule
  ],
  declarations: [ModalTareasPage]
})
export class ModalTareasPageModule {}
