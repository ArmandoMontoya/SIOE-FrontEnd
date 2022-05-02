import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposOrganizadosRoutingModule } from './grupos-organizados-routing.module';
import { ReportesComponent } from './reportes/reportes.component';
import { DirectorioComponent } from './directorio/directorio.component';
import { SharedModule } from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [
    DirectorioComponent,
    ReportesComponent
  ],
  imports: [
    CommonModule,
    GruposOrganizadosRoutingModule,
    SharedModule
  ]
})
export class GruposOrganizadosModule { }
