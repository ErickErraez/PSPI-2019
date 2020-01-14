import { Component, OnInit } from '@angular/core';
import { UserFormService } from '../../services/user-form.service';
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

  constructor(private server: UserFormService) { }

  ngOnInit() {
    
  }
  traerDatos() {
    this.server.getAllForm().subscribe(r => {
      console.log(r);
    })
  }

  EnviarPropuesta() {

    let objeto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      Herramientas: this.herramientas,
      estado: 'PENDIENTE'
    }

    this.server.postForm(objeto).subscribe(r => {
      console.log(r);

    }, err => { console.log(err) });
  }
  cerrar() {

  }

}
