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

  userName: string;
  password: string;
  tipoInput: any = 'password';
  validateLogin: boolean;

  constructor(private service: AuthService, private route: Router, private toastr: ToastrService,
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
        'client_id': clientId,
        'client_secret': clientSecret,
        'grant_type': grantType,
        'username': this.userName,
        'password': this.password
      }).subscribe(
        response => {
          localStorage.setItem('token', JSON.stringify(response['access_token']));
          localStorage.setItem('isLoggedin', 'true');
          this.service.get('usuarios/login?email=' + this.userName).subscribe(response2 => {
            localStorage.setItem('user', JSON.stringify(response2));
            this.toastr.success('Credenciales Correctas!', 'Logueado con Exito');
            this.route.navigate(['web']);
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
}
