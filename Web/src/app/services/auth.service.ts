import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import {isNullOrUndefined} from 'util';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: any = environment.urlServer + 'users/';

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  loginUser(contrasena: string, email: string) {
    return this.http.post(this.url + 'login', {
      params: {
        email,
        contrasena,
      }
    }, {headers: this.headers});
  }

  registerUser(nombre: string, apellido: string, email: string, contrasena: string) {
    return this.http.post(this.url + 'register', {
      params: {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasena: contrasena,
        idRol: 1
      }
    }, {
      headers: this.headers
    });
  }

  setToken(token) {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  setUser(user): void {
    const person = JSON.stringify(user);
    localStorage.setItem('user', person);
  }

  getUser() {
    const person = localStorage.getItem('user');
    if (!isNullOrUndefined(person)) {
      const user = JSON.parse(person);
      return user;
    } else {
      return null;
    }
  }

}
