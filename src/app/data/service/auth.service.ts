import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

const url = environment.ruta;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private confirmacion: any = {
    estatus: false,
    mensaje: ''
  }

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return localStorage.getItem('autenticacion_token') != null && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return false;
  }

  iniciarSesion(info: any) {
    const encabezado = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8'
    })
    return this.http.post<any>(`${url}authenticateAdministrator`, info, { headers: encabezado })
      .pipe(map(resultado => {
        if (resultado && resultado.info) {
          localStorage.clear();
          // store resultado details and jwt token in local storage to keep resultado logged in between page refreshes
          localStorage.setItem('autenticacion_token', resultado.info.token);
          localStorage.setItem('nombre_usuario', resultado.info.nombre);
          localStorage.setItem('organo', resultado.info.idOrgano);
          this.confirmacion.estatus = true;
          this.confirmacion.mensaje = resultado.mensaje;
        } else {
          this.confirmacion.estatus = false;
          this.confirmacion.mensaje = resultado.mensaje;
        }
        return this.confirmacion;
      }));
  }

  logout() {
    // remove resultado from local storage to log resultado out
    localStorage.clear();
  }
}
