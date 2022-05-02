import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseContentType} from '@angular/http';
import { environment } from '../../../environments/environment';
import { ParametrosService } from './parametros.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResultadosComponent } from 'src/app/view/pages/procesos-electorales/resultados/resultados.component';

const _url = environment.ruta

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private _http: HttpClient, private _valor: ParametrosService) { }
  //Consulta
  public obtenerProcesosElectorales(){
    let encabezado = this._valor.getToken();
    return this._http.get(`${_url}Administrador/proceso`, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public obtenerDetalleProceso(idProceso: number) {
    let encabezado = this._valor.getToken();
    return this._http.get(`${_url}Administrador/proceso/${idProceso}`, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public obtenerProcesosElectoralesVotantes(){
    let encabezado = this._valor.getToken();
    return this._http.get(`${_url}Administrador/proceso/Votantes`, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public obtenerDetalleProcesoVotantes(idProceso: number) {
    let encabezado = this._valor.getToken();
    return this._http.get(`${_url}Administrador/proceso/${idProceso}/Votantes`, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public obtenerProcesosElectoralesResultados(){
    let encabezado = this._valor.getToken();
    return this._http.get(`${_url}Administrador/proceso/Resultados`, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public obtenerDetalleProcesoResultados(idProceso: number) {
    let encabezado = this._valor.getToken();
    return this._http.get(`${_url}Administrador/proceso/${idProceso}/Resultados`, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public downloadResultados(uuid: string) {
    let headers = this._valor.getToken();
    return this._http.get(`${_url}Administrador/proceso/${uuid}/resultados/download`, { headers, responseType: 'arraybuffer' }).subscribe(response => this.downLoadFile(response, "application/pdf"));
  }

  //Guardar
  public guardarProceso(info) {
    let encabezado = this._valor.FormDataToken();
    return this._http.post(`${_url}Administrador/proceso`, info, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public guardarEleccion(info, idProceso) {
    let encabezado = this._valor.postToken();
    return this._http.post(`${_url}Administrador/proceso/${idProceso}/Elecciones`, info, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public guardarCandidato(info, idProceso, idEleccion) {
    let encabezado = this._valor.FormDataToken();
    return this._http.post(`${_url}Administrador/proceso/${idProceso}/Elecciones/${idEleccion}/Candidaturas`, info, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public guardarVotantes(info, idProceso) {
    let encabezado = this._valor.postToken();
    return this._http.post(`${_url}Administrador/proceso/${idProceso}/Votantes/${info}`,null , { headers: encabezado }).pipe(map(this.infoDatos));
  }

  //Modificar
  public modificarProceso(info, idProceso) {
    let encabezado = this._valor.FormDataToken();
    return this._http.put(`${_url}Administrador/proceso/${idProceso}`, info, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public modificarEleccion(info, idEleccion) {
    let encabezado = this._valor.postToken();
    return this._http.put(`${_url}Administrador/proceso/Elecciones/${idEleccion}`, info, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public modificarCandidato(info, idProcesoElectoral, idEleccion, idCandidato) {
    let encabezado = this._valor.FormDataToken();
    return this._http.put(`${_url}Administrador/proceso/${idProcesoElectoral}/Elecciones/${idEleccion}/Candidaturas/${idCandidato}`, info, { headers: encabezado }).pipe(map(this.infoDatos));
  }

  //Eliminar
  public eliminarProceso(idProceso) {
    let encabezado = this._valor.getToken();
    return this._http.delete(`${_url}Administrador/proceso/${idProceso}`, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public eliminarEleccion(idEleccion) {
    let encabezado = this._valor.getToken();
    return this._http.delete(`${_url}Administrador/proceso/Elecciones/${idEleccion}`, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public eliminarCandidatura(idCandidato) {
    let encabezado = this._valor.getToken();
    return this._http.delete(`${_url}Administrador/proceso/Elecciones/Candidaturas/${idCandidato}`, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public eliminarEquipo(idEquipo) {
    let encabezado = this._valor.getToken();
    return this._http.delete(`${_url}Administrador/proceso/Elecciones/Candidaturas/Equipos/${idEquipo}`, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public eliminarVotantes(info, idProcesoElectoral) {
    let encabezado = this._valor.FormDataToken();
    return this._http.put(`${_url}Administrador/proceso/${idProcesoElectoral}/Votantes`,info, { headers: encabezado }).pipe(map(this.infoDatos));
  }

  //Preview
  public obtenerPreviewLogin(uuid: string){
    let encabezado = this._valor.getToken();
    return this._http.get(`${_url}Administrador/proceso/${uuid}/preview`, { headers: encabezado }).pipe(map(this.infoDatos));
  }
  public obtenerPreviewElecciones(idProcesoElectoral: number){
    let encabezado = this._valor.getToken();
    return this._http.get(`${_url}Administrador/proceso/${idProcesoElectoral}/preview/elecciones`, { headers: encabezado }).pipe(map(this.infoDatos));
  }


  private infoDatos(res: Response) {
    let body: any = res;
    return body || {};
  }

  private downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    // let url = window.URL.createObjectURL(blob);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', 'resultado');
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // let pwa = window.open(url);


    // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
    //     alert( 'Please disable your Pop-up blocker and try again.');
    // }
  }
}
