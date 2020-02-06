import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Adjuntos} from '../../models/Adjuntos';
import {Proyectos} from '../../models/Proyectos';
import {ProyectoServiceService} from '../../services/proyecto-service.service';

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
  proyectos: any = JSON.parse(localStorage.getItem('proyecto'));
  usuario: any = JSON.parse(localStorage.getItem('usuario'));
  proyecto: any = new Proyectos();

  constructor(private http: HttpClient,private route: ActivatedRoute, private proyectService: ProyectoServiceService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.estado = this.route.snapshot.paramMap.get('estado');
    this.proyecto = this.proyectos.find(proyect => proyect.idProyectos === parseInt(this.id));
    console.log(this.proyecto);
  }

  ngOnInit() {

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
