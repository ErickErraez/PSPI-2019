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

    getConfiguracion() {
        return this.http.get(this.url + 'getConfiguraciones');
    }

    updateConfiguraciones(configuracion) {
        return this.http.put(this.url + 'updateConfiguraciones', configuracion);
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

    updateDate(nota) {
        return this.http.put(this.url + 'updateDate', nota);
    }

    deleteCategory(categoria) {
        return this.http.delete(this.url + 'deleteCategory/' + categoria.idCategorias);
    }

    getNotesAdmin(tipo) {
        return this.http.get(this.url + 'getNotesAdmin/' + tipo);
    }

    getPeriodos() {
        return this.http.get(this.url + 'getPeriodos');
    }

    updatePeriodo(periodo) {
        return this.http.put(this.url + 'updatePeriodo', periodo);
    }

    createPeriodo(periodo) {
        return this.http.post(this.url + 'createPeriodo', periodo);
    }
}
