import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GruposOrganizadosService } from 'src/app/data/service/grupos-organizados.service';
import { procesoElectoralSelect } from 'src/app/model/GruposOrganizados/procesoElectoral';

// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper, Txt, Table, Img, Columns, Line, Rect, Stack, Canvas, ITable, IText } from 'pdfmake-wrapper';
import { DatePipe } from '@angular/common';

//Import exceljs
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ExcelService } from 'src/app/data/service/pdf-excel/excel.service';
import { PdfService } from 'src/app/data/service/pdf-excel/pdf.service';
import { count } from 'console';

@Component({
  selector: 'app-tipos-gosc-estado',
  templateUrl: './tipos-gosc-estado.component.html',
  styleUrls: ['./tipos-gosc-estado.component.scss']
})
export class TiposGoscEstadoComponent implements OnInit {
  data: any[] = [];

  procesosElectorales: procesoElectoralSelect[] = [];

  buscarForm: FormGroup;
  procesoSeleccionado;

  constructor(
    private _gruposService: GruposOrganizadosService,
    private fb: FormBuilder,
    private _excelService: ExcelService,
    private _pdfService: PdfService
  ) { }

  ngOnInit(): void {

    this._gruposService.selectAllProcesoElectoral().subscribe(data => {
      this.procesosElectorales = data;
    });

    this.buscarForm = this.fb.group({
      selectProcesoElectoral: [null],
      selectJer: -1,
      selectMunicipio: -1,
      selectEstatus: 1
    });
  }

  buscar(opcion) {
    this.data = [];
    
    const procesoElectoralId = this.buscarForm.controls['selectProcesoElectoral'].value;
    const jerId = this.buscarForm.controls['selectJer'].value;
    const municipioId = this.buscarForm.controls['selectMunicipio'].value;
    const estatus = (this.buscarForm.controls['selectEstatus'].value == '-1') ? 0
      : (this.buscarForm.controls['selectEstatus'].value == null) ? 1
        : this.buscarForm.controls['selectEstatus'].value;

    let seleccion;
    this.procesosElectorales.map(function (element) {

      if (procesoElectoralId === element.procesoElectoralId) {

        seleccion = element.proceso
      }

    });

    this.procesoSeleccionado = seleccion;


    this._gruposService.Report_Tipos_GOSC_Estado(procesoElectoralId).subscribe(dataReponse => {

      this.data.push(['Municipio', 'Jer', 'Tipos','Total'])

      //Se asignan los datos resultantes
      let cont = 1;
      let numMun = 1;

      const agruparTipos = dataReponse.reduce((newArray, value) => {
        let result: any = [];
        let tipoOrganismo = value.tipo_organismo;
        debugger;
        
        if(value.tipo_organismo != ""){
          result = newArray[value.municipioId];
          if (!result) {
            tipoOrganismo += `${value.tipo_organismo}, `;
            result = value;
          }

          result.tipo_organismo = tipoOrganismo;
          newArray[value.municipioId] = result;
        }

        if(cont < dataReponse.length){
        // Agrega los municipios que vienen vacios y no se repiten
          if ( dataReponse[cont - 1]['municipioId'] == dataReponse[cont]['municipioId']) { numMun++; }
          if ( dataReponse[cont - 1]['municipioId'] != dataReponse[cont]['municipioId']) {
            if( numMun == 1 ){ newArray[value.municipioId] = value; }
            numMun = 1;
          }
        }else{
          if ( dataReponse[cont - 2]['municipioId'] != dataReponse[cont - 1]['municipioId']) {
            newArray[value.municipioId] = value;
          }
        }

        cont++;
        return newArray;
      }, []);
      
      agruparTipos.forEach((fila) => {
          this.data.push([fila.municipio, fila.nombreJer, fila.tipo_organismo ,fila.suma]);
      });

      //console.log(this.data)

      // let sumaTotalJer;
      // let cabecera;

      // cabecera = this.data.shift();

      // cabecera.forEach((jer, index) => {
      //   sumaTotalJer = this.data.reduce(function (sum, col) {
      //     return sum + col[index + 1];
      //   }, 0);

      //   if (!isNaN(sumaTotalJer))
      //     this.data.push(['TOTAL', '', sumaTotalJer]);
      // });

      // this.data.unshift(cabecera);

      const FileName = 'Tipos de GOSC en el estado, por municipio e integración de las JER -' + ` Proceso electoral ${this.procesoSeleccionado}`;
      const embedHTML = document.getElementById('showPdf');
      const AreaName = "Dirección de Organización Electoral";

      if (opcion == 'generatePDF')
        this._pdfService.generatePDF(this.data, embedHTML, FileName, AreaName);
      else
        this._excelService.exportAsExcelFile(this.data, FileName);
    });
  }
}
