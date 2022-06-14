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
import { ListarProcesoComponent } from './proceso-electoral/listar-proceso/listar-proceso.component';
import { AgregarProcesoComponent } from './proceso-electoral/agregar-proceso/agregar-proceso.component';
import { ImprimirDirectorioComponent } from './reportes/imprimir-directorio/imprimir-directorio.component';
import { ImprimirFichaCampoComponent } from './reportes/imprimir-ficha-campo/imprimir-ficha-campo.component';
import { NombreGoscCorreoComponent } from './reportes/nombre-gosc-correo/nombre-gosc-correo.component';
import { SexoRepresentantesGoscComponent } from './reportes/sexo-representantes-gosc/sexo-representantes-gosc.component';
import { TiposGoscEstadoComponent } from './reportes/tipos-gosc-estado/tipos-gosc-estado.component';
import { TotalGoscEstadoComponent } from './reportes/total-gosc-estado/total-gosc-estado.component';
import { TotalGoscPropuestasComponent } from './reportes/total-gosc-propuestas/total-gosc-propuestas.component';

@NgModule({
  declarations: [
    ListarComponent,
    AgregarComponent,
    VigenciaComponent,
    ReportesComponent,
    DetalleComponent,
    ListarProcesoComponent,
    AgregarProcesoComponent,
    ImprimirDirectorioComponent,
    ImprimirFichaCampoComponent,
    NombreGoscCorreoComponent,
    SexoRepresentantesGoscComponent,
    TiposGoscEstadoComponent,
    TotalGoscEstadoComponent,
    TotalGoscPropuestasComponent,
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
