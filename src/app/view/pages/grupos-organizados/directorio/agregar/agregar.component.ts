import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit {
  formularioGrupoOrganizado: FormGroup = this.fb.group({
    nombreOrganismo: [, [Validators.required, Validators.minLength(3)] ],
    logotipo: [],
    acta_constitutiva: [],
    municipio: [],
    tipoOrganismo: [],
    procesoElectoral: [],
    telefono_gosc: [],
    extension: [],
    paginaweb: [],
    observaciones: []
  });

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
   
  }

  campoEsValido( campo: string) {
    return this.formularioGrupoOrganizado.controls[campo].errors
            && this.formularioGrupoOrganizado.controls[campo].touched
  }

}
