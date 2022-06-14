import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GruposOrganizadosService } from 'src/app/data/service/grupos-organizados.service';
import { procesoElectoralSelect } from 'src/app/model/GruposOrganizados/procesoElectoral';

// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper, Txt, Table, Img, Columns, Line, Rect, Stack, Canvas, ITable, IText } from 'pdfmake-wrapper';
import { DatePipe } from '@angular/common';

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

  buscarForm:FormGroup;

  constructor(
    private _gruposService: GruposOrganizadosService,
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this._gruposService.selectAllProcesoElectoral().subscribe( data => {
      this.procesosElectorales = data;
    });

    this.buscarForm = this.fb.group({
      selectProcesoElectoral: [null],
      selectJer: -1,
      selectMunicipio: -1,
      selectEstatus: 1
    });
  }

  buscar(){
    console.log(this.buscarForm)
    const procesoElectoralId = this.buscarForm.controls['selectProcesoElectoral'].value;
    const jerId = this.buscarForm.controls['selectJer'].value;
    const municipioId = this.buscarForm.controls['selectMunicipio'].value;
    const estatus = (this.buscarForm.controls['selectEstatus'].value == '-1') ? 0 
                    : (this.buscarForm.controls['selectEstatus'].value == null) ? 1 
                    : this.buscarForm.controls['selectEstatus'].value ;

    this._gruposService.Report_TotalGOSC_Estado(procesoElectoralId, jerId, municipioId, parseInt(estatus)).subscribe( data => {

      
      console.log(this.data)

      //Se filtran los datos de la jer para hacer la cabecera de la tabla
      const HeadJer = data.reduce((acc,item)=>{
        if(!acc.includes(item.nombreJer)){
          acc.push(item.nombreJer);
        }
        return acc;
      },[]);
      //Se asignan los datos resultantes y
      console.log('Datos formateados para la tabla')
      HeadJer.forEach((jer, index) => {
        this.data[0][index + 1] = jer
      });

     
      console.log(this.data)

      data.forEach((fila, indexFilas) => {
        debugger;
        this.data.push([]);
        this.data[indexFilas + 1][0] = fila.municipio
        console.log(this.data)
        HeadJer.forEach((jer, index) => {
          if(fila.nombreJer == jer){
            this.data[indexFilas + 1][index + 1] = fila.totalMunicipio
            console.log(this.data)
            
          }else{
            this.data[indexFilas + 1][index + 1] = 0;
           
          }
          //this.data[0].push(jer)
        });
      });

      console.log('Datos formateados para la tabla')
      console.log(this.data)

      // data.forEach(item => {
      //   this.data.push(item);
      // });
      //   console.log(this.data)
  });
  }

  async generatePDF() {

    var element = document.getElementById('captura');

    
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

    //Orientación
    const orientation = 'landscape'; // 'portrait', 'landscape'
    pdf.pageOrientation(orientation);

    //Margenes de página
    pdf.pageMargins([20, 80, 20, 60]); // Left, Top, Right, Bottom

    /*Se asigna el valor de la variable lineWidth que servirá para colocar el punto final
    de la linea segun sea la orientación de la página*/

    const lineWidth = (orientation.toString() == 'portrait') ? 585 : 830;

    pdf.header(
      [
        new Columns([
          await new Img('assets/images/logoColor.png').fit([80, 100]).margin([15, 15, 0, 5]).build(),
          new Txt('Total de GOSC en el estado').bold().fontSize(16).margin([0, 15, 0, 0]).end,
        ]).end,
        new Txt('Dirección de Desarrollo Institucional de Servicio Profesional Electoral').fontSize(10).margin([15, 0]).alignment('left').end,
        new Canvas([new Line([10, 5], [lineWidth, 5]).lineWidth(.1).end]).width('*').end,
        // new Canvas([new Line([10, 3], [580, 3]).lineWidth(.1).end]).alignment('left').end
      ]
    );

    let img;
    //Contenido del PDF
      pdf.add(new Table([
        // By default, first position is considered a header
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
  
      pdf.add(this.buildTable(this.data));
  
      //Fin del contenido del PDF
  
      //Se llama al pipe de fecha
      const pipe = new DatePipe('en-US');
      //Se formatea la fecha con el pipe
      const fechaActual = pipe.transform(Date.now(), 'dd/MM/yyyy h:mm:ss a', 'medium');
  
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