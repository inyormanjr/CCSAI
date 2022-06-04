import { environment } from 'src/environments/environment';
import {  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class BotSocketService {
  private socketURL = environment.socket_uri;
  private socket = io.io(this.socketURL);
  constructor() {
  }

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }

  receivedReply(): Observable<any> {
      const observable = new Observable<any>((observer) => {
        this.socket.on('reply', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
      return observable;
  }
}
