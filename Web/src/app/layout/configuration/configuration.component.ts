import {Component, OnInit} from '@angular/core';
import {Categorias} from "../../models/Categorias";
import {AdminService} from "../../services/admin.service";
import {ProyectoServiceService} from "../../services/proyecto-service.service";
import {Notas} from "../../models/Notas";
import {ToastrService} from "ngx-toastr";
import {error} from "util";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  show: any = {};
  categorias: any;
  stateWork: any = '';
  fecha: any;
  works: any = [];
  tipos: any = [];
  cont = 0;
  tipo: any = null;
  tipoUpdate: any = {};
  usuario: any = JSON.parse(localStorage.getItem('usuario'));
  nota: Notas = new Notas();
  categoria: Categorias = new Categorias();

  constructor(private adminService: AdminService, private proyectoServices: ProyectoServiceService, private toastr: ToastrService) {
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

  createWork() {
    if (this.nota.fechaLimite !== undefined || this.nota.idTipoEvaluacion !== undefined) {
      this.nota.fechaLimite = this.nota.fechaLimite.replace('T', ' ');
      this.nota.fechaLimite = this.nota.fechaLimite.substr(0, 19);
      console.log(this.nota.fechaLimite);
      this.proyectoServices.getTutorUserProyects(this.usuario.idUsuarios).subscribe(res => {
        let result: any = res;
        result = result.datos;
        for (let i = 0; i < result.length; i++) {
          this.nota.idUsuariosProyectos = result[i].idUsuariosProyectos;
          console.log(this.nota.idUsuariosProyectos);
          this.proyectoServices.createWork(this.nota).subscribe(resp => {
            this.toastr.success('Se creo la tarea', 'Excelente');
          }, err => {
            this.toastr.error('No se ha creado la tarea', 'Ooooh No !');
          });
        }
      }, error => {
        this.toastr.error('Error en el servidor', 'Ooooh No !');
      });
    } else {
      this.toastr.error('Debes llenar todos los campos', 'Sugerencia');
    }
  }

  showNew(state) {
    this.stateWork = state;
  }
  getData() {
    this.adminService.getNotesAdmin(this.tipo).subscribe(res => {
      this.tipos = res['datos'];
      console.log(this.tipos);
      for (let i = 0; i < this.tipos.length; i++) {
        this.tipos[i].fechaLimite = new Date(this.tipos[i].fechaLimite).toISOString().slice(0, 19).replace('T', ' ');
      }
    });
  }

  cancelEdit() {
    this.tipos = [];
    this.tipo = null;
  }
  estaSeleccionado(porVerificar): boolean {
    if (this.categoria == null) {
      return false;
    }
    return porVerificar.idCategorias === this.categoria.idCategorias;
  }


  onSelect(actual): void {
    if (actual.idNotas != undefined) {
      this.tipoUpdate = actual;
     // this.presentModal(this.tipoUpdate);
    } else {
      this.categoria = actual;
    }
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
