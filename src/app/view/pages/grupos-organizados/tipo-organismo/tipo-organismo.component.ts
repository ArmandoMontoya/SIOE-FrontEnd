import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GruposOrganizadosService } from 'src/app/data/service/grupos-organizados.service';
import { tipoOrganismoSelect } from 'src/app/model/GruposOrganizados/procesoElectoral';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-organismo',
  templateUrl: './tipo-organismo.component.html',
  styleUrls: ['./tipo-organismo.component.scss']
})
export class TipoOrganismoComponent implements OnInit {

  rows: any[] = null;
  
  public columns = [
    { name: '#',  },
    { name: 'Tipo de organismo',  },
    { name: 'acciones' },
  ];

  page = 1;
  pageSize = 10;

  bloquearBoton = false;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  formNuevoTipoOrganismo: FormGroup = this.fb.group({
    tipoOrganismoId: 0,
    tipo_organismo: ['', [
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
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this._gruposService.GetAllTipoOrganismo().subscribe(data => {
      this.rows = data;
    })
  }

  // NgbModal, NgbModalRef
  @ViewChild("myModalInfo", {static: false}) modalInfo: TemplateRef<any>

  

  tipoOrganismoDTO: tipoOrganismoSelect;

  tiposOrganismos: tipoOrganismoSelect[] = [];
  nombreModal = '';
  isUpdate = false;

  nuevoTipoOrganismo(valor){
    this.formNuevoTipoOrganismo.patchValue({
      tipoOrganismoId: 0,
      tipo_organismo: ""
    });
    
    if(valor == "nuevo"){
      this.isUpdate = false;
      this.nombreModal = 'Nuevo tipo de organismo';
       this.modalService.open(this.modalInfo);
     }
     else{
      this.isUpdate = true;
      this.nombreModal = 'Editar tipo de organismo';
      this.modalService.open(this.modalInfo);
      this.formNuevoTipoOrganismo.patchValue({
        tipoOrganismoId: valor.tipoOrganismoId,
        tipo_organismo: valor.tipo_organismo
      });
     }
  }

  guardarTipoOrganismo(){
    if (this.formNuevoTipoOrganismo.valid){
      if(!this.isUpdate){
      this.tipoOrganismoDTO = this.formNuevoTipoOrganismo.value;
      
      this._gruposService.CreateNuevoTipoOrganismo(this.tipoOrganismoDTO)
      .subscribe(nuevo => {
        // this.limpiarDTO();
        // this.limpiarFormularios();
        this.modalService.dismissAll();
        
        this.Toast.fire({
          icon: 'success',
          title: 'El nuevo tipo de organismo ha sido creado',
          onClose: () => {
            this.rows = [];
            this._gruposService.selectTipoOrganismo().subscribe(data => {
              this.rows = data;
            });
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
      else{
      this.tipoOrganismoDTO = this.formNuevoTipoOrganismo.value;
      
      this._gruposService.UpdateTipoOrganismo(this.tipoOrganismoDTO)
      .subscribe(nuevo => {
        // this.limpiarDTO();
        // this.limpiarFormularios();
        this.modalService.dismissAll();
        
        this.Toast.fire({
          icon: 'success',
          title: 'El tipo de organismo ha sido actualizado',
          onClose: () => {
            this.rows = [];
            this._gruposService.selectTipoOrganismo().subscribe(data => {
              this.rows = data;
            });
          }
        })
      },
      error => {
        this.Toast.fire({
          icon: 'error',
          title: 'El tipo de organismo no se ha actualizado',
          // onClose: () => {
          //   this.bloquearBoton = false;
          // }
        })
        console.log(error)
      });

    
      }
      
    }
    
  }

  eliminar(valor){
    Swal.fire({
      title: '¿Estás seguro en dar de eliminar este tipo de organismo?',
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
        this.bloquearBoton = false;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.bloquearBoton = true;

        this._gruposService.DeleteTipoOrganismo(valor).subscribe( response => {
          this.modalService.dismissAll();
            
          this.Toast.fire({
            icon: 'success',
            title: 'El tipo de organismo se ha eliminado',
            onClose: () => {
              this.rows = [];
              this._gruposService.selectTipoOrganismo().subscribe(data => {
                this.rows = data;
              });
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
        this.bloquearBoton = false;
      }

    });
   
  }

}
