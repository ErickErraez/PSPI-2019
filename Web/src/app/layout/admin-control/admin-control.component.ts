import { Component, OnInit } from '@angular/core';
import {ProyectoServiceService} from "../../services/proyecto-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.css']
})
export class AdminControlComponent implements OnInit {
  items = [];
  myProyects: any = [];
  proyectos: any;
  usuario: any = JSON.parse(localStorage.getItem('usuario'));
  userProyect: any;
  show: any = false;
  pendings: any = [];
  showPendinga: any = false;

  constructor( private proyectoServices: ProyectoServiceService,private route: Router) {
    this.getUserProyect();
    this.getTutorProyect();
    this.getPendingProyect();
  }

  ngOnInit() {
    this.getUserProyect();
    this.getTutorProyect();
    this.getPendingProyect();

  }
  getUserProyect() {

    if (this.usuario.rol == 2) {
      this.proyectoServices.getUserProyects(this.usuario.idUsuarios).subscribe(r => {

        const proyecto: any = r;
        this.validar(proyecto);
        localStorage.setItem('proyecto', JSON.stringify(proyecto.datos));
        this.proyectos = JSON.parse(localStorage.getItem('proyecto'));

      });
    }
  }

  getPendingProyect() {
    if (this.usuario.rol == 2) {
      this.proyectoServices.getUserPendingProyect(this.usuario.idUsuarios).subscribe(res => {
        let proyecto: any = res;
        proyecto = proyecto.datos;
        this.pendings = proyecto;
        this.showPendings(res);
        localStorage.setItem('proyectosPending', JSON.stringify(proyecto));
      });
    }
  }
  showPendings(id?) {
    if (id.datos.length == 0) {
      this.showPendinga = false;
    } else {
      this.showPendinga = true;
    }
  }
  abrirEnlace(item, estado,rol) {
   // this.nav.navigateForward(`student-proyect/${item}`);
    this.route.navigate([`web/student/proyect/${item}/${estado}/${rol}`]);

    console.log(item,estado);

  }

  getTutorProyect() {
    if (this.usuario.rol === 3) {
      this.proyectoServices.getTutorProyects(this.usuario.idUsuarios).subscribe(r => {
        const proyecto: any = r;
        this.validar(proyecto);
        localStorage.setItem('proyecto', JSON.stringify(proyecto.datos));
        this.proyectos = JSON.parse(localStorage.getItem('proyecto'));
      });
    }
  }
  validar(id?) {
    if (id.datos.length == 0) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
}
