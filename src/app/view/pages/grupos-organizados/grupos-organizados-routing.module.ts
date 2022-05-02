import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectorioComponent } from './directorio/directorio.component';
import { ReportesComponent } from './reportes/reportes.component';


const routes: Routes = [
  {
    path: 'directorio',
    component: DirectorioComponent
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
