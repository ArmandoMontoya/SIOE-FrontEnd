import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper, Txt, Table, Img, Columns, Line, Rect, Stack, Canvas, ITable, IText } from 'pdfmake-wrapper';

import html2canvas from 'html2canvas';
import { element } from 'protractor';
import { PdfService } from '../../../../data/service/pdf-excel/pdf.service';

class Area {
  country: string;

  area: number;
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: []
})
export class ReportesComponent  {

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
    ['1', 'Name 1', 'Some text'],
    ['2', 'Name 2', 'Some text'],
    ['3', 'Name 3', 'Some text'],
    ['4', 'Name 4', 'Some text'],
    ['5', 'Name 5', 'Some text'],
    ['6', 'Name 6', 'Some text'],

  ];

  constructor(
    private _pdfService:PdfService
  ) {
    this.areas = this.getAreas()
  }

  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e) {
    const arg = e.target;
    const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }

  areas: Area[] = [{
    country: 'Russia',
    area: 12,
  }, {
    country: 'Canada',
    area: 7,
  }, {
    country: 'USA',
    area: 7,
  }, {
    country: 'China',
    area: 7,
  }, {
    country: 'Brazil',
    area: 6,
  }, {
    country: 'Australia',
    area: 5,
  }, {
    country: 'India',
    area: 2,
  }, {
    country: 'Others',
    area: 55,
  }];

  getAreas(): Area[] {
    return this.areas;
  }

  imgData;
  async generatePDF() {

    
    const FileName = 'Reporte de prueba';
    const embedHTML = document.getElementById('showPdf');
    const AreaName = 'Area de prueba';
    const caputureHTML = document.getElementById('captura');


    this._pdfService.generatePDFWhitCaptureHTML(this.data, embedHTML, FileName,  AreaName, caputureHTML);
   
  }


}
