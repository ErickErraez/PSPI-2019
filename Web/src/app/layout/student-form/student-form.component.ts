import {Component, OnInit} from '@angular/core';
import {UserFormService} from '../../services/user-form.service';
import {ProyectoServiceService} from "../../services/proyecto-service.service";
import {Proyectos} from '../../models/Proyectos';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {usuariosProyectos} from "../../models/UsuariosProyectos";
import {Router} from "@angular/router";




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
  usuario: any = JSON.parse(localStorage.getItem('usuario'));
  period: any;
  proyectos: Proyectos = new Proyectos();
  usuarioProyecto: usuariosProyectos = new usuariosProyectos();
  miembros = [];


  constructor(private route: Router,private server: UserFormService, private proyectService: ProyectoServiceService, private toastr: ToastrService) {
 this.proyectos.paralelo="selected";
 this.proyectos.nivel="selected";
    this.Arraycategorias[this.nombre]="selected"
  }

  ngOnInit() {
    this.getPeriodo();
    this.obtenerCategorias();
  }


  async presentarAlerta() {
    // @ts-ignore
    Swal.fire({
      title: 'AGREGAR MIEMBRO',
      inputPlaceholder: 'Correo Electronico',
      input: 'text',


      inputAttributes: {
        autocapitalize: 'off',
        titleText: 'persona',

      },

      showCancelButton: true,
      confirmButtonText: 'Agregar',
      showLoaderOnConfirm: true,
      preConfirm: (data) => {
        console.log('Confirm Ok', data);
        this.buscarPersona(data);
      },

    })

  }


  buscarPersona(email) {

    this.server.getUserByEmail(email).subscribe(response => {
      let objeto: any = {};
      objeto = response;
      if (objeto.ok) {
        if (objeto.datos.rol == 2) {
          if (objeto.datos.correo != this.user.usuario.email) {
            if (this.miembros.length == 0) {

              this.miembros.push(objeto.datos);

            } else {
              for (let i = 0; i < this.miembros.length; i++) {
                console.log(this.miembros)
                if (this.miembros[i].correo == email) {
                  //  alert('Ya has agregado este correo');
                  this.toastr.error('Ya has agregado este correo', '');
                  return;

                }
              }
              this.miembros.push(objeto.datos);
            }
            console.log(this.miembros)
          } else {
            //alert('Ya estas agregado');
            this.toastr.error('Ya estás agregado', '');
            console.log(this.miembros)
          }
        } else {
          //    alert('No puedes agregar un profesor');
          this.toastr.error('No pudes agregar un profesor', '');
        }
      } else {
        //alert('El Correo no Existe  ');
        this.toastr.error('El correo no existe', '');
      }
    }, err => {
      //alert('Algo ha salido mal');
      this.toastr.error('Error al agregar un miembro', '');
      console.log(this.miembros)
    });
  }

  obtenerCategorias() {

    this.proyectService.getCategorias().subscribe(r => {

      let Categorias: any = {};
      Categorias = r;
      this.Arraycategorias = Categorias.datos;

    });

  }
  validarValores(): any {
    if (this.proyectos.nombre === null || this.proyectos.herramientas === null || this.proyectos.descripcion === null) {
      console.log('estan vacios');

    }
  }
  datosErroneos() {
    if (this.proyectos.nombre === null || this.proyectos.herramientas === null || this.proyectos.descripcion === null) {
      alert('datos vacios');

      return false;

    }
    return true;
  }


  EnviarPropuesta() {

if(this.proyectos.nombre === null ){
  console.log(this.proyectos.nombre)
  alert('falta');
}
    if(this.proyectos.descripcion === null ){
      console.log(this.proyectos.descripcion)
      alert('falta');
    }
    if(this.proyectos.herramientas === null ){
      console.log(this.proyectos.herramientas)
      alert('falta');
    }
  console.log(this.usuario);
  this.proyectos.estado = 'Pendiente';


  //this.proyectos.nivel = this.usuario.nivel;
  console.log(this.proyectos);
  console.log(this.usuario);
  this.server.postForm(this.proyectos).subscribe(r => {
    let proyectFinal: any = r;
    proyectFinal = proyectFinal.proyecto;
    this.createUserProyect(proyectFinal.idProyectos);

    this.toastr.success('Tu Propuesta se ha envíado correctamente', 'Bien..¡¡');
    this.route.navigate(['web/admin/control']);

  }, error => {
    this.toastr.error('No se ha envíado tu propuesta', 'Error');

  })





  }

  createUserProyect(proyecto) {
    console.log(proyecto);
    this.usuarioProyecto.idProyecto = parseInt(proyecto);
    this.usuarioProyecto.idEstudiante = this.usuario.idUsuarios;
    this.proyectService.createUserProyects(this.usuarioProyecto).subscribe(res => {
      for (let i = 0; i < this.miembros.length; i++) {
        this.usuarioProyecto.idEstudiante = this.miembros[i].idUsuarios;
        this.proyectService.createUserProyects(this.usuarioProyecto).subscribe(resp => {
          console.log(resp);
        });
      }
    });
  }

  getPeriodo() {
    this.proyectService.getPeriodo().subscribe(res => {
      const per: any = res;
      localStorage.setItem('periodoActual', JSON.stringify(per.datos));
      this.period = JSON.parse(localStorage.getItem('periodoActual'));
      this.proyectos.idPeriodo = this.period.idPeriodoAcademico;
    });
  }

  quitar(data) {
    // Filtramos el elemento para que quede fuera
    this.miembros = this.miembros.filter(s => s !== data);
  }

  cerrar() {

  }

}
