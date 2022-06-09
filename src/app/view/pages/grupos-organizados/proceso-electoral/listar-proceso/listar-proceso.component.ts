import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GruposOrganizadosService } from 'src/app/data/service/grupos-organizados.service';
import { procesoElectoralDTO } from 'src/app/model/GruposOrganizados/grupoOrganizado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-proceso',
  templateUrl: './listar-proceso.component.html',
  styleUrls: ['./listar-proceso.component.scss']
})
export class ListarProcesoComponent implements OnInit {
  rows: procesoElectoralDTO[] = [];
  tipoOrganismoDTO : procesoElectoralDTO;

  
  public columns = [

    { name: '#',  },
    { name: 'proceso',  },
    { name: 'estatus' },
  ];

  disabled = false;


  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });


  formNuevoProceso: FormGroup = this.fb.group({
    procesoElectoralId: 0,
    proceso: ['', [
      Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(30),
      // Validators.pattern(this.lettersNumbersSpacePattern)
    ]]
  });

  
  constructor(
    private _gruposService: GruposOrganizadosService,
    private fb:FormBuilder,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.page = 1;
    const initialpage = 0;
    this.itemsPerPage = 5;
   this.consultarProcesos(initialpage,this.itemsPerPage);
  }

  cambiarEstatus(procesoElectoralId: number, estatus: boolean){
    this.disabled = true;
    this._gruposService.CambiarEstatusProcesoElectoral(procesoElectoralId,estatus)
      .subscribe( result => {

        this.Toast.fire({
          icon: 'success',
          title: 'El estatus del proceso electoral ha sido actualizado',
          onClose: () => {
            this.rows = [];
            this.page = 1;
            this.itemsPerPage = 5;
            this.nextPage = 0;
            this.consultarProcesos(0,this.itemsPerPage);
            this.disabled = false;
          }
        })
        console.log(result)
        
      },

      error => {
        this.Toast.fire({
          icon: 'error',
          title: 'El estatus del proceso electoral no ha sido actualizado',
          onClose: () => {
            this.disabled = false;
          }
        })
        console.log(error)
      });
  }

  consultarProcesos(page:number, pageSize:number){
    this._gruposService.selectAllProcesoElectoralDTO(page, pageSize).subscribe( data => {
      data.forEach(item => {
        console.log(item);
        this.rows.push(item);
      });
        this.totalItems = this.rows.length;
    });
  }

  //paginador
  itemsPerPage: number;
    totalItems: any;
    page: any;
    previousPage: any;
    nextPage: any = 0;

  loadPage(page: number) {
    console.log(page);
    console.log(this.totalItems)
    debugger;
    if (page !== this.previousPage && page >= this.nextPage ) {
      this.previousPage = page - 1;
      this.nextPage = page + 1;
      this.consultarProcesos(this.page + 4, this.itemsPerPage);
    }
  }

  nextPageData() {
    // this._gruposService.selectAllProcesoElectoralDTO(this.page + 4, this.itemsPerPage).subscribe( data => {
      
  }

  guardar(){
    this.disabled = true;
    if(this.formNuevoProceso.valid){
      this.tipoOrganismoDTO = this.formNuevoProceso.value;
      this._gruposService.CreateNuevoProcesoElectoral(this.tipoOrganismoDTO).subscribe( resultado => {
        this.disabled = false;
        this.rows = [];
            this.page = 1;
            this.itemsPerPage = 5;
            this.nextPage = 0;
        this.consultarProcesos(0,5);
        console.log(resultado)
      });
    }
  }

}
