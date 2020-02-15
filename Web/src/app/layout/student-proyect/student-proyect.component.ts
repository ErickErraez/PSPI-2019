import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Adjuntos} from '../../models/Adjuntos';
import {Proyectos} from '../../models/Proyectos';
import {ProyectoServiceService} from '../../services/proyecto-service.service';
import {ToastrService} from "ngx-toastr";

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

  constructor(private toastr: ToastrService,private http: HttpClient,private route: ActivatedRoute, private proyectoService: ProyectoServiceService,private proyectService: ProyectoServiceService) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.estado = this.route.snapshot.paramMap.get('estado');
    this.rol = this.route.snapshot.paramMap.get('rol');
    this.proyecto = this.proyectos.find(proyect => proyect.idProyectos === parseInt(this.id));
    this.getCategories();
    this.getPeriodo();
    this.getWorks();

    if (this.proyectos.length !== 0) {
      this.proyecto = this.proyectos.find(proyect => proyect.idProyectos === parseInt(this.id));
      if (this.usuario.rol == 3) {
        this.findById(this.proyecto.idProyectos);
      }
      if (this.usuario.rol == 2) {
        console.log(this.proyectos);
        this.proyecto = this.proyectos.find(proyect => proyect.idProyecto === parseInt(this.id));
        if (this.estado == 'Aceptado') {
          this.findById(this.proyecto.idProyecto);
        } else {

          this.getProyecto(this.proyecto.idProyecto);
          console.log(this.proyecto.idProyecto);
        }
      }
    } else {
      if (this.usuario.rol == 2) {
        this.proyecto = this.proyectosPending.find(proyect => proyect.idProyecto === parseInt(this.id));
        this.getProyecto(this.proyecto.idProyecto);
      }
    }
  }

  ngOnInit() {
    this.getIntegrantes();

  }
  getIntegrantes() {
    this.proyectService.getUsersProyects(this.proyecto.idProyectos).subscribe(r => {
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
    this.proyectService.getById(this.proyecto.idProyectos).subscribe(res => {
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
