import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { procesoElectoralSelect } from '../../model/GruposOrganizados/procesoElectoral';
import { grupoOrganizadoListado } from 'src/app/model/GruposOrganizados/grupoOrganizado';




const _url = environment.api;

@Injectable({
  providedIn: 'root'
})
export class GruposOrganizadosService {

  constructor(private _http: HttpClient){}

  //Consulta
  public getAll(): Observable<grupoOrganizadoListado[]>{
    //let encabezado = this._valor.getToken();
    return this._http.get<grupoOrganizadoListado[]>(`${_url}GrupoOrganizado/GetAll`);
  }

  public selectProcesoElectoral(): Observable<procesoElectoralSelect[]>{
    return this._http.get<procesoElectoralSelect[]>(`${_url}ProcesoElectoral/GetAll`);
  }
  
}
