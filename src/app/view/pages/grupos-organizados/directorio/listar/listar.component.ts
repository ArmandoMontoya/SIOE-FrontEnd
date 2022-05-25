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
  public rows: grupoOrganizadoListado[] = [];
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

  page = 1;
  pageSize = 5;

  buscarForm:FormGroup;
  
  procesosElectorales: procesoElectoralSelect[] = [];

  municipios: municipiosSelect [] = [];
  jers: jersSelect [] = [];
 
  
  constructor(
    private _gruposService: GruposOrganizadosService,
    private fb:FormBuilder,
    private router: Router,
    ) { }

  ngOnInit() {
    this._gruposService.getAll().subscribe( data => {
        this.rows = data;
    });

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
      selectMunicipio: [null],
      selectOrganismo: [null],
      selectEstatus: [null]
    });
  }

  buscar(){

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
