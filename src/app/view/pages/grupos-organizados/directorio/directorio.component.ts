import { Component, OnInit } from '@angular/core';
import { GruposOrganizadosService } from '../../../../data/service/grupos-organizados.service';
import Swal from 'sweetalert2';
import { grupoOrganizado } from '../../../../model/grupoOrganizado';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styles: [
  ]
})
export class DirectorioComponent implements OnInit {
  public rows: grupoOrganizado[] = [];
  public columns = [

    { name: '#',  },
    { name: 'logo',  },
    { name: 'organismo' },
    { name: 'titular'},
    { name: 'teléfono' },
    { name: 'estatus' },
    { name: 'acciones' },
  ];

  page = 1;
  pageSize = 5;
  
  
  constructor(private _grupos: GruposOrganizadosService) { }

  ngOnInit() {
    this._grupos.getAll().subscribe( data => {
        this.rows = data;
        //this.collectionSize = this.rows.length;
        debugger;
    });
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
