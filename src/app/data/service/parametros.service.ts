import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ResponseContentType} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor() {}

  public getToken() {
    return new HttpHeaders({
      enctype: 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('autenticacion_token')
    });
  }

  public postToken() {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      Authorization: 'Bearer ' + localStorage.getItem('autenticacion_token')
    });
  }
  
  public FormDataToken() {
    return new HttpHeaders({
      enctype: 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('autenticacion_token')
    });
  }

  public FileToken() {
    return new HttpHeaders({
      responseType: 'blob',
      Authorization: 'Bearer ' + localStorage.getItem('autenticacion_token')
    });
  }

  public ContentTypeToken() {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      Authorization: 'Bearer ' + localStorage.getItem('autenticacion_token')
    });
  }

  public infoDatos(res: Response) {
    let body: any = res;
    return body.info || {};
  }
}
