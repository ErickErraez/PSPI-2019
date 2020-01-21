import {Component, OnInit} from '@angular/core';
import {UserFormService} from '../../services/user-form.service';
import {ProyectoServiceService} from "../../services/proyecto-service.service";
import {Proyectos} from '../../models/Proyectos';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';


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
  miembros = [];

  constructor(private server: UserFormService, private proyectService: ProyectoServiceService, private toastr: ToastrService) {
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
        console.log('Confirm Ok',data);
        this.buscarPersona(data);
      },

    })

  }


  buscarPersona(email) {

    this.server.getUserByEmail(email).subscribe(response => {
      let objeto: any = {};
      objeto = response;
      if (objeto.ok) {
        if (objeto.datos.idRol == 4) {
          if (objeto.datos.correo != this.user.usuario.email) {
            if (this.miembros.length == 0) {
              this.miembros.push(objeto.datos);
            } else {
              for (let i = 0; i < this.miembros.length; i++) {
                if (this.miembros[i].correo == email) {

                //  alert('Ya has agregado este correo');
                  this.toastr.error('Ya has agregado este correo', '');

                } else {
                  this.miembros.push(objeto.datos);
                }
              }
            }
          } else {
            //alert('Ya estas agregado');
            this.toastr.error('Ya estás agregado', '');
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
    });
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
    this.proyectos.nivel = 'Quinto';

    this.server.postForm(this.proyectos).subscribe(r => {


    }, error => {
      this.toastr.error('Error!', 'No se ha envíado correctamente!');
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
  quitar(data) {
    // Filtramos el elemento para que quede fuera
    this.miembros = this.miembros.filter(s => s !== data);
  }
  cerrar() {

  }

}
