import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Adjuntos} from '../../models/Adjuntos';
import {Proyectos} from '../../models/Proyectos';
import {ProyectoServiceService} from '../../services/proyecto-service.service';
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-student-proyect',
  templateUrl: './student-proyect.component.html',
  styleUrls: ['./student-proyect.component.css']
})
export class StudentProyectComponent implements OnInit {

  uploadedFiles: any = [];
  adjunto: Adjuntos = new Adjuntos();

  id: string;
  estado: string;
  periodo: any;
  rol: string;
  integrantes: any = [];
  categorias = [];
  proyectos: any = JSON.parse(localStorage.getItem('proyecto'));
  proyectosPending: any = JSON.parse(localStorage.getItem('proyectosPending'));
  usuario: any = JSON.parse(localStorage.getItem('usuario'));
  proyecto: any = new Proyectos();
  proyectoSend: Proyectos = new Proyectos();
  works: any = [];

  constructor(private toastr: ToastrService,private http: HttpClient,private route: ActivatedRoute,private router: Router, private proyectoService: ProyectoServiceService,private proyectService: ProyectoServiceService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.estado = this.route.snapshot.paramMap.get('estado');
    this.rol = this.route.snapshot.paramMap.get('rol');
    this.getCategories();
    this.getWorks();
    this.proyecto = this.proyectos.find(proyect => proyect.idProyectos === parseInt(this.id));
    if (this.usuario.rol == 2 && this.estado != 'Aceptado') {
      this.proyecto = this.proyectosPending.find(proyect => proyect.idUsuariosProyectos === parseInt(this.id));
      this.getProyecto(this.proyecto.idProyecto);
    }
    if (this.proyectos.length !== 0 && this.estado != 'Pendiente') {
      if (this.usuario.rol == 3) {
        this.proyecto = this.proyectos.find(proyect => proyect.idProyectos === parseInt(this.id));
        this.findById(this.proyecto.idProyectos);
      }
      if (this.usuario.rol == 2) {
        this.proyecto = this.proyectos.find(proyect => proyect.idUsuariosProyectos === parseInt(this.id));
        if (this.estado == 'Aceptado') {
          this.findById(this.proyecto.idProyecto);
        } else {
          this.getProyecto(this.proyecto.idProyecto);
        }
      }
    }
    this.getPeriodo();
  }
  ngOnInit() {
    // tslint:disable-next-line:radix
    if (parseInt(this.rol) == 2) {
      this.getIntegrantes(this.proyecto.idProyecto);
    }
    // tslint:disable-next-line:radix
    if (parseInt(this.rol) == 3) {
      this.getIntegrantes(this.proyecto.idProyectos);
      console.log(this.proyecto);
    }
  }
  getIntegrantes(id) {
    this.proyectService.getUsersProyects(id).subscribe(r => {
      let objeto: any = r;
      objeto = objeto.datos;
      this.integrantes = objeto;
    });
  }
  getCategories() {
    this.proyectoService.getCategories().subscribe(res => {
      const categoria: any = res;
      this.categorias = categoria.datos;
    }, error => {
      this.toastr.error('Algo ha salido mal', '');
    });
  }
  getPeriodo() {
    this.proyectoService.getPeriodo().subscribe(res => {
      const per: any = res;
      localStorage.setItem('periodoActual', JSON.stringify(per.datos));
      this.periodo = JSON.parse(localStorage.getItem('periodoActual'));
      this.proyecto.idPeriodo = this.periodo.idPeriodoAcademico;
    });
  }
  getProyecto(id?) {
    this.proyectoService.getById(id).subscribe(res => {
      let data: any = res;
      data = data.datos;
      this.proyecto = data;
    });
  }
  actualizar() {
    if (this.proyecto.estado == 'Rechazado') {
      this.proyecto.estado = 'Pendiente';
    }
    this.proyectoService.actualizarProyecto(this.proyecto).subscribe(res => {
      this.toastr.success('se actualizo', '');;
    }, error => {

    });
  }
  findById(id) {
    this.proyectService.getById(id).subscribe(res => {
      const objeto: any = res;
      this.proyectoSend = objeto.datos;
    });
  }
  getWorks() {
    if (this.usuario.rol == 2) {
      this.proyectoService.getUserProyectWorks(this.usuario.idUsuarios).subscribe(res => {
        const result: any = res;
        this.works = result.datos;
      }, err => {
        alert(JSON.stringify(err));
      });

    } else if (this.usuario.rol == 3) {
      this.proyectoService.getTeacherProyectWorks(this.usuario.idUsuarios).subscribe(res => {
        const result: any = res;
        this.works = result.datos;
      }, err => {
        alert(JSON.stringify(err));
      });
    }
  }
  async createObservaciones(estado) {
    // @ts-ignore
    Swal.fire({
      title: 'ESCRIBIR OBSERVACION',
      inputPlaceholder: 'Observacion',
      input: 'text',


      inputAttributes: {
        autocapitalize: 'off',
        titleText: 'persona',

      },

      showCancelButton: true,
      confirmButtonText: 'Agregar',
      showLoaderOnConfirm: true,
      preConfirm:  (data) => {
        console.log(data);
        if (data != '') {
          if (estado == 'Aceptado') {
            this.aceptarProyecto(estado, data);
          } else {
            this.rechazarProyecto(estado, data);
          }
        } else {
          this.toastr.success('Error Debes escribir una observacion', 'Error');
        }
      },

    })

  }
  openWork(item) {
    this.router.navigate([`web/teacher/notes/${item}`]);
   // this.nav.navigateForward(`works/${item}`);
  }
  aceptarProyecto(state, observacion) {
    const update = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.proyectoSend.updated_at = update;
    this.proyectoSend.estado = state;
    this.proyectoSend.observaciones = observacion;
    console.log(this.proyectoSend);
    this.proyectService.updateState(this.proyectoSend).subscribe(r => {
      this.router.navigate(['']);
    });
  }
  rechazarProyecto(state, observacion) {
    const update = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.proyectoSend.updated_at = update;
    this.proyectoSend.estado = state;
    this.proyectoSend.observaciones = observacion;
    this.proyectService.updateState(this.proyectoSend).subscribe(r => {
      this.router.navigate(['']);
    });
  }
  fileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files);
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.adjunto.nombre = file.name;
          this.adjunto.tipo = file.type;
          this.adjunto.contenido = reader.result.toString().split(',')[1];
          this.uploadedFiles.push(this.adjunto);
          this.adjunto = new Adjuntos();
          console.log(this.uploadedFiles);
        };
      }
    }
  }


}
