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
import { Console } from 'console';

@Component({
  selector: 'app-total-gosc-estado',
  templateUrl: './total-gosc-estado.component.html',
  styleUrls: ['./total-gosc-estado.component.scss']
})
export class TotalGoscEstadoComponent implements OnInit {

  data: any[] = [
    ['Municipio / Jer'],
  ];

  procesosElectorales: procesoElectoralSelect[] = [];

  buscarForm: FormGroup;

  constructor(
    private _gruposService: GruposOrganizadosService,
    private fb: FormBuilder,
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

  buscar() {
    const procesoElectoralId = this.buscarForm.controls['selectProcesoElectoral'].value;
    const jerId = this.buscarForm.controls['selectJer'].value;
    const municipioId = this.buscarForm.controls['selectMunicipio'].value;
    const estatus = (this.buscarForm.controls['selectEstatus'].value == '-1') ? 0
      : (this.buscarForm.controls['selectEstatus'].value == null) ? 1
        : this.buscarForm.controls['selectEstatus'].value;

    this._gruposService.Report_TotalGOSC_Estado(procesoElectoralId, jerId, municipioId, parseInt(estatus)).subscribe(data => {
      //Se filtran los datos de la jer para hacer la cabecera de la tabla
      const HeadJer = data.reduce((acc, item) => {
        if (!acc.includes(item.nombreJer)) {
          acc.push(item.nombreJer);
        }
        return acc;
      }, []);

      //Se asignan los datos resultantes
      HeadJer.forEach((jer, index) => {
        this.data[0][index + 1] = jer
      });

      data.forEach((fila, indexFilas) => {
        this.data.push([]);
        this.data[indexFilas + 1][0] = fila.municipio

        if (this.data[indexFilas][0] == this.data[indexFilas + 1][0]) {
          this.data[indexFilas + 1].pop();
          HeadJer.forEach((jer, index) => {
            if (fila.nombreJer == jer) {
              this.data[indexFilas][index + 1] = fila.totalMunicipio + 15;
            }
          });
        } else {
          HeadJer.forEach((jer, index) => {
            if (fila.nombreJer == jer) {
              this.data[indexFilas + 1][index + 1] = fila.totalMunicipio
            } else {
              this.data[indexFilas + 1][index + 1] = 0;
            }
          });
        }

      });
      let sumaTotalJer;
      let cabecera;
      let totalJer = ['TOTAL']
      this.data.forEach((fila, indexFilas) => {
        if (fila.length == 0) { this.data.splice(indexFilas, 1); }
        else {
          if(indexFilas == 0){cabecera = this.data.shift();}
        }

      });

      cabecera.forEach((jer, index) => {
            console.log(index)
            sumaTotalJer = this.data.reduce(function (sum, col) {
              return sum + col[index + 1];
            }, 0);

            if(!isNaN(sumaTotalJer))
            totalJer.push(sumaTotalJer);
          });

      this.data.unshift(cabecera);
      this.data.push(totalJer)

    });
    // ordenar data por IDjer
  }

  exportExcel() {
    //Crear un excel work book
    let workbook = new Workbook();
    //Nombre de la hoja
    let worksheet = workbook.addWorksheet("Gosc por conformación de las Jer");

    //Agregar Cabecera
    let header = this.data[0]
    worksheet.addRow(header).dimensions;
    this.data.forEach((filas, index) => {
      worksheet.addRow(this.data[index + 1])
    });

    
    //Nombre del descargable
    let fname = "Total GOSC estado"
    //Se llama al pipe de fecha
    const pipe = new DatePipe('en-US');
    //Se formatea la fecha con el pipe
    const fechaActual = [pipe.transform(Date.now(), 'dd/MM/yyyy h:mm:ss a', 'medium')];
    
    //Nueva fila con información de emisión
    worksheet.addRow(['Emisión: '])
    worksheet.addRow(fechaActual);
    
    //Agregar datos y nombre de archivo, se procede a descargar
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + fechaActual + '.xlsx');
    });
  }

  async generatePDF() {
    //Por si se quiere tomar una captura de una sección HTML
    var element = document.getElementById('captura');

    //La fuente se definió en el app.module general
    PdfMakeWrapper.useFont('Arial');

    const pdf = new PdfMakeWrapper();

    //Información básica
    pdf.info({
      title: 'Prueba PDF',
      author: 'pdfmake-wrapper',
      subject: 'subject of document',
    });
    pdf.compress(true);

    //Tamaño
    pdf.pageSize('A4');

    //Orientación
    const orientation = 'landscape'; // 'portrait', 'landscape'
    pdf.pageOrientation(orientation);

    //Margenes de página
    pdf.pageMargins([20, 80, 20, 60]); // Left, Top, Right, Bottom

    /*Se asigna el valor de la variable lineWidth que servirá para colocar el punto final
    de la linea segun sea la orientación de la página*/
    const lineWidth = (orientation.toString() == 'portrait') ? 585 : 830;

    //Encabezado de PDF
    pdf.header(
      [
        new Columns([
          await new Img('assets/images/logoColor.png').fit([80, 100]).margin([15, 15, 0, 5]).build(),
          new Txt('Total de GOSC en el estado').bold().fontSize(16).margin([0, 15, 0, 0]).end,
        ]).end,
        new Txt('Dirección de Desarrollo Institucional de Servicio Profesional Electoral').fontSize(10).margin([15, 0]).alignment('left').end,
        new Canvas([new Line([10, 5], [lineWidth, 5]).lineWidth(.1).end]).width('*').end,
      ]
    );

    let img;
    //Contenido del PDF
    pdf.add(new Table([
      //Por defecto, la primer posición del arreglo es considerada como la cabecera de la tabla
      ['Incidencias del 1 al 6 de Junio de 2022']
    ]).widths('*') //Expande las columnas en todo el ancho disponible
      .heights((10))
      .color('black')
      .fontSize(10)
      .layout({

        fillColor: () => '#adb5bd',
        //Color de bordes de la tabla
        hLineColor: () => 'white',
        vLineColor: () => 'white',
      }).margin([0, 10]).end);

    //Se llama a la creación de la tabla en la sección del contenido del PDF
    pdf.add(this.buildTable(this.data));
    //Fin del contenido del PDF

    //Se llama al pipe de fecha
    const pipe = new DatePipe('en-US');
    //Se formatea la fecha con el pipe
    const fechaActual = pipe.transform(Date.now(), 'dd/MM/yyyy h:mm:ss a', 'medium');

    //Footer PDF
    pdf.footer(
      function (currentPage, pageCount) {
        return new Stack([
          new Canvas([new Line([10, 0], [lineWidth, 0]).lineWidth(.1).end]).alignment('left').margin([0, 5]).end,
          new Columns([
            new Txt('Emisión: ' + fechaActual).margin([20, 0]).bold().fontSize(8).alignment('left').end,
            new Txt('página ' + currentPage.toString() + ' de ' + pageCount).bold().fontSize(8).alignment('center').end,
            new Txt('Reporte v1.0').margin([0, 0, 20, 0]).bold().fontSize(8).alignment('right').end,
          ]).end,
        ]).end
      }
    );

    //Se hace el llamado para embeber el pdf dentro de una etiqueta
    var doc = pdf.create();
    var f = document.getElementById('foo');
    var callback = function (url) { f.setAttribute('src', url); }
    doc.getDataUrl(callback, doc);
  }

  //La tabla se genera y tiene funciones que van creando el estilo general
  buildTable(data: Array<string[]>): ITable {
    return new Table(this.toRows(data))
      .widths('*') //Expande las columnas en todo el ancho disponible
      .color('white')
      .fontSize(4)
      .headerRows(1)
      .alignment('center')
      //.keepWithHeaderRows(1)
      //.dontBreakRows(false)
      .layout({

        fillColor: (rowIndex, node, columnIndex) => {
          if (rowIndex === 0) {
            //Color en cabecera de tabla
            return '#adb5bd';
          }

          //Color en filas
          return rowIndex % 2 === 0 ? 'white' : 'white';
        },
        //Color de bordes de la tabla
        hLineColor: () => '#ced4da',
        vLineColor: () => 'white',
      }).end;
  }
  //Color de texto en filas, segun sea el color proporcionado
  toRows(data: Array<string[]>): Array<IText[]> {
    return data.map((columns, index) => {
      const color = index % 2 === 0 ? 'black' : 'black';
      return this.styleRows(columns, color);
    });
  }

  styleRows(columns: string[], color: string): IText[] {
    return columns.map((text) => new Txt(text).color(color).end);
  }

}
