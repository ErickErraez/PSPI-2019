import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserFormService {

    url = environment.urlServer + 'user/';
    apiUrl = environment.API_URL + 'v2/estudiantes';

    constructor(private http: HttpClient) {

    }

    getAllForm() {
        return this.http.get(this.url + 'all');
    }

    getForm() {
        return this.http.get(this.url);
    }

    createUser(user) {
        return this.http.post(this.url + 'createUser', user);
    }

    createForm(proyecto) {
        return this.http.post(this.url + 'form', proyecto);
    }

    getUserByEmail(email) {
        return this.http.get(this.url + 'getUserByEmail/' + email);
    }

    getDocentes() {
        return this.http.get(this.url + 'getDocentes');
    }

    getEstudiantes() {
        return this.http.get(this.apiUrl);
    }

}
