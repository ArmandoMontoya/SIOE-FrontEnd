import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposOrganizadosRoutingModule } from './grupos-organizados-routing.module';
import { ReportesComponent } from './reportes/reportes.component';

import { SharedModule } from '../../../theme/shared/shared.module';
import { ListarComponent } from './directorio/listar/listar.component';
import { AgregarComponent } from './directorio/agregar/agregar.component';


@NgModule({
  declarations: [
    ListarComponent,
    AgregarComponent,
    ReportesComponent
  ],
  imports: [
    CommonModule,
    GruposOrganizadosRoutingModule,
    SharedModule
  ]
})
export class GruposOrganizadosModule { }
