import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { FormBuilder, FormGroup } from '@angular/forms';
import { procesoElectoralSelect, municipiosSelect, jersSelect } from '../../../../../model/GruposOrganizados/procesoElectoral';
import { grupoOrganizadoListado } from '../../../../../model/GruposOrganizados/grupoOrganizado';
import { GruposOrganizadosService } from '../../../../../data/service/grupos-organizados.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styles: [
  ]
})
export class ListarComponent implements OnInit {
  rows: any[] = null;
  public columns = [

    { name: '#',  },
    { name: 'logo',  },
    { name: 'organismo' },
    { name: 'Jer'},
    { name: 'proceso'},
    { name: 'titular'},
    { name: 'teléfono' },
    { name: 'estatus' },
    { name: 'acciones' },
  ];

  configPagination: any;

  

  buscarForm:FormGroup;
  
  procesosElectorales: procesoElectoralSelect[] = [];

  municipios: municipiosSelect [] = [];
  jers: jersSelect [] = [];
 
  
  constructor(
    private _gruposService: GruposOrganizadosService,
    private fb:FormBuilder,
    private router: Router,
    ) {}

    itemsPerPage: number;
    totalItems: any;
    page: any;
    previousPage: any;
    nextPage: any = 0;


  ngOnInit() {
    this._gruposService.selectAllProcesoElectoral().subscribe( data => {
      this.procesosElectorales = data;
    });

    this._gruposService.selectJers().subscribe( data => {
      this.jers = data;
    });

    this._gruposService.selectMunicipios().subscribe( data => {
      this.municipios = data;
    });

    this.buscarForm = this.fb.group({
      selectProcesoElectoral: [null],
      selectJer: [null],
      selectMunicipio: [null],
      nombreOrganismo: [null],
      selectEstatus: [null]
    });
  }

  buscar(){
    console.log(this.buscarForm)
    const procesoElectoralId = this.buscarForm.controls['selectProcesoElectoral'].value;
    const jerId = this.buscarForm.controls['selectJer'].value;
    const municipioId = this.buscarForm.controls['selectMunicipio'].value;
    const nombreOrganismo = this.buscarForm.controls['nombreOrganismo'].value;
    const estatus = (this.buscarForm.controls['selectEstatus'].value == '-1') ? 0 
                    : (this.buscarForm.controls['selectEstatus'].value == null) ? 1 
                    : this.buscarForm.controls['selectEstatus'].value ;

                    
    const initialpage = 0;
    this.itemsPerPage = 5;

    this.page = 1;
    this.previousPage = 0;
    this.nextPage = 0;
    this.rows = null;
    this.totalItems = 0;

    


    
    this._gruposService.getAll(procesoElectoralId, jerId, municipioId, nombreOrganismo, parseInt(estatus), initialpage,this.itemsPerPage).subscribe( data => {
        this.rows = data;
        this.totalItems = data.length;
        debugger
  });
  }

  loadPage(page: number) {
    console.log(page);
    console.log(this.totalItems)
    if (page !== this.previousPage && page >= this.nextPage ) {
      this.previousPage = page - 1;
      this.nextPage = page + 1;
      this.nextPageData();
    }
  }

  nextPageData() {

    const procesoElectoralId = this.buscarForm.controls['selectProcesoElectoral'].value;
    const jerId = this.buscarForm.controls['selectJer'].value;
    const municipioId = this.buscarForm.controls['selectMunicipio'].value;
    const nombreOrganismo = this.buscarForm.controls['nombreOrganismo'].value;
    const estatus = (this.buscarForm.controls['selectEstatus'].value == '-1') ? 0 : this.buscarForm.controls['selectEstatus'].value ;
    debugger;

    this._gruposService.getAll(procesoElectoralId, jerId, municipioId, nombreOrganismo, parseInt(estatus), this.page + 4,this.itemsPerPage,
    ).subscribe(data => {
      console.log(data)
      
      //this.rows.push(data);
      console.log(this.rows);

      data.forEach(item => {
        console.log(item);
        this.rows.push(item);
      });
        this.totalItems = this.rows.length;
    },
      )
  }


  // ngOnInit() {
  //   this._administrador.obtenerProcesosElectorales().subscribe((r: any) => {
  //     if(r.estatus){
  //       this.rows = r.info;
  //       this.tempFilter = [...r.info];
  //       this.rowsFilter = r.info;
  //     }
  //     else{
  //       Swal.fire({
  //         title: 'Error',
  //         text: r.mensaje,
  //         type: 'error',
  //         confirmButtonColor: '#3085d6',
  //         confirmButtonText: 'Aceptar',
  //         allowOutsideClick: false,
  //         allowEscapeKey: false
  //       }).then(result => {
  //         return;
  //       });
  //       return;
  //     }
  //   });
  // }

  public centrarTexto() {
    return ' text-center';
  }

  vigencia(id: number){
    
    
    Swal.fire({
      title: '¿Estás seguro de revisar la vigencia de este grupo organizado?',
      text: "¡Esto no se puede revertir!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FFBA00',
      cancelButtonColor: '#adb5bd',
      confirmButtonText: 'Sí, revisar vigencia',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/grupos-organizados-de-la-sociedad-civil/vigencia', id]);
      }
    });
    
  }
  
}
