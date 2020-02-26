import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = environment.urlServer + 'user/';

  constructor(private http: HttpClient) {
  }

  getDocentes() {
    return this.http.get(this.url + 'getDocentes');
  }
  getConfiguracion() {
    return this.http.get(this.url + 'getConfiguraciones');
  }

  updateConfiguraciones(configuracion) {
    return this.http.put(this.url + 'updateConfiguraciones', configuracion);
  }
  getNotesAdmin(tipo) {
    return this.http.get(this.url + 'getNotesAdmin/' + tipo);
  }

  updateProyecto(proyecto) {
    return this.http.put(this.url + 'updateProyecto', proyecto);
  }

  createCategory(categoria) {
    return this.http.post(this.url + 'createCategory', categoria);
  }

  updateCategory(categoria) {
    return this.http.put(this.url + 'updateCategory', categoria);
  }

  deleteCategory(categoria) {
    return this.http.delete(this.url + 'deleteCategory', categoria);
  }
}
