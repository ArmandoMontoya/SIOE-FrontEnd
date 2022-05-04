import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { FormBuilder, FormGroup } from '@angular/forms';
import { procesoElectoralSelect } from '../../../../../model/GruposOrganizados/procesoElectoral';
import { grupoOrganizadoListado } from '../../../../../model/GruposOrganizados/grupoOrganizado';
import { GruposOrganizadosService } from '../../../../../data/service/grupos-organizados.service';



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

  municipios = [
    { municipioId: 2, municipio: "Australia" },
    { municipioId: 1, municipio: "United States" },
    { municipioId: 3, municipio: "Canada" },
    { municipioId: 4, municipio: "Brazil" },
    { municipioId: 5, municipio: "England" }
  ];
 
  
  constructor(private _grupos: GruposOrganizadosService, private fb:FormBuilder) { }

  ngOnInit() {
    this._grupos.getAll().subscribe( data => {
        this.rows = data;
    });

    this._grupos.selectProcesoElectoral().subscribe( data => {
      this.procesosElectorales = data;
    })

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

  public detalle(id: number){
    // this._router.navigate(['/procesos-electorales/detalle/', id]);
  }

  public resultados(id: number){
    // this._router.navigate(['/procesos-electorales/resultados/', id]);
  }

  public color(color:string){
    switch (color) {
      case 'Pendiente': return 'text-success';
      case 'Finalizado': return 'text-danger';
      case 'En proceso': return 'text-warning';
    }
  }

}
