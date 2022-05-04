import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesComponent } from './reportes/reportes.component';
import { ListarComponent } from './directorio/listar/listar.component';
import { AgregarComponent } from './directorio/agregar/agregar.component';


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
    path: 'reportes',
    component: ReportesComponent
  },
  {
    path: '**',
    redirectTo: 'directorio'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposOrganizadosRoutingModule { }
