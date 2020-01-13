import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserFormService {

    url = environment.urlServer;

    constructor(private http: HttpClient) {

    }

    getAllForm() {
        return this.http.get(this.url);
    }

    getForm() {
        return this.http.get(this.url);
    }

    createForm(form) {
        return this.http.post(this.url, form);
    }

}
