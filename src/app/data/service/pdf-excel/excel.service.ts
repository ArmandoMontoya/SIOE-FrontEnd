import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

//Import exceljs
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(data: any[], FileName: string) {
    //Crear un excel work book
    let workbook = new Workbook();
    //Nombre de la hoja
    let worksheet = workbook.addWorksheet(FileName);

    //Agregar Cabecera
    worksheet.addRow([FileName]);
    let header = data[0]
    worksheet.addRow(header).dimensions;
    data.forEach((filas, index) => {
      worksheet.addRow(data[index + 1])
    });

    //Se llama al pipe de fecha
    const pipe = new DatePipe('en-US');
    //Se formatea la fecha con el pipe
    const fechaActual = [pipe.transform(Date.now(), 'dd/MM/yyyy h:mm:ss a', 'medium')];

    //Nueva fila con información de emisión
    worksheet.addRow(['Emisión: '])
    worksheet.addRow(fechaActual);

    this.saveExcelFile(worksheet, workbook, FileName, fechaActual);
  }

  private saveExcelFile(worksheet: any, workbook: any, FileName: string, fechaActual: any) {
    //Agregar datos y nombre de archivo, se procede a descargar
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, FileName + ' ' + fechaActual + '.xlsx');
    });
  }
}
