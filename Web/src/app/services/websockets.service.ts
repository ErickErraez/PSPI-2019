import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  socket: any;
  uri: any = 'http://localhost:3001';

  constructor() {
    this.socket = io(this.uri);
  }

  listen(event) {
    return new Observable((subscriber => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    }));
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }
}
