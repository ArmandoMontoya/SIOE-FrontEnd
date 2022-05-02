import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // add authorization header with jwt token if available
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }


  // TODO: verificar la expirancion del token
  public getTokenExpirationDate(token?: string): Date {

    if (token == null) {
      token = localStorage.getItem('autenticacion_token');
    }

    let decoded: any;
    // TODO verificar esta parte
    // decoded = this.decodeToken(token);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(token?: string, offsetSeconds?: number): boolean {
    if (token == null) {
      token = localStorage.getItem('autenticacion_token');
    }

    let date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date == null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}
