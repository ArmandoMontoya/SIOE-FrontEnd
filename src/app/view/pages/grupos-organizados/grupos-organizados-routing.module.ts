import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesComponent } from './reportes/reportes.component';
import { ListarComponent } from './directorio/listar/listar.component';
import { AgregarComponent } from './directorio/agregar/agregar.component';
import { VigenciaComponent } from './directorio/vigencia/vigencia.component';
import { DetalleComponent } from './directorio/detalle/detalle.component';
import { ListarProcesoComponent } from './proceso-electoral/listar-proceso/listar-proceso.component';
import { AgregarProcesoComponent } from './proceso-electoral/agregar-proceso/agregar-proceso.component';


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
    path: 'reportes',
    component: ReportesComponent
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
