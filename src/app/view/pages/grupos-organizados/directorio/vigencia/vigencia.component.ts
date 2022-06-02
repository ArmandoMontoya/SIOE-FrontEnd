import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GruposOrganizadosService } from 'src/app/data/service/grupos-organizados.service';
import { grupoOrganizadoDTO, TitularDTO, verificacionVigenciaDTO } from 'src/app/model/GruposOrganizados/grupoOrganizado';
import Swal from 'sweetalert2';
import { grupoOrganizadoIds } from '../../../../../model/GruposOrganizados/grupoOrganizado';



@Component({
  selector: 'app-vigencia',
  templateUrl: './vigencia.component.html',
  styles: [
  ]
})
export class VigenciaComponent implements OnInit {
  

  grupoOrganizadoDTO: grupoOrganizadoDTO = null;
  titularDTO: TitularDTO = null;
  verificacionVigenciaDTO: verificacionVigenciaDTO = null;
  grupoOrganizadoIds: grupoOrganizadoIds = null;

  grupoOrganizadoId: number;

  existeVerificacionVigencia = false;

  diasSemana = [
    { id: 1, dia: 'Lunes', value: 'Lunes' },
    { id: 2, dia: 'Martes', value: 'Martes' },
    { id: 3, dia: 'Miércoles', value: 'Miércoles' },
    { id: 4, dia: 'Jueves', value: 'Jueves' },
    { id: 5, dia: 'Viernes', value: 'Viernes' },
    { id: 6, dia: 'Sábado', value: 'Sábado' },
    { id: 7, dia: 'Domingo', value: 'Domingo' },
  ]

  diasSelected = null;

  formVigenciaValidation: FormGroup = this.fb.group({
    verificacionvigenciaId: 0,
    check_llamada_gosc: (''),
    fecha_llamada_gosc: (''),
    hora_llamada_gosc: (''),
    check_llamada_particular: (''),
    fecha_llamada_particular: (''),
    hora_llamada_particular: (''),
    check_email: (''),
    fecha_envio_email: (''),
    hora_envio_email: (''),
    fecha_respuesta_email: (''),
    hora_respuesta_email: (''),
    check_otro_medio: (''),
    descripcion_otro_medio: (''),
    fecha_otro_medio: (''),
    descripcion_baja: (''),
  });

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

  public isCollapsed: boolean = true;

  


  constructor(private fb: FormBuilder,
    private _gruposService: GruposOrganizadosService,
    private parserFormatter: NgbDateParserFormatter,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

      if (params["id"] == undefined) {
        return;
      }


      this.grupoOrganizadoId = params["id"];

      this._gruposService.ExisteVerificacionVigencia(this.grupoOrganizadoId)
        .subscribe(verificacionVigencia => this.ExisteVerificacionVigencia(verificacionVigencia),
          error => console.log(error));



      this._gruposService.getGrupoOrganizadoById(this.grupoOrganizadoId)
        .subscribe(grupoOrganizado => this.loadInfoGrupoOrganizado(grupoOrganizado),
          error => console.error(error));

      this._gruposService.getTitularById(this.grupoOrganizadoId)
        .subscribe(titular => this.loadInfoTitular(titular),
          error => console.log(error));
    }
    );
  }

  ExisteVerificacionVigencia(verificacionVigencia: verificacionVigenciaDTO) {
    if (Object.keys(verificacionVigencia).length != 0) {
      //Horarios: Se convierten de string a Date, y se formatean HH:MM:SS para que sea leído por el control
      const hora_llamada_gosc = (verificacionVigencia[0].hora_llamada_gosc != null) ? new Date(verificacionVigencia[0].hora_llamada_gosc).toTimeString().slice(0, 8) : null;
      const hora_llamada_particular = (verificacionVigencia[0].hora_llamada_particular != null) ? new Date(verificacionVigencia[0].hora_llamada_particular).toTimeString().slice(0, 8) : null;
      const hora_envio_email = (verificacionVigencia[0].hora_envio_email != null) ? new Date(verificacionVigencia[0].hora_envio_email).toTimeString().slice(0, 8) : null;
      const hora_respuesta_email = (verificacionVigencia[0].hora_respuesta_email != null) ? new Date(verificacionVigencia[0].hora_respuesta_email).toTimeString().slice(0, 8) : null;

      //La fecha se convierte a Date, y se genera el json de fecha sesión, para que sea leído por el control
      const fecha_llamada_gosc = (verificacionVigencia[0].fecha_llamada_gosc != null) ? this.formatearFechas(new Date(verificacionVigencia[0].fecha_llamada_gosc)) : null;
      const fecha_llamada_particular = (verificacionVigencia[0].fecha_llamada_particular != null) ? this.formatearFechas(new Date(verificacionVigencia[0].fecha_llamada_particular)) : null;
      const fecha_envio_email = (verificacionVigencia[0].fecha_envio_email != null) ? this.formatearFechas(new Date(verificacionVigencia[0].fecha_envio_email)) : null;
      const fecha_respuesta_email = (verificacionVigencia[0].fecha_respuesta_email != null) ? this.formatearFechas(new Date(verificacionVigencia[0].fecha_respuesta_email)) : null;
      const fecha_otro_medio = (verificacionVigencia[0].fecha_otro_medio != null) ? this.formatearFechas(new Date(verificacionVigencia[0].fecha_otro_medio)) : null;

      //Através del patchValue se asignan los valores del formulario, de esta forma se controla como será asignada la información
      this.formVigenciaValidation.patchValue({
        verificacionvigenciaId: verificacionVigencia[0].verificacionvigenciaId,
        check_llamada_gosc: (verificacionVigencia[0].check_llamada_gosc != null) ? verificacionVigencia[0].check_llamada_gosc.toString() : "",
        fecha_llamada_gosc: fecha_llamada_gosc,
        hora_llamada_gosc: hora_llamada_gosc,
        check_llamada_particular: (verificacionVigencia[0].check_llamada_particular != null) ? verificacionVigencia[0].check_llamada_particular.toString() : "",
        fecha_llamada_particular: fecha_llamada_particular,
        hora_llamada_particular: hora_llamada_particular,
        check_email: (verificacionVigencia[0].check_email != null) ? verificacionVigencia[0].check_email.toString() : "",
        fecha_envio_email: fecha_envio_email,
        hora_envio_email: hora_envio_email,
        fecha_respuesta_email: fecha_respuesta_email,
        hora_respuesta_email: hora_respuesta_email,
        check_otro_medio: (verificacionVigencia[0].check_otro_medio != null) ? verificacionVigencia[0].check_otro_medio.toString() : "",
        descripcion_otro_medio: verificacionVigencia[0].descripcion_otro_medio,
        fecha_otro_medio: fecha_otro_medio,
      });

      //Se asignan las condiciones para que se muestren los botones seguún las variables
      if (this.formVigenciaValidation.controls['check_llamada_gosc'].value == "true") { this.isSi = true; }
      if (this.formVigenciaValidation.controls['check_llamada_particular'].value == "true") { this.isSi = true; }
      if (this.formVigenciaValidation.controls['check_email'].value == "true") { this.isSi = true; }
      if (this.formVigenciaValidation.controls['check_otro_medio'].value == "true") { this.isSi = true; }

      if (this.formVigenciaValidation.controls['check_llamada_gosc'].value == "false") { this.contador = 1; }
      if (this.formVigenciaValidation.controls['check_llamada_particular'].value == "false") { this.contador = 2; }
      if (this.formVigenciaValidation.controls['check_email'].value == "false") { this.contador = 3; }
      if (this.formVigenciaValidation.controls['check_otro_medio'].value == "false" && this.isSi == false) { this.contador = 4; }
      if (this.formVigenciaValidation.controls['check_otro_medio'].value == "false" && this.isSi == true) { this.contador = 3; }
    }
    else {


      this._gruposService.CreateVigencia(this.grupoOrganizadoId)
        .subscribe(grupoOrganizadoId => this.cambiarEnRevision(),
          error => console.log(error));
    }
  }

  formatearFechas(fecha) {
    const formatearFecha = {
      year: fecha.getUTCFullYear(),
      month: fecha.getUTCMonth() + 1,
      day: fecha.getUTCDate()
    }
    return formatearFecha;

  }

  cambiarEnRevision() {
    this.verificacionVigenciaDTO = null;
    this._gruposService.ExisteVerificacionVigencia(this.grupoOrganizadoId)
        .subscribe(verificacionVigencia => this.ExisteVerificacionVigencia(verificacionVigencia),
          error => console.log(error));
  }

  loadInfoGrupoOrganizado(grupoOrganizado: grupoOrganizadoDTO) {
    this.grupoOrganizadoDTO = grupoOrganizado;

    //this.grupoOrganizadoDTO.nombre = (this.grupoOrganizadoDTO.nombre != null) ? this.grupoOrganizadoDTO.nombre : ""

    this.diasSelected = (grupoOrganizado.dias_de_atencion != null) ? grupoOrganizado.dias_de_atencion.split(',').map(Number) : null;
    let diasSeleccionados = '';

    if (this.diasSelected != null) {
      this.diasSelected.map(d => {
        this.diasSemana.map(ds => {
          if (ds.id === d) {
            diasSeleccionados += ds.dia + ', ';
          }
        })
      });
    }



    this.grupoOrganizadoDTO.dias_de_atencion = diasSeleccionados;
    this.diasSelected = null;
  }

  loadInfoTitular(titular: TitularDTO) {
    this.titularDTO = titular[0];
  }

  contador = 0;
  isSi = false;

  decrementar(campo: string) {
    console.log(this.contador)
    
    if (this.formVigenciaValidation.controls[campo].value == "true") { 
      this.isSi = true;
      this.contador += 1;
    }
    else {
       this.isSi = false; 
       this.contador -= 1;
    }

   
    if(this.formVigenciaValidation.controls["check_llamada_gosc"].value == "false"
      && this.formVigenciaValidation.controls["check_llamada_particular"].value == "false"
      && this.formVigenciaValidation.controls["check_email"].value == "false"
      && this.formVigenciaValidation.controls["check_otro_medio"].value == "false")
    {
      this.contador = 4;
    }

    if(campo == "check_otro_medio" && (this.formVigenciaValidation.controls[campo].value == "false" || this.formVigenciaValidation.controls[campo].value == "true")){
      debugger;
      if(this.formVigenciaValidation.controls["descripcion_otro_medio"].value == null || this.formVigenciaValidation.controls["fecha_otro_medio"].value == null){
        return this.formVigenciaValidation.setErrors({ 'invalid': true });
      }
    }
  }

  disabledLlamarPersonal = true;
  disableddEmail = true;
  disabledOtroMedio = true;
  //Validaciones
  habilitarSeccion(campo: string) {
    // return this.formVigenciaValidation.controls[campo].value != "false"
    //      || this.formVigenciaValidation.controls[campo].value == ''
    if(campo == "check_llamada_gosc" && (this.formVigenciaValidation.controls[campo].value == "false" || this.formVigenciaValidation.controls[campo].value == "true")){
      debugger;
      if(this.formVigenciaValidation.controls["fecha_llamada_gosc"].value == null || this.formVigenciaValidation.controls["hora_llamada_gosc"].value == null){
        //this.disableLlamarPersonal = true;
        return this.formVigenciaValidation.setErrors({ 'invalid': true });
      }else if (this.formVigenciaValidation.controls[campo].value == "false"){
        this.disabledLlamarPersonal = false;
      }
      else if(this.formVigenciaValidation.controls[campo].value == "true"){
        this.disabledLlamarPersonal = true;
      }
    }
    if(campo == "check_llamada_particular" && (this.formVigenciaValidation.controls[campo].value == "false" || this.formVigenciaValidation.controls[campo].value == "true")){
      debugger;
      if(this.formVigenciaValidation.controls["fecha_llamada_particular"].value == null || this.formVigenciaValidation.controls["hora_llamada_particular"].value == null){
        return this.formVigenciaValidation.setErrors({ 'invalid': true });
      }
      else if (this.formVigenciaValidation.controls[campo].value == "false"){
        this.disableddEmail = false;
      }
      else if(this.formVigenciaValidation.controls[campo].value == "true"){
        this.disableddEmail = true;
      }
    }
    if(campo == "check_email" && (this.formVigenciaValidation.controls[campo].value == "false" || this.formVigenciaValidation.controls[campo].value == "true")){
      debugger;
      if(this.formVigenciaValidation.controls["fecha_envio_email"].value == null || this.formVigenciaValidation.controls["hora_envio_email"].value == null
        || this.formVigenciaValidation.controls["fecha_respuesta_email"].value == null  || this.formVigenciaValidation.controls["hora_respuesta_email"].value == null ){
        return this.formVigenciaValidation.setErrors({ 'invalid': true });
      }
      else if (this.formVigenciaValidation.controls[campo].value == "false"){
        this.disabledOtroMedio = false;
      }
      else if(this.formVigenciaValidation.controls[campo].value == "true"){
        this.disabledOtroMedio = true;
      }
    }
    
    // if(this.formVigenciaValidation.invalid){
    //   return this.formVigenciaValidation.controls[campo].value != "false"
    //     || this.formVigenciaValidation.controls[campo].value == ''
    // }
        

  }


  guardar(accion: string) {
    this.bloquearBoton = true;
    this.verificacionVigenciaDTO = this.formVigenciaValidation.value;

    //Checks
    const check_llamada_gosc = (this.formVigenciaValidation.controls['check_llamada_gosc'].value == "true") ? true 
                               : (this.formVigenciaValidation.controls['check_llamada_gosc'].value == "false" || "") ? false : null;
    this.verificacionVigenciaDTO.check_llamada_gosc = check_llamada_gosc;

    const check_llamada_particular = (this.formVigenciaValidation.controls['check_llamada_particular'].value == "true") ? true 
                                     : (this.formVigenciaValidation.controls['check_llamada_particular'].value == "false" || "") ? false : null;
    this.verificacionVigenciaDTO.check_llamada_particular = check_llamada_particular;

    const check_email = (this.formVigenciaValidation.controls['check_email'].value == "true") ? true 
                        : (this.formVigenciaValidation.controls['check_email'].value == "false" || "") ? false : null;
    this.verificacionVigenciaDTO.check_email = check_email;

    const check_otro_medio = (this.formVigenciaValidation.controls['check_otro_medio'].value == "true") ? true 
                             : (this.formVigenciaValidation.controls['check_otro_medio'].value == "false" || "") ? false : null;
    this.verificacionVigenciaDTO.check_otro_medio = check_otro_medio;

    //Se formatea el valor de la fecha a string
    const fecha_llamada_gosc = (this.formVigenciaValidation.controls['fecha_llamada_gosc'].value != null 
                                && this.formVigenciaValidation.controls['fecha_llamada_gosc'].value != "") 
                               ? this.parserFormatter.format(this.formVigenciaValidation.controls['fecha_llamada_gosc'].value)
                               : null;

    this.verificacionVigenciaDTO.fecha_llamada_gosc = fecha_llamada_gosc;

    const fecha_llamada_particular = (this.formVigenciaValidation.controls['fecha_llamada_particular'].value != null 
                                      && this.formVigenciaValidation.controls['fecha_llamada_particular'].value != "") 
                                     ? this.parserFormatter.format(this.formVigenciaValidation.controls['fecha_llamada_particular'].value)
                                     : null;
    this.verificacionVigenciaDTO.fecha_llamada_particular = fecha_llamada_particular;

    const fecha_envio_email = (this.formVigenciaValidation.controls['fecha_envio_email'].value != null
                               && this.formVigenciaValidation.controls['fecha_envio_email'].value != "") 
                              ? this.parserFormatter.format(this.formVigenciaValidation.controls['fecha_envio_email'].value)
                              : null;
                              
    this.verificacionVigenciaDTO.fecha_envio_email = fecha_envio_email;

    const fecha_respuesta_email = (this.formVigenciaValidation.controls['fecha_respuesta_email'].value != null
                                   && this.formVigenciaValidation.controls['fecha_respuesta_email'].value != "") 
                                  ? this.parserFormatter.format(this.formVigenciaValidation.controls['fecha_respuesta_email'].value)
                                  : null;

    this.verificacionVigenciaDTO.fecha_respuesta_email = fecha_respuesta_email;

    const fecha_otro_medio = (this.formVigenciaValidation.controls['fecha_otro_medio'].value != null
                              && this.formVigenciaValidation.controls['fecha_otro_medio'].value != "") 
                             ? this.parserFormatter.format(this.formVigenciaValidation.controls['fecha_otro_medio'].value)
                             : null;

    this.verificacionVigenciaDTO.fecha_otro_medio = fecha_otro_medio;

    //Se formatean las horas
    const hora_llamada_gosc = (this.formVigenciaValidation.controls['hora_llamada_gosc'].value != null
                               && this.formVigenciaValidation.controls['hora_llamada_gosc'].value != "") 
                              ? '2022-01-01T' + this.formVigenciaValidation.controls['hora_llamada_gosc'].value
                              : null;
    this.verificacionVigenciaDTO.hora_llamada_gosc = hora_llamada_gosc;

    const hora_llamada_particular = (this.formVigenciaValidation.controls['hora_llamada_particular'].value != null
                                     && this.formVigenciaValidation.controls['hora_llamada_particular'].value != "")
                                    ? '2022-01-01T' + this.formVigenciaValidation.controls['hora_llamada_particular'].value
                                    : null;

    this.verificacionVigenciaDTO.hora_llamada_particular = hora_llamada_particular;

    const hora_envio_email = (this.formVigenciaValidation.controls['hora_envio_email'].value != null
                              && this.formVigenciaValidation.controls['hora_envio_email'].value != "") 
                             ? '2022-01-01T' + this.formVigenciaValidation.controls['hora_envio_email'].value
                             : null;

    this.verificacionVigenciaDTO.hora_envio_email = hora_envio_email;

    const hora_respuesta_email = (this.formVigenciaValidation.controls['hora_respuesta_email'].value != null
                                  && this.formVigenciaValidation.controls['hora_respuesta_email'].value != "") 
                                 ? '2022-01-01T' + this.formVigenciaValidation.controls['hora_respuesta_email'].value
                                 : null;

    this.verificacionVigenciaDTO.hora_respuesta_email = hora_respuesta_email;

    this.verificacionVigenciaDTO.descripcion_baja = (this.formVigenciaValidation.controls['descripcion_baja'].value != null
                                                     && this.formVigenciaValidation.controls['descripcion_baja'].value != "")
                                                     ? this.formVigenciaValidation.controls['descripcion_baja'].value
                                                     : null;

    if (accion == "Baja") {

      Swal.fire({
        title: '¿Estás seguro en dar de baja este grupo organizado?',
        text: "¡Esto no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f5222d',
        cancelButtonColor: '#adb5bd',
        confirmButtonText: 'Sí, dar de baja',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        allowOutsideClick: false,
        onClose: () => {
          this.bloquearBoton = false;
        }
      }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
          this.bloquearBoton = true;

          this._gruposService.Baja(this.verificacionVigenciaDTO)
            .subscribe(verificacionVigencia => {

              this.Toast.fire({
                icon: 'success',
                title: 'El grupo organizado ha sido dado de baja',
                onClose: () => {
                  this.bloquearBoton = false;
                  this.router.navigate(['grupos-organizados-de-la-sociedad-civil/directorio'])
                }
              })
            },
              error => {
                this.Toast.fire({
                  icon: 'error',
                  title: 'El grupo organizado no ha sido dado de baja',
                  onClose: () => {
                    this.bloquearBoton = false;
                  }
                });
                console.log(error)
              });

        }
        else if (result.isDismissed){
          this.bloquearBoton = false;
        }

      });

    }
    else if (accion == "Duplicar") {

      Swal.fire({
        title: '¿Estás seguro en duplicar este grupo organizado?',
        text: "¡Esto no se puede revertir!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#FFBA00',
        cancelButtonColor: '#adb5bd',
        confirmButtonText: 'Sí, duplicar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.bloquearBoton = true;

          //Se guarda el formulario de vigencia, y en el componente de agregar al detectar que se creo el nuevo registro, se actualiza el estatus del registro anterior
          this._gruposService.EsperarRespuesta(this.verificacionVigenciaDTO)
            .subscribe(verificacionVigencia => { 
              console.log(verificacionVigencia) 
            },
              error => console.log(error));
          this.router.navigate(['grupos-organizados-de-la-sociedad-civil/duplicar', this.grupoOrganizadoId])
        }
        else if (result.isDismissed){
          this.bloquearBoton = false;
        }
      }
      );


    }
    else { //Esperar respuesta
      this._gruposService.EsperarRespuesta(this.verificacionVigenciaDTO)
        .subscribe(verificacionVigencia => {
          console.log(verificacionVigencia);
          this.Toast.fire({
            icon: 'success',
            title: 'El grupo organizado confinua en revisión',
            onClose: () => {
              this.bloquearBoton = false;
              this.router.navigate(['grupos-organizados-de-la-sociedad-civil/directorio'])
            }
          })
        },
          error => {
            this.bloquearBoton = false;
            console.log(error)
          });
    }
  }

  

}
