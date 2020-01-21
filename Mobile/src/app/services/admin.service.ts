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
}
