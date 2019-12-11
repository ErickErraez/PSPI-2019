import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registro = false;
  nombre: any;
  apellido: any;
  email: any;
  validEmail: any = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  rPassword: any;
  password: any;
  tipoInput: any = 'password';

  constructor(private authServices: AuthService, private route: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  login() {
    this.authServices.loginUser(this.password, this.email).subscribe(r => {
      let res: any = {};
      res = r;
      this.authServices.setToken(res.session_id);
      this.authServices.setUser(res.response);
      localStorage.setItem('isLoggedin', 'true');
      this.toastr.success('Credenciales Correctas!', 'Logueado con Exito');
      this.route.navigate(['home']);
    }, error => {
      this.toastr.error('Credenciales Incorrectas!', 'Oops algo ha salido mal');
    });
  }

  register() {
    if (this.validEmail.test(this.email)) {
      if (this.rPassword === this.password) {
        this.authServices.registerUser(this.nombre, this.apellido, this.email
          , this.password).subscribe(r => {
          this.login();
        }, error => {
          let message: any = {};
          message = error;
          if (message.error.message === 'Correo ya existe') {
            this.toastr.error('El correo ya esta en uso!', 'Oops algo ha salido mal');
          } else {
            this.toastr.error('Revisa todos tus datos!', 'Oops algo ha salido mal');
          }
        });
      } else {
        this.toastr.error('Las contraseñas no coinciden!', 'Oops algo ha salido mal');
      }
    } else {
      this.toastr.error('Debes ingresar un email válido!', 'Oops algo ha salido mal');
    }
  }

  mostrarContrasena(item) {
    if (item == 'password') {
      this.tipoInput = 'text';
    }
    if (item == 'text') {
      this.tipoInput = 'password';
    }
  }

}
