import { Component, OnInit } from '@angular/core';
import {Categorias} from "../../models/Categorias";
import{ AdminService} from "../../services/admin.service";
import {ProyectoServiceService} from "../../services/proyecto-service.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  show: any = {};
  categorias: any;
  categoria: Categorias = new Categorias();

  constructor(private adminService: AdminService, private proyectoServices: ProyectoServiceService) {
    this.adminService.getConfiguracion().subscribe(res => {
      this.show = res;
      this.show = this.show.datos;
      console.log(this.show);
    })

  }

  ngOnInit() {
    this.getCategorias();
  }
  getCategorias() {
    this.proyectoServices.getCategories().subscribe(res => {
      this.categorias = res;
      this.categorias = this.categorias.datos;
    });
  }
  changeStatus(variable) {
    this.show.formularioSolicitud = variable;
    if (this.show.formularioSolicitud) {
      this.show.formularioSolicitud = true;
      this.adminService.updateConfiguraciones(this.show).subscribe(res => {
        console.log(res);
      });
    } else {
      this.show.formularioSolicitud = false;
      this.adminService.updateConfiguraciones(this.show).subscribe(res => {
        console.log(res);
      });
    }
  }
}
