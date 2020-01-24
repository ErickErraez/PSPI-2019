import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectoServiceService {
  url = environment.urlServer + 'user/';

  constructor(private http: HttpClient) {

  }

  getProyectosByNivel(nivel) {
    return this.http.get(this.url + 'getProyectos/' + nivel);
  }

  getCategorias() {
    return this.http.get(this.url + 'getCategories');
  }

  getPeriodo() {
    return this.http.get(this.url + 'getPeriodo');

  }
  createUserProyects(usuariosProyecto) {
    return this.http.post(this.url + 'createUserProyect', usuariosProyecto);
  }
  getUserProyects(id) {
    return this.http.get(this.url + 'getUserProyect/' + id);
  }
  getUsersProyects(id) {
    return this.http.get(this.url + 'getUsersProyects/' + id);
  }
}
