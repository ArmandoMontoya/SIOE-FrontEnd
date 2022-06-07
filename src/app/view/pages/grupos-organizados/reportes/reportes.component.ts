import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper, Txt, Table, Img, Columns, Line, Rect, Stack } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: []
})
export class ReportesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async generatePDF() {
    // Set the fonts to use
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();

    pdf.info({
      title: 'Prueba PDF',
      author: 'pdfmake-wrapper',
      subject: 'subject of document',
    });

    pdf.compress(true);

    pdf.pageSize('A4');
    pdf.pageOrientation('portrait'); // 'portrait', 'landscape'

    pdf.pageMargins([40, 80, 10, 30]); // Left, Top, Right, Bottom

    pdf.header(

      [

          new Columns([
            pdf.add(await new Img('assets/images/logo.png').fit([80, 100]).absolutePosition(20,10).alignment('left').build()),
            new Txt('Título de Reporte').bold().fontSize(26).margin([20,30,60,0]).alignment('right').end,
          ]).end, 
          new Txt('Dirección de Desarrollo Institucional de Servicio Profesional Electoral').fontSize(10).margin([0,5,10,0]).alignment('left').end,
        ]
        
        );
        // creates a line which starts in position 10 (x, y) and ends in position 50 (x, y), drawing a diagonal line
new Line(10, 50).end;

// point1 starts in x = 10 and y = 10
// point2 finishes in x = 50 and y = 10
// drawing an horizontal line
new Line([10, 10], [50, 10]).end;
        // pdf.add()

    //Content PDF

    // pdf.add(
    //   //new Line([10, 10], [50, 10]).end
    //   await new Img('assets/images/logo.png').fit([100,100]).build()
    // )





    pdf.add(
      new Table([
        ['Name', 'Address', 'Email', 'Phone'],
        ['Anastasia', 'Some direction 1', 'anastasia@domain.com', '123 4566 187'],
        ['Alexander', 'Some direction 2', 'alexander@domain.com', '123 4566 187'],
        ['Clementine', 'Some direction 3', 'clementine@domain.com', '123 4566 187'],
        ['Chelsey', 'Some direction 4', 'chelsey@domain.com', '123 4566 187'],
        ['Nicholas', 'Some direction 5', 'nicholas@domain.com', '123 4566 187'],
      ]).end
    );

    //Se llama al pipe de fecha
    const pipe = new DatePipe('en-US');
    //Se formatea la fecha con el pipe
    const fechaActual = pipe.transform(Date.now(), 'dd/MM/yyyy h:mm:ss a', 'medium');

    pdf.footer(
      
      function (currentPage, pageCount) {
        return new Columns([
          new Txt('Emisión: ' + fechaActual).margin([20,0]).bold().fontSize(8).alignment('left').end,
          new Txt('página ' + currentPage.toString() + ' de ' + pageCount).bold().fontSize(8).alignment('center').end,
          new Txt('Reporte v1.0').margin([0,0,20,0]).bold().fontSize(8).alignment('right').end,
        ]).end
      }
      );


    //pdf.watermark( new Txt('watermark with Txt object').color('blue').end );

    pdf.create().open();
  }

}
