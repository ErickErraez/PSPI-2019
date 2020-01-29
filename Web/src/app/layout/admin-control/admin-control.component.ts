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

  constructor( private proyectoServices: ProyectoServiceService,private route: Router) { }

  ngOnInit() {
    this.getUserProyect();
  }
  getUserProyect() {


    this.proyectoServices.getUserProyects(this.usuario.idUsuarios).subscribe(r => {

      const proyecto: any = r;
      this.validar(proyecto);
      localStorage.setItem('proyecto', JSON.stringify(proyecto.datos));
      this.proyectos = JSON.parse(localStorage.getItem('proyecto'));

    });
  }

  abrirEnlace(item, estado) {
   // this.nav.navigateForward(`student-proyect/${item}`);
    this.route.navigate(['web/student/proyect']);
    console.log(item,estado);

  }
  validar(id?) {
    if (id.datos.length == 0) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
}
