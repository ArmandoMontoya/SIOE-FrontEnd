import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GruposOrganizadosRoutingModule } from './grupos-organizados-routing.module';
import { ReportesComponent } from './reportes/reportes.component';

import { SharedModule } from '../../../theme/shared/shared.module';
import { ListarComponent } from './directorio/listar/listar.component';
import { AgregarComponent } from './directorio/agregar/agregar.component';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    ListarComponent,
    AgregarComponent,
    ReportesComponent
  ],
  imports: [
    CommonModule,
    GruposOrganizadosRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    }),
    ReactiveFormsModule
  ]
})
export class GruposOrganizadosModule { }
