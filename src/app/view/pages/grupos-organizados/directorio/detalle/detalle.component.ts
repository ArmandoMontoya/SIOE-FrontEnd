import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { style } from '@angular/animations';
import { GruposOrganizadosService } from 'src/app/data/service/grupos-organizados.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { verDetalle } from '../../../../../model/GruposOrganizados/grupoOrganizado';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles:[
    
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalleComponent implements OnInit {

  grupoOrganizadoId: number;
  verDetalle: verDetalle = null;

  diasSemana = [
    { id: 1, dia: 'Lunes', value: 'Lunes' },
    { id: 2, dia: 'Martes', value: 'Martes' },
    { id: 3, dia: 'Miércoles', value: 'Miércoles' },
    { id: 4, dia: 'Jueves', value: 'Jueves' },
    { id: 5, dia: 'Viernes', value: 'Viernes' },
    { id: 6, dia: 'Sábado', value: 'Sábado' },
    { id: 7, dia: 'Domingo', value: 'Domingo' },
  ]

  diasSelected = null;

  constructor(
    private _gruposService: GruposOrganizadosService,
    private parserFormatter: NgbDateParserFormatter,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

      if (params["id"] == undefined) {
        return;
      }


      this.grupoOrganizadoId = params["id"];

      this._gruposService.verDetalle(this.grupoOrganizadoId)
        .subscribe(detalle => this.formatearDetalle(detalle),
          error => console.log(error));



      // this._gruposService.getGrupoOrganizadoById(this.grupoOrganizadoId)
      //   .subscribe(grupoOrganizado => this.loadInfoGrupoOrganizado(grupoOrganizado),
      //     error => console.error(error));

      // this._gruposService.getTitularById(this.grupoOrganizadoId)
      //   .subscribe(titular => this.loadInfoTitular(titular),
      //     error => console.log(error));
    }
    );
  }

  formatearDetalle(detalle: verDetalle){
    this.verDetalle = detalle;

    this.diasSelected = (detalle[0].dias_de_atencion != null) ? detalle[0].dias_de_atencion.split(',').map(Number) : null;
    let diasSeleccionados = '';

    if (this.diasSelected != null) {
      this.diasSelected.map(d => {
        this.diasSemana.map(ds => {
          if (ds.id === d) {
            diasSeleccionados += ds.dia + ', ';
          }
        })
      });
    }

    this.verDetalle[0].dias_de_atencion = diasSeleccionados;
    
    this.diasSelected = null;


  }

}
