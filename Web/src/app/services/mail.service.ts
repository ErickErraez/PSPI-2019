import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  url = environment.urlServer + 'mail/';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {

  }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.authService.getToken()
  });

  sendEmailMessage(email, asunto, mensaje) {
    return this.http.post(this.url + 'enviar', {
      params: {email: email, asunto: asunto, mensaje: mensaje}
    }, {
      headers: this.headers
    });
  }

}
