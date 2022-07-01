import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import pdfFonts from "../../../../assets/fonts/Arial/custom-arial"; // fonts provided for pdfmake

// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper, Txt, Table, Img, Columns, Line, Rect, Stack, Canvas, ITable, IText, IImg } from 'pdfmake-wrapper';

//import logo from "../../../../assets/images/logoColor.png";

//Import html2canvas para capturas de HTML
import html2canvas from 'html2canvas';
import { url } from 'inspector';

//Orientación
const orientation = 'landscape'; // 'portrait', 'landscape'
/*Se asigna el valor de la variable lineWidth que servirá para colocar el punto final
    de la linea segun sea la orientación de la página*/
const lineWidth = (orientation.toString() == 'portrait') ? 585 : 830;

PdfMakeWrapper.setFonts(pdfFonts, {
  Arial: {
    normal: 'Arial.ttf',
    bold: 'Arial.ttf',
    italics: 'Arial.ttf',
    bolditalics: 'Arial.ttf'
  },
}
);

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  public async generatePDF(data: any, embedHTML: HTMLElement, FileName: string, AreaName: string) {
    PdfMakeWrapper.useFont('Arial');

    const pdf = new PdfMakeWrapper();

    this.configurationPDF(pdf, FileName);

    const logo = await new Img('../../../../assets/images/logoColor.png').fit([80, 100]).margin([15, 15, 0, 5]).build();

    this.Header(pdf, FileName, AreaName, logo);

    //Contenido del PDF

    //Se llama a la creación de la tabla en la sección del contenido del PDF
    pdf.add(this.buildTable(data));
    //Fin del contenido del PDF

    this.Footer(pdf);

    this.showPDF(pdf, embedHTML);
  }

  public async generatePDFWhitCaptureHTML(data: any, embedHTML: HTMLElement, FileName: string, AreaName: string, captureHTML: any) {
    PdfMakeWrapper.useFont('Arial');

    const pdf = new PdfMakeWrapper();

    this.configurationPDF(pdf, FileName);

    const logo = await new Img('../../../../assets/images/logoColor.png').fit([80, 100]).margin([15, 15, 0, 5]).build();

    this.Header(pdf, FileName, AreaName, logo);

    //Captura de HTML
    html2canvas(captureHTML, {
      scale: 2 // resolución de imagen
    }).then(async (canvas) => {
    //Contenido del PDF

    const capturaCanvas = canvas.toDataURL('image/png');
    pdf.add(await new Img(capturaCanvas).fit([100, 200]).build())

    //Se llama a la creación de la tabla en la sección del contenido del PDF
    pdf.add(this.buildTable(data));
    //Fin del contenido del PDF

    this.Footer(pdf);

    this.showPDF(pdf, embedHTML);
  });
  }

  private configurationPDF(pdf: PdfMakeWrapper, FileName: string) {
    //La fuente se definió en el app.module general
    PdfMakeWrapper.useFont('Arial');

    //Información básica
    pdf.info({
      title: FileName,
      author: 'pdfmake-wrapper',
      subject: FileName,
    });
    pdf.compress(true);

    //Tamaño
    pdf.pageSize('A4');

    pdf.pageOrientation(orientation);

    //Margenes de página
    pdf.pageMargins([20, 80, 20, 60]); // Left, Top, Right, Bottom
  }

  private Header(pdf: PdfMakeWrapper, FileName: string, AreaName: string, logo :IImg) {
    //Encabezado de PDF
    pdf.header(
      [
        new Columns([
          logo,
          new Txt(FileName).bold().fontSize(15).margin([0, 15, 15, 0]).end,
        ]).end,
        new Txt(AreaName).fontSize(10).margin([15, 0]).alignment('left').end,
        new Canvas([new Line([10, 5], [lineWidth, 5]).lineWidth(.1).end]).width('*').end,
      ]
    );
  }

  private Footer(pdf: PdfMakeWrapper) {
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
  }

  private showPDF(pdf: PdfMakeWrapper, embedHTML: any) {
    //Se hace el llamado para embeber el pdf dentro de una etiqueta
    var doc = pdf.create();
    var callback = function (url) { embedHTML.setAttribute('src', url); }
    doc.getDataUrl(callback, doc);
  }

    //La tabla se genera y tiene funciones que van creando el estilo general
    private buildTable(data: Array<string[]>): ITable {
      return new Table(this.toRows(data))
        .widths('*') //Expande las columnas en todo el ancho disponible
        .color('white')
        .fontSize(8)
        .headerRows(1)
        .alignment('justify')
        //.keepWithHeaderRows(1)
        //.dontBreakRows(false)
        .layout({
  
          fillColor: (rowIndex, node, columnIndex) => {
            if (rowIndex === 0) {
              //Color en cabecera de tabla
              return '#adb5bd';
            }
  
            //Color en filas
            return rowIndex! % 2 === 0 ? 'white' : 'white';
          },
          //Color de bordes de la tabla
          hLineColor: () => '#ced4da',
          vLineColor: () => 'white',
        }).end;
    }
    //Color de texto en filas, segun sea el color proporcionado
    private toRows(data: Array<string[]>): Array<IText[]> {
      return data.map((columns, index) => {
        const color = index % 2 === 0 ? 'black' : 'black';
        return this.styleRows(columns, color);
      });
    }
  
    private styleRows(columns: string[], color: string): IText[] {
      return columns.map((text) => new Txt(text).color(color).end);
    }
}
