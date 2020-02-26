import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Proyectos} from '../../models/Proyectos';
import {ProyectoServiceService} from '../../services/proyecto-service.service';
import {UserFormService} from "../../services/user-form.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-assign',
  templateUrl: './admin-assign.component.html',
  styleUrls: ['./admin-assign.component.css']
})
export class AdminAssignComponent implements OnInit {

  valor: any = null;
  paralelo: any = null;
  docentes: any = [];
  proyecto: Proyectos = new Proyectos();
  proyectos: any;

  constructor(private userService : UserFormService,
              private adminService: AdminService,
              private toastr: ToastrService,
              private proyectoServiceService: ProyectoServiceService) {

    this.userService.getDocentes().subscribe(r => {
      let objeto: any = {};
      objeto = r;
      this.docentes = objeto.datos;

    });
  }

  asignarTutores() {
    alert('hola')
  this.getProyectos();
  }

  getProyectos(){
    if (this.valor != null && this.paralelo != null) {
      this.proyectoServiceService.getProyectsNivel(this.valor, this.paralelo).subscribe(r => {

        this.proyectos = r;
        this.proyectos = this.proyectos.datos;
        if (this.proyectos.length == 0) {
          this.toastr.error('Aún no hay proyectos en este nivel!', 'UPS');
         } else {
          for (let i = 0; i < this.proyectos.length; i++) {
            this.proyecto.idProyectos = this.proyectos[i].idProyectos;
            this.adminService.updateProyecto(this.proyecto).subscribe(res => {
            });
          }
          this.toastr.success('Se ha asignado el tutor!', 'Excelente');
          this.cancelarAsignacion();
        }
      });
    }else {
      this.toastr.success('Faltan Datos Necesarios!', 'UPS');
    }
  }
  cancelarAsignacion() {
    this.valor = null;
    this.paralelo = null;
    this.proyecto = new Proyectos();
  }

  ngOnInit() {
  }


  editarPeriodo(){
    alert('metodoEditar')
  }
}
