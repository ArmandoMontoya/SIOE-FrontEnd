import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { grupoOrganizado } from '../../model/grupoOrganizado';


const _url = environment.api;

@Injectable({
  providedIn: 'root'
})
export class GruposOrganizadosService {

  constructor(private _http: HttpClient){}

  //Consulta
  //Consulta
  public getAll(): Observable<grupoOrganizado[]>{
    //let encabezado = this._valor.getToken();
    return this._http.get<grupoOrganizado[]>(`${_url}GrupoOrganizado/GetAll`);
  }
  
}
