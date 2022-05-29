import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyjsService {

  constructor() { }

  confirm(title: string, message: string, okCallback: () => any) {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallback();
      }
    }).set({ title });
  }

  confirmWithCancel(title: string, message: string, okCallback: () => any,cancelCallback:()=>any) {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallback();
      }
    },(e: any) => {
      if (e) {
        cancelCallback();
      }
    }).set({ title });
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  success(message: string) {
    alertify.success(message);
  }

}
