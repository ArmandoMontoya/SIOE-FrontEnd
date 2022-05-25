import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesComponent } from './reportes/reportes.component';
import { ListarComponent } from './directorio/listar/listar.component';
import { AgregarComponent } from './directorio/agregar/agregar.component';
import { VigenciaComponent } from './directorio/vigencia/vigencia.component';
import { DetalleComponent } from './directorio/detalle/detalle.component';


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
    path: '**',
    redirectTo: 'directorio'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposOrganizadosRoutingModule { }
