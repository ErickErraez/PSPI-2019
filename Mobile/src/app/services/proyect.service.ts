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
}
