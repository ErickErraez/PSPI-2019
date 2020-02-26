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
  getCategories() {
    return this.http.get(this.url + 'getCategories');
  }
  getTutorProyects(id) {
    return this.http.get(this.url + 'getTutorProyects/' + id);
  }
  getTutorUserProyects(id) {
    return this.http.get(this.url + 'getTutorUserProyects/' + id);
  }
  getUserPendingProyect(id) {
    return this.http.get(this.url + 'getUserPendingProyect/' + id);
  }
  actualizarProyecto(proyecto) {
    return this.http.put(this.url + 'actualizarProyecto', proyecto);
  }
  updateState(proyecto) {
    return this.http.put(this.url + 'updateState', proyecto);
  }
  getProyectsNivel(nivel, paralelo) {
    return this.http.get(this.url + 'getProyectos/' + nivel + '/' + paralelo);
  }

  createWork(work) {
    return this.http.post(this.url + 'createWork', work);
  }
  getUserProyectWorks(id) {
    return this.http.get(this.url + 'getUserProyectWorks/' + id);
  }

  getTeacherProyectWorks(id) {
    return this.http.get(this.url + 'getTeacherProyectWorks/' + id);
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

  getById(id) {
    return this.http.get(this.url + 'getById/' + id);
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
