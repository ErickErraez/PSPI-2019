import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  url = environment.urlServer + 'user/';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
  constructor(private http: HttpClient) {
  }


  getDocentes() {
    return this.http.get(this.url + 'getDocentes', {headers: this.headers});
  }
  postForm(form) {
    return this.http.post(this.url + 'form', form);
  }

  getUserByEmail(email) {
    return this.http.get(this.url + 'getUserByEmail/' + email);
  }


  sendFilea(formData) {
    return this.http.post(this.url + 'uploadFile', JSON.stringify(formData));

  }

}
