import {Component, OnInit} from '@angular/core';
import {UserFormService} from '../../services/user-form.service';
import {ProyectoServiceService} from "../../services/proyecto-service.service";
import {Proyectos} from '../../models/Proyectos';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'));

  nombre: any;
  descripcion: any;
  herramientas: any;
  Arraycategorias = [];
  period: any;
  proyectos: Proyectos = new Proyectos();

  constructor(private server: UserFormService, private proyectService: ProyectoServiceService) {
  }

  ngOnInit() {
    this.getPeriodo();
    this.obtenerCategorias();
  }

  obtenerCategorias() {

    this.proyectService.getCategorias().subscribe(r => {

      let Categorias: any = {};
      Categorias = r;
      this.Arraycategorias = Categorias.datos;

    });

  }


  EnviarPropuesta() {
    this.proyectos.estado = 'pendiente';
    this.proyectos.nivel='Quinto';

    this.server.postForm(this.proyectos).subscribe(r => {
      console.log('el formulario se guardo con éxito' + r);

    }, error => {
      console.log(error);
    })
  }

  getPeriodo() {
    this.proyectService.getPeriodo().subscribe(res => {
      const per: any = res;
      localStorage.setItem('periodoActual', JSON.stringify(per.datos));
      this.period = JSON.parse(localStorage.getItem('periodoActual'));
      this.proyectos.idPeriodo = this.period.idPeriodoAcademico;
    });
  }

  cerrar() {

  }

}
