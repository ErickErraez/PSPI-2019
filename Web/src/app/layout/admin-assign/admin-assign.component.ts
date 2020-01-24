import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Proyectos} from '../../models/Proyectos';
import {ProyectoServiceService} from '../../services/proyecto-service.service';

@Component({
  selector: 'app-admin-assign',
  templateUrl: './admin-assign.component.html',
  styleUrls: ['./admin-assign.component.css']
})
export class AdminAssignComponent implements OnInit {

  nivel: any;
  docentes: any;
  proyecto: Proyectos = new Proyectos();

  constructor(private adminService: AdminService, private proyectoServiceService: ProyectoServiceService) {
    this.adminService.getDocentes().subscribe(r => {
      console.log(r);
      this.docentes = r;
      this.docentes = this.docentes.datos;
    });
  }

  asignarTutores() {
    this.proyectoServiceService.getProyectosByNivel(this.id).subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit() {
  }

  agregarModal(id) {
    this.nivel = id;
    this.proyecto = new Proyectos();
  }

}
