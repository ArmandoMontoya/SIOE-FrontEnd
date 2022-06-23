import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { municipiosSelect, procesoElectoralSelect, jersSelect, tipoOrganismoSelect } from '../../model/GruposOrganizados/procesoElectoral';
import { grupoOrganizadoIds, grupoOrganizadoListado, procesoElectoralDTO, total_gosc_estado, verificacionVigenciaDTO } from 'src/app/model/GruposOrganizados/grupoOrganizado';
import { grupoOrganizadoDTO, DireccionDTO, TitularDTO, CesionDatosPersonalesDTO, verDetalle } from '../../model/GruposOrganizados/grupoOrganizado';




const _url = environment.api;

@Injectable({
  providedIn: 'root'
})
export class GruposOrganizadosService {

  constructor(private _http: HttpClient){}

  //Consulta
  public getAll(procesoElectoralId: number, jerId: number, municipioId: number, nombreOrganismo: string, estatus: number,page: number, pageSize: number): Observable<grupoOrganizadoListado[]>{
    //let encabezado = this._valor.getToken();
    let parametros = new HttpParams();

    if( municipioId ){ parametros = parametros.append( "municipioId", municipioId.toString() ); }
    if( nombreOrganismo ){ parametros = parametros.append( "nombreOrganismo", nombreOrganismo.toString() ); }
    if( estatus != null ){ parametros = parametros.append( "estatus", estatus.toString() ); }

    return this._http.get<grupoOrganizadoListado[]>(`${_url}/GrupoOrganizado/FiltrarListaGruposOrganizados/${procesoElectoralId}/${jerId}/${page}/${pageSize}`, {params: parametros});
  }

  //Consulta por id
  public getGrupoOrganizadoById(grupoOrganizadoId: number): Observable<grupoOrganizadoDTO>{
    //let encabezado = this._valor.getToken();
    return this._http.get<grupoOrganizadoDTO>(`${_url}/GrupoOrganizado/GetById/${grupoOrganizadoId}`);
  }

  public getDireccionById(grupoOrganizadoId: number): Observable<DireccionDTO>{
    //let encabezado = this._valor.getToken();
    return this._http.get<DireccionDTO>(`${_url}/GrupoOrganizado/GetDireccionById/${grupoOrganizadoId}`);
  }

  public getTitularById(grupoOrganizadoId: number): Observable<TitularDTO>{
    //let encabezado = this._valor.getToken();
    return this._http.get<TitularDTO>(`${_url}/GrupoOrganizado/GetTitularById/${grupoOrganizadoId}`);
  }

  public getCesionDatosById(titularId: number): Observable<CesionDatosPersonalesDTO>{
    //let encabezado = this._valor.getToken();
    return this._http.get<CesionDatosPersonalesDTO>(`${_url}/GrupoOrganizado/GetCesionDatosById/${titularId}`);
  }

  //Selects
  public selectAllProcesoElectoral(): Observable<procesoElectoralSelect[]>{
    return this._http.get<procesoElectoralSelect[]>(`${_url}/ProcesoElectoral/SelectGetAll`);
  }

  public selectAllProcesoElectoralDTO(page,pageSize): Observable<procesoElectoralDTO[]>{
    return this._http.get<procesoElectoralDTO[]>(`${_url}/ProcesoElectoral/GetAll/${page}/${pageSize}`);
  }

  public selectActiveProcesoElectoral(): Observable<procesoElectoralSelect[]>{
    return this._http.get<procesoElectoralSelect[]>(`${_url}/ProcesoElectoral/GetActive`);
  }

  public selectMunicipios(): Observable<municipiosSelect[]>{
    return this._http.get<municipiosSelect[]>(`${_url}/Municipio/GetAll`);
  }

  public selectGetMunicipiosJerId(jerId:number): Observable<municipiosSelect[]>{
    return this._http.get<municipiosSelect[]>(`${_url}/Municipio/GetMunicipiosJerId/${jerId}`);
  }

  public selectJers(): Observable<jersSelect[]>{
    return this._http.get<jersSelect[]>(`${_url}/Jer/GetAll`);
  }

  public selectTipoOrganismo(): Observable<tipoOrganismoSelect[]>{
    return this._http.get<tipoOrganismoSelect[]>(`${_url}/TipoOrganismo/GetAll`);
  }

  public GetAllTipoOrganismo(): Observable<tipoOrganismoSelect[]>{
    return this._http.get<tipoOrganismoSelect[]>(`${_url}/TipoOrganismo/GetAll`);
  }

  //Post
  public CreateGrupoOrganizado(item:grupoOrganizadoDTO): Observable<grupoOrganizadoDTO> {
    return this._http.post<grupoOrganizadoDTO>(`${_url}/GrupoOrganizado/Create`, item);
  }

  //Put
  public ActualizarGrupoOrganizado(item:grupoOrganizadoDTO): Observable<grupoOrganizadoDTO> {
    return this._http.put<grupoOrganizadoDTO>(`${_url}/GrupoOrganizado/Update`, item);
  }
  
  public ExisteVerificacionVigencia(grupoOrganizadoId: number): Observable<verificacionVigenciaDTO>{
  return this._http.get<verificacionVigenciaDTO>(`${_url}/GrupoOrganizado/GetVigenciaById/${grupoOrganizadoId}`);
  }

  public CreateVigencia(grupoOrganizadoId: number): Observable<any> {
    return this._http.put<any>(`${_url}/GrupoOrganizado/CreateVigencia/${grupoOrganizadoId}`, grupoOrganizadoId);
  }

  public CreateNuevoTipoOrganismo(TipoOrganismoDTO: tipoOrganismoSelect): Observable<tipoOrganismoSelect> {
    return this._http.post<tipoOrganismoSelect>(`${_url}/TipoOrganismo/Create`, TipoOrganismoDTO);
  }

  public UpdateTipoOrganismo(TipoOrganismoDTO: tipoOrganismoSelect): Observable<tipoOrganismoSelect> {
    return this._http.put<tipoOrganismoSelect>(`${_url}/TipoOrganismo/Update`, TipoOrganismoDTO);
  }

  public DeleteTipoOrganismo(TipoOrganismoDTO: tipoOrganismoSelect): Observable<tipoOrganismoSelect> {
    return this._http.delete<tipoOrganismoSelect>(`${_url}/TipoOrganismo/Delete/${TipoOrganismoDTO.tipoOrganismoId}` );
  }
  //Put
  public EsperarRespuesta(item:verificacionVigenciaDTO): Observable<verificacionVigenciaDTO> {
    return this._http.put<verificacionVigenciaDTO>(`${_url}/GrupoOrganizado/EsperarRespuesta`, item);
  }

  public Baja(item:verificacionVigenciaDTO): Observable<verificacionVigenciaDTO> {
    return this._http.put<verificacionVigenciaDTO>(`${_url}/GrupoOrganizado/Baja`, item);
  }

  public CambiarEstatus(grupoOrganizadoId: number, estatus: number): Observable<any> {
    return this._http.put<any>(`${_url}/GrupoOrganizado/CambiarEstatus/${grupoOrganizadoId}/${estatus}`, grupoOrganizadoId);
  }

  public verDetalle(grupoOrganizadoId: number): Observable<verDetalle>{
    //let encabezado = this._valor.getToken();
    return this._http.get<verDetalle>(`${_url}/GrupoOrganizado/DetalleGrupoOrganizado/${grupoOrganizadoId}`);
  }

  public CambiarEstatusProcesoElectoral(procesoElectoralId: number, estatus: boolean): Observable<any> {
    return this._http.put<any>(`${_url}/ProcesoElectoral/CambiarEstatus/${procesoElectoralId}/${estatus}`, procesoElectoralId);
  }

  public CreateNuevoProcesoElectoral(procesoElectoralDTO: procesoElectoralDTO): Observable<procesoElectoralDTO> {
    return this._http.post<procesoElectoralDTO>(`${_url}/ProcesoElectoral/Create`, procesoElectoralDTO);
  }

  public UpdateProcesoElectoral(procesoElectoralDTO: procesoElectoralDTO): Observable<procesoElectoralDTO> {
    return this._http.put<procesoElectoralDTO>(`${_url}/ProcesoElectoral/Update`, procesoElectoralDTO);
  }

  public DeleteProcesoElectoral(procesoElectoralDTO: procesoElectoralDTO): Observable<procesoElectoralDTO> {
    return this._http.delete<procesoElectoralDTO>(`${_url}/ProcesoElectoral/Delete/${procesoElectoralDTO.procesoElectoralId}` );
  }
  /*------------------------------REPORTES
  ------------------------------------------*/

  public Report_TotalGOSC_Estado(procesoElectoralId: number, jerId: number, municipioId: number, estatus: number): Observable<total_gosc_estado[]>{
    //let encabezado = this._valor.getToken();
    
    let parametros = new HttpParams();

    if( municipioId ){ parametros = parametros.append( "municipioId", municipioId.toString() ); }
    if( estatus != null ){ parametros = parametros.append( "estatus", estatus.toString() ); }

    return this._http.get<total_gosc_estado[]>(`${_url}/Reportes/Report_TotalGOSC_Estado/${procesoElectoralId}/${jerId}`, {params: parametros});
  }


}
