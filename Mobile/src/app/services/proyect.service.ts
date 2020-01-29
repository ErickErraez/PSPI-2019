import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {userError} from '@angular/compiler-cli/src/transformers/util';

@Injectable({
    providedIn: 'root'
})
export class ProyectService {


    url = environment.urlServer + 'user/';

    constructor(private http: HttpClient) {

    }

    getCategories() {
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

    getProyects(nivel) {
        return this.http.get(this.url + 'getProyectos/' + nivel);
    }

    getProyectById(id) {
        return this.http.get(this.url + 'getProyectById/' + id);
    }

    getTutorProyects(id) {
        return this.http.get(this.url + 'getTutorProyects/' + id);
    }

    updateState(proyecto) {
        return this.http.put(this.url + 'updateState', proyecto);
    }

    getById(id) {
        return this.http.get(this.url + 'getById/' + id);
    }

}
