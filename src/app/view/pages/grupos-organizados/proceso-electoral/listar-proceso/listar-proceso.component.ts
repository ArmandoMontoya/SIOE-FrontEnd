import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  procesoElectoralDTO: procesoElectoralDTO;


  public columns = [
    { name: '#' },
    { name: 'proceso' },
    { name: 'estatus' },
    { name: 'Acciones' }
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
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.page = 1;
    const initialpage = 0;
    this.itemsPerPage = 5;
    this.consultarProcesos(initialpage, this.itemsPerPage);
  }

  cambiarEstatus(procesoElectoralId: number, estatus: boolean) {
    this.disabled = true;
    this._gruposService.CambiarEstatusProcesoElectoral(procesoElectoralId, estatus)
      .subscribe(result => {

        this.Toast.fire({
          icon: 'success',
          title: 'El estatus del proceso electoral ha sido actualizado',
          onClose: () => {
            this.rows = [];
            this.page = 1;
            this.itemsPerPage = 5;
            this.nextPage = 0;
            this.consultarProcesos(0, this.itemsPerPage);
            this.disabled = false;
          }
        })
        console.log(result)

      },

        error => {
          this.Toast.fire({
            icon: 'error',
            title: `${error.error}`,
            onClose: () => {
              this.rows = [];
            this.page = 1;
            this.itemsPerPage = 5;
            this.nextPage = 0;
            this.consultarProcesos(0, this.itemsPerPage);
            this.disabled = false;
            }
          })
          console.log(error)
        });
  }

  consultarProcesos(page: number, pageSize: number) {
    this._gruposService.selectAllProcesoElectoralDTO(page, pageSize).subscribe(data => {
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
    if (page !== this.previousPage && page >= this.nextPage) {
      this.previousPage = page - 1;
      this.nextPage = page + 1;
      this.consultarProcesos(this.page + 4, this.itemsPerPage);
    }
  }

  nextPageData() {
    // this._gruposService.selectAllProcesoElectoralDTO(this.page + 4, this.itemsPerPage).subscribe( data => {

  }

  // NgbModal, NgbModalRef
  @ViewChild("myModalInfo", { static: false }) modalInfo: TemplateRef<any>
  nombreModal = '';
  isUpdate = false;

  nuevoProceso(valor) {
    this.disabled = false;

    this.formNuevoProceso.patchValue({
      procesoElectoralId: 0,
      proceso: ""
    });

    if (valor == "nuevo") {
      this.isUpdate = false;
      this.nombreModal = 'Nuevo proceso electoral';
      this.modalService.open(this.modalInfo);
    }
    else {
      this.isUpdate = true;
      this.nombreModal = 'Editar proceso electoral';
      this.modalService.open(this.modalInfo);
      this.formNuevoProceso.patchValue({
        procesoElectoralId: valor.procesoElectoralId,
        proceso: valor.proceso
      });
    }
  }

  guardar() {
    this.disabled = true;
    if (this.formNuevoProceso.valid) {
      this.procesoElectoralDTO = this.formNuevoProceso.value;
      if (!this.isUpdate) {
        this._gruposService.CreateNuevoProcesoElectoral(this.procesoElectoralDTO).subscribe(resultado => {
          this.modalService.dismissAll();
          this.Toast.fire({
            icon: 'success',
            title: 'El nuevo proceso electoral ha sido creado',
            onClose: () => {
              this.disabled = false;
              this.rows = [];
              this.page = 1;
              this.itemsPerPage = 5;
              this.nextPage = 0;
              this.consultarProcesos(0, 5);
            }
          })
        },
          error => {
            this.Toast.fire({
              icon: 'error',
              title: `${error.error}`,
              onClose: () => {
                this.disabled = false;
              }
            })
            console.log(error)
          }
        );
      }
      else {


        this._gruposService.UpdateProcesoElectoral(this.procesoElectoralDTO)
          .subscribe(nuevo => {
            // this.limpiarDTO();
            // this.limpiarFormularios();
            this.modalService.dismissAll();

            this.Toast.fire({
              icon: 'success',
              title: 'El tipo de organismo ha sido actualizado',
              onClose: () => {
                this.disabled = false;
                this.rows = [];
                this.page = 1;
                this.itemsPerPage = 5;
                this.nextPage = 0;
                this.consultarProcesos(0, 5);
              }
            })
          },
            error => {
              this.Toast.fire({
                icon: 'error',
                title: `${error.error}`,
                onClose: () => {
                  this.disabled = false;
                }
              })
              console.log(error)
            });


      }
    }
  }

  eliminar(valor){
    Swal.fire({
      title: '¿Estás seguro en dar de eliminar este proceso electoral?',
      text: "¡Esto no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f5222d',
      cancelButtonColor: '#adb5bd',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      allowOutsideClick: false,
      onClose: () => {
        this.disabled = false;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.disabled = true;

        this._gruposService.DeleteProcesoElectoral(valor).subscribe( response => {
          this.modalService.dismissAll();

          this.Toast.fire({
            icon: 'success',
            title: 'El proceso electoral se ha eliminado',
            onClose: () => {
              this.disabled = false;
              this.rows = [];
                this.page = 1;
                this.itemsPerPage = 5;
                this.nextPage = 0;
                this.consultarProcesos(0, 5);
            }
          })
        },
        error => {
          this.Toast.fire({
            icon: 'error',
            title: `${error.error}`,
            // onClose: () => {
            //   this.bloquearBoton = false;
            // }
          })
          console.log(error)
        });

      }
      else if (result.isDismissed){
        this.disabled = false;
      }

    });

  }

}
