import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GruposOrganizadosRoutingModule } from './grupos-organizados-routing.module';
import { ReportesComponent } from './reportes/reportes.component';

import { SharedModule } from '../../../theme/shared/shared.module';
import { ListarComponent } from './directorio/listar/listar.component';
import { AgregarComponent } from './directorio/agregar/agregar.component';
import {AgmCoreModule} from '@agm/core';
import { VigenciaComponent } from './directorio/vigencia/vigencia.component';
import { DetalleComponent } from './directorio/detalle/detalle.component';

@NgModule({
  declarations: [
    ListarComponent,
    AgregarComponent,
    VigenciaComponent,
    ReportesComponent,
    DetalleComponent,
  ],
  imports: [
    CommonModule,
    GruposOrganizadosRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBf3HUKa1rzjB9VYIBQEtuEoykgn4SS8gM'
    }),
    ReactiveFormsModule
  ]
})
export class GruposOrganizadosModule { }
