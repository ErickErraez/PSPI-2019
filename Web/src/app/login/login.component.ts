import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Usuarios} from "../../../../Mobile/src/app/models/Usuarios";
import {ProyectoServiceService} from "../services/proyecto-service.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  tipoInput: any = 'password';
  validateLogin: boolean;
  person: Usuarios = new Usuarios();
  user: any;

  constructor(private service: AuthService, private route: Router, private toastr: ToastrService, private proyectService: ProyectoServiceService,
              public router: Router) {
  }

  ngOnInit() {
  }

  mostrarContrasena(item) {
    if (item === 'password') {
      this.tipoInput = 'text';
    }
    if (item === 'text') {
      this.tipoInput = 'password';
    }
  }

  login(event) {

    if (event.which === 13 || event === 13) {
      this.validateLogin = false;
      const clientId = 1;
      const clientSecret = 'gCKtEi6W8KpXgWCv4sDSlkM6IErcQQLTuvW5j5yg';
      const grantType = 'password';

      this.userName = this.userName.toLocaleLowerCase();
      if (this.userName.search('@') === -1) {
        this.userName = this.userName + '@yavirac.edu.ec';
      }
      this.service.postPublic('oauth/token', {
        client_id: 1,
        client_secret: 'gCKtEi6W8KpXgWCv4sDSlkM6IErcQQLTuvW5j5yg',
        grant_type: 'password',
        username: this.userName,
        password: this.password
      }).subscribe(
        response => {
          localStorage.setItem('token', JSON.stringify(response['access_token']));
          localStorage.setItem('isLoggedin', 'true');
          this.service.get('usuarios/login?email=' + this.userName).subscribe(response2 => {
            localStorage.setItem('user', JSON.stringify(response2));
            this.toastr.success('Credenciales Correctas!', 'Logueado con Exito');
            this.saveUser();
            this.route.navigate(['web/student/form']);
          });
          this.validateLogin = false;
        },
        error => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('isLoggedin');
          this.toastr.error('Credenciales Incorrectas', '!Oops algp ha salido mal');
          this.validateLogin = true;
        });
    }
  }

  saveUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.user = this.user.usuario;
    if (this.user.role_id == 2) {
      this.person.rol = 4;
    }
    const array1 = this.user.name.split(' ');
    this.person.nombre1 = array1[1];
    this.person.apellido1 = array1[0];
    this.person.cedula = this.user.user_name;
    this.person.correo = this.user.email;
    this.service.getUserByEmail(this.person.correo).subscribe(response => {
      let objeto: any = {};
      objeto = response;
      if (objeto.ok) {
        localStorage.setItem('usuario', JSON.stringify(objeto.datos));
        this.getPeriodo();
        this.getUserProyect(objeto.datos.idUsuarios);
      } else {
        this.service.createUser(this.person).subscribe(res => {
          localStorage.setItem('usuario', JSON.stringify(objeto.datos));
        }, er => {
          console.log(er);
        });
      }
    }, err => {

    });
  }

  getPeriodo() {
    this.proyectService.getPeriodo().subscribe(res => {
      const periodo: any = res;
      localStorage.setItem('periodoActual', JSON.stringify(periodo.datos));
    });
  }

  getUserProyect(id) {
    this.proyectService.getUserProyects(id).subscribe(r => {
      const proyecto: any = r;
      localStorage.setItem('proyecto', JSON.stringify(proyecto.datos));
    });
  }

}
