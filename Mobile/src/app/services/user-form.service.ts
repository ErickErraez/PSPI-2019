import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserFormService {

    url = environment.urlServer + 'user/';
    apiUrl = environment.API_URL + 'v2/estudiantes';
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
    });

    constructor(private http: HttpClient) {

    }

    getAllForm() {
        return this.http.get(this.url + 'all', {headers: this.headers});
    }

    getForm() {
        return this.http.get(this.url, {headers: this.headers});
    }

    createUser(user) {
        return this.http.post(this.url + 'createUser', user, {headers: this.headers});
    }

    createForm(proyecto) {
        return this.http.post(this.url + 'form', proyecto, {headers: this.headers});
    }

    getUserByEmail(email) {
        return this.http.get(this.url + 'getUserByEmail/' + email, {headers: this.headers});
    }

    getDocentes() {
        return this.http.get(this.url + 'getDocentes', {headers: this.headers});
    }

    getEstudiantes() {
        return this.http.get(this.apiUrl, {headers: this.headers});
    }

    insertAllUsers(data) {
        return this.http.post(this.url + 'insertAllUsers', data, {headers: this.headers});
    }

}
