import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  url = environment.urlServer + 'user/';

  constructor(private http: HttpClient) { }

  getAllForm() {
    return this.http.get(this.url);

  }
  getForm() {
    return this.http.get(this.url);
  }

  postForm(form) {
    return this.http.post(this.url + 'form', form);
  }
}
