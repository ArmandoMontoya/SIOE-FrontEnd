import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper, Txt, Table, Img, Columns, Line, Rect, Stack, Canvas, ITable, IText } from 'pdfmake-wrapper';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: []
})
export class ReportesComponent implements OnInit {

  data = [
    ['ID', 'Name', 'Description'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],
  ];

  constructor() { }

  ngOnInit() {
  }

  async generatePDF() {
    // Set the fonts to use

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
    //Horientación
    pdf.pageOrientation('portrait'); // 'portrait', 'landscape'

    //Margenes de página
    pdf.pageMargins([20, 70, 20, 60]); // Left, Top, Right, Bottom

    pdf.header(
      [
        new Columns([
          await new Img('assets/images/logoColor.png').fit([80, 100]).margin([15, 15, 0, 5]).build(),
          new Txt('Título de Reporte').bold().fontSize(26).margin([0, 15, 0, 0]).end,
        ]).end,
        new Txt('Dirección de Desarrollo Institucional de Servicio Profesional Electoral').fontSize(10).margin([15, 0]).alignment('left').end,
        new Canvas([new Line([10, 5], [580, 5]).lineWidth(.1).end]).alignment('left').end,
        // new Canvas([new Line([10, 3], [580, 3]).lineWidth(.1).end]).alignment('left').end
      ]
    );

    //Contenido del PDF
    pdf.add(new Table([
      // By default, first position is considered a header
      ['Incidencias del 1 al 6 de Junio de 2022']
    ]).widths('*') //Expande las columnas en todo el ancho disponible
    .heights((30))
      .color('white')
      .fontSize(16)
      .layout({

        fillColor: () => '#6c757d',
        //Color de bordes de la tabla
        hLineColor: () => 'white',
        vLineColor: () => 'white',
      }).margin([0,10]).end);

    pdf.add(this.buildTable(this.data));

    //Fin del contenido del PDF

    //Se llama al pipe de fecha
    const pipe = new DatePipe('en-US');
    //Se formatea la fecha con el pipe
    const fechaActual = pipe.transform(Date.now(), 'dd/MM/yyyy h:mm:ss a', 'medium');

    pdf.footer(
      function (currentPage, pageCount) {
        return new Stack([
          new Canvas([new Line([10, 0], [580, 0]).lineWidth(.1).end]).alignment('left').margin([0, 5]).end,
          new Columns([
            new Txt('Emisión: ' + fechaActual).margin([20, 0]).bold().fontSize(8).alignment('left').end,
            new Txt('página ' + currentPage.toString() + ' de ' + pageCount).bold().fontSize(8).alignment('center').end,
            new Txt('Reporte v1.0').margin([0, 0, 20, 0]).bold().fontSize(8).alignment('right').end,
          ]).end,
        ]).end
      }
    );


    //pdf.watermark( new Txt('Para aprobación').color('red').end );

    //Se hace el llamado para embeber el pdf dentro de una etiqueta
    var doc = pdf.create();
    var f = document.getElementById('foo');
    var callback = function (url) { f.setAttribute('src', url); }
    doc.getDataUrl(callback, doc);
  }

  buildTable(data: Array<string[]>): ITable {
    return new Table(this.toRows(data))
      .widths('*') //Expande las columnas en todo el ancho disponible
      .color('white')
      //.keepWithHeaderRows(1)
      //.dontBreakRows(false)
      .layout({

        fillColor: (rowIndex, node, columnIndex) => {
          if (rowIndex === 0) {
            //Color en cabecera de tabla
            return '#6c757d';
          }

          //Color en filas
          return rowIndex % 2 === 0 ? '#adb5bd' : 'white';
        },
        //Color de bordes de la tabla
        hLineColor: () => 'white',
        vLineColor: () => 'white',
      }).end;
  }

  //Color de texto en filas, segun sea el color proporcionado
  toRows(data: Array<string[]>): Array<IText[]> {
    return data.map((columns, index) => {
      const color = index % 2 === 0 ? 'white' : 'black';
      return this.styleRows(columns, color);
    });
  }

  styleRows(columns: string[], color: string): IText[] {
    debugger;
    return columns.map((text) => new Txt(text).color(color).end);
  }

}
