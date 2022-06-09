import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesComponent } from './reportes/reportes.component';
import { ListarComponent } from './directorio/listar/listar.component';
import { AgregarComponent } from './directorio/agregar/agregar.component';
import { VigenciaComponent } from './directorio/vigencia/vigencia.component';
import { DetalleComponent } from './directorio/detalle/detalle.component';
import { ListarProcesoComponent } from './proceso-electoral/listar-proceso/listar-proceso.component';
import { AgregarProcesoComponent } from './proceso-electoral/agregar-proceso/agregar-proceso.component';
import { ImprimirDirectorioComponent } from './reportes/imprimir-directorio/imprimir-directorio.component';
import { ImprimirFichaCampoComponent } from './reportes/imprimir-ficha-campo/imprimir-ficha-campo.component';
import { TotalGoscEstadoComponent } from './reportes/total-gosc-estado/total-gosc-estado.component';
import { TiposGoscEstadoComponent } from './reportes/tipos-gosc-estado/tipos-gosc-estado.component';
import { SexoRepresentantesGoscComponent } from './reportes/sexo-representantes-gosc/sexo-representantes-gosc.component';
import { TotalGoscPropuestasComponent } from './reportes/total-gosc-propuestas/total-gosc-propuestas.component';
import { NombreGoscCorreoComponent } from './reportes/nombre-gosc-correo/nombre-gosc-correo.component';


const routes: Routes = [
  {
    path: 'directorio',
    component: ListarComponent
  },
  {
    path: 'agregar',
    component: AgregarComponent
  },
  {
    path: 'editar/:id',
    component: AgregarComponent
  },
  {
    path: 'vigencia/:id',
    component: VigenciaComponent
  },
  {
    path: 'duplicar/:id',
    component: AgregarComponent
  },
  {
    path:'detalle/:id',
    component: DetalleComponent
  },
  {
    path: 'reportes/imprimir-directorio',
    component: ImprimirDirectorioComponent
  },
  {
    path: 'reportes/imprimir-ficha-campo',
    component: ImprimirFichaCampoComponent
  },
  {
    path: 'reportes/total-gosc-estado',
    component: TotalGoscEstadoComponent
  },
  {
    path: 'reportes/tipos-gosc-estado',
    component: TiposGoscEstadoComponent
  },
  {
    path: 'reportes/sexo-de-representantes-gosc',
    component: SexoRepresentantesGoscComponent
  },
  {
    path: 'reportes/total-propuestas-gosc',
    component: TotalGoscPropuestasComponent
  },
  {
    path: 'reportes/nombre-correo-gosc',
    component: NombreGoscCorreoComponent
  },
  {
    path: 'proceso-electoral',
    component: ListarProcesoComponent
  },
  {
    path: 'agregar-proceso-electoral',
    component: AgregarProcesoComponent
  },
  {
    path: '**',
    redirectTo: 'directorio'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposOrganizadosRoutingModule { }
