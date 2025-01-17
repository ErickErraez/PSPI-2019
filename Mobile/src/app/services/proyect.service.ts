import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

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

    getUserPendingProyect(id) {
        return this.http.get(this.url + 'getUserPendingProyect/' + id);
    }

    getUsersProyects(id) {
        return this.http.get(this.url + 'getUsersProyects/' + id);
    }

    getProyects(nivel, paralelo) {
        return this.http.get(this.url + 'getProyectos/' + nivel + '/' + paralelo);
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

    actualizarProyecto(proyecto) {
        return this.http.put(this.url + 'actualizarProyecto', proyecto);
    }

    createWork(work) {
        return this.http.post(this.url + 'createWork', work);
    }

    getTutorUserProyects(id) {
        return this.http.get(this.url + 'getTutorUserProyects/' + id);
    }

    getUserProyectWorks(id, idProyecto) {
        return this.http.get(this.url + 'getUserProyectWorks/' + id + '/' + idProyecto);
    }

    getTeacherProyectWorks(id, idProyecto) {
        return this.http.get(this.url + 'getTeacherProyectWorks/' + id + '/' + idProyecto);
    }

    getNotas(id) {
        return this.http.get(this.url + 'getNotas/' + id);
    }

    getAdjuntosByNotas(id) {
        return this.http.get(this.url + 'getAdjuntosByNotas/' + id);
    }

    createAdjuntos(adjunto) {
        return this.http.post(this.url + 'createAdjuntos', adjunto);
    }

    actualizarNota(nota) {
        return this.http.put(this.url + 'actualizarNota', nota);
    }

    sendEmail(email) {
        return this.http.post(environment.urlServer + 'user/mail/enviar', email);
    }
}
