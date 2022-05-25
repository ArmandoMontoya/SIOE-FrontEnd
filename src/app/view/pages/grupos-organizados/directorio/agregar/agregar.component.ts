import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { WizardComponent } from 'angular-archwizard';
import { GruposOrganizadosService } from 'src/app/data/service/grupos-organizados.service';
import { grupoOrganizadoDTO } from 'src/app/model/GruposOrganizados/grupoOrganizado';
import { procesoElectoralSelect } from 'src/app/model/GruposOrganizados/procesoElectoral';
import { DireccionDTO, TitularDTO, CesionDatosPersonalesDTO } from '../../../../../model/GruposOrganizados/grupoOrganizado';
import { tipoOrganismoSelect, municipiosSelect } from '../../../../../model/GruposOrganizados/procesoElectoral';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit {
  grupoOrganizadoDTO: grupoOrganizadoDTO = null;
  titularDTO: TitularDTO = null;
  cesionDatosPersonalesDTO: CesionDatosPersonalesDTO = null;

  grupoOrganizadoId: number = null;

  fecha_cesion: NgbDateStruct;

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

  municipios: municipiosSelect[] = [];
  procesosElectorales: procesoElectoralSelect[] = [];
  tiposOrganismos: tipoOrganismoSelect[] = [];

  //EVALUAR EXPRESIONES REGULARES

  //Form Groups
  // formGrupoOrganizadoValidation: FormGroup;
  // formDireccionValidation: FormGroup;
  // formTitularValidation: FormGroup;
  // formCesionDatosPersonalesValidation: FormGroup;

  formGrupoOrganizadoValidation: FormGroup = this.fb.group({
    grupoOrganizadoId: (0),
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    acta_constitutiva: (''),
    telefono_gosc: ['', [Validators.required]],
    extension: (''),
    dias_de_atencion: this.fb.array(this.diasSemana.map(control => this.fb.control(false)), [Validators.required]),
    horario_atencion_inicial: ['', [Validators.required]],
    horario_atencion_termino: ['', [Validators.required]],
    logotipo: (''),
    pagina_web: (''),
    observacion: (''),
    propone_ciudadano: [false],
    grupoOrganizadoOriginalId: (null),
    municipioId: [null, [Validators.required]],
    tipoOrganismoId: [null, [Validators.required]],
    procesoElectoralId: [null, [Validators.required]],
  });

  formDireccionValidation: FormGroup = this.fb.group({
    direccionId: (0),
    calle: ['', [Validators.required]],
    colonia: ['', [Validators.required]],
    codigo_postal: ['', Validators.required],
    //grupoOrganizadoId: (''),
  });

  formTitularValidation: FormGroup = this.fb.group({
    titularId: (0),
    nombre: ['', [Validators.required]],
    email: (''),
    genero: ['', [Validators.required]],
    telefono_particular: (''),
    nombre_contacto: (''),
    cargo: ['', [Validators.required]],
    //grupoOrganizadoId: (''),
  });

  formCesionDatosPersonalesValidation: FormGroup = this.fb.group({
    cesionDatosPersonalesId: (0),
    check_nombre: [false],
    check_direccion: [false],
    check_telefonoParticular: [false],
    check_email: [false],
    check_cesion_datos: [false],
    medio: (''),
    fuente: (''),
    fecha_cesion: ['', [Validators.required]],
    //titularId: ('')
  });


  constructor(private fb: FormBuilder,
    private _gruposService: GruposOrganizadosService,
    private parserFormatter: NgbDateParserFormatter,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    debugger;

    this.activatedRoute.params.subscribe(params => {

      if (params["id"] == undefined) {
        return;
      }


      this.grupoOrganizadoId = params["id"];

      let ruta = (this.router.url).split("/")

      if (ruta[2] == "editar") {
        this.isUdating = true;
      }
      else {
        this.isUdating = false;
        this.isDuplicate = true;
      }



      this._gruposService.getGrupoOrganizadoById(this.grupoOrganizadoId)
        .subscribe(grupoOrganizado => this.loadFormGrupoOrganizado(grupoOrganizado),
          error => console.error(error));

      this._gruposService.getDireccionById(this.grupoOrganizadoId)
        .subscribe(direccion => this.loadFormDireccion(direccion),
          error => console.log(error));

      this._gruposService.getTitularById(this.grupoOrganizadoId)
        .subscribe(titular => this.loadFormTitular(titular),
          error => console.log(error));

    }
    );



    this._gruposService.selectMunicipios().subscribe(data => {
      this.municipios = data;
    });

    this._gruposService.selectTipoOrganismo().subscribe(data => {
      this.tiposOrganismos = data;
    });

    this._gruposService.selectActiveProcesoElectoral().subscribe(data => {
      this.procesosElectorales = data;
    });


  }


  loadFormGrupoOrganizado(grupoOrganizado: grupoOrganizadoDTO) {
    this.diasSelected = (grupoOrganizado.dias_de_atencion != null) ? grupoOrganizado.dias_de_atencion.split(',').map(Number) : null;

    if (this.diasSelected != null) {
      this.checkBoxDiasAtencionLoad();
    }

    //Horarios: Se convierten de string a Date, y se formatean HH:MM:SS para que sea leído por el control
    const horaInicial = new Date(grupoOrganizado.horario_atencion_inicial);
    const horaTermino = new Date(grupoOrganizado.horario_atencion_termino);

    const horario_atencion_inicial = horaInicial.toTimeString().slice(0, 8);
    const horario_atencion_termino = horaTermino.toTimeString().slice(0, 8);

    //Através del patchValue se asignan los valores del formulario, de esta forma se controla como será asignada la información
    this.formGrupoOrganizadoValidation.patchValue({
      grupoOrganizadoId: grupoOrganizado.grupoOrganizadoId,
      nombre: grupoOrganizado.nombre,
      acta_constitutiva: grupoOrganizado.acta_constitutiva,
      telefono_gosc: grupoOrganizado.telefono_gosc,
      extension: grupoOrganizado.extension,
      horario_atencion_inicial: horario_atencion_inicial,
      horario_atencion_termino: horario_atencion_termino,
      logotipo: grupoOrganizado.logotipo,
      pagina_web: grupoOrganizado.pagina_web,
      observacion: grupoOrganizado.observacion,
      propone_ciudadano: grupoOrganizado.propone_ciudadano,
      municipioId: grupoOrganizado.municipioId,
      tipoOrganismoId: grupoOrganizado.tipoOrganismoId,
      procesoElectoralId: grupoOrganizado.procesoElectoralId
    });
  }

  checkBoxDiasAtencionLoad() {
    const isArray: FormArray = this.formGrupoOrganizadoValidation.get('dias_de_atencion') as FormArray;

    this.diasSemana.map((perm, i) => {
      if (this.diasSelected.indexOf(perm.id) !== -1) {
        isArray.at(i).patchValue(true)
      }
    })
  }

  loadFormDireccion(direccion: DireccionDTO) {
    this.formDireccionValidation.patchValue({
      direccionId: direccion[0].direccionId,
      calle: direccion[0].calle,
      colonia: direccion[0].colonia,
      codigo_postal: direccion[0].codigo_postal
    });
  }


  loadFormTitular(titular: TitularDTO) {
    this.formTitularValidation.patchValue({
      titularId: titular[0].titularId,
      nombre: titular[0].nombre,
      email: titular[0].email,
      genero: titular[0].genero,
      telefono_particular: titular[0].telefono_particular,
      nombre_contacto: titular[0].nombre_contacto,
      cargo: titular[0].cargo
    });

    //Llamada al metodo de cesion de datos
    if (this.isUdating == true) {
      this._gruposService.getCesionDatosById(titular[0].titularId)
        .subscribe(cesionDatos => this.loadFormCesionDatos(cesionDatos),
          error => console.log(error));
    }
    else {
      this.formCesionDatosPersonalesValidation.patchValue({
        cesionDatosPersonalesId: (0),
        check_nombre: false,
        check_direccion: false,
        check_telefonoParticular: false,
        check_email: false,
        check_cesion_datos: false,
        medio: (''),
        fuente: (''),
        fecha_cesion: ['', [Validators.required]],
        //titularId: ('')
      });
      this.cesionDatosPersonalesDTO = null;
    }

  }

  loadFormCesionDatos(cesionDatos: CesionDatosPersonalesDTO) {
    //La fecha se convierte a Date, y se genera el json de fecha sesión, para que sea leído por el control
    const fecha = new Date(cesionDatos[0].fecha_cesion)

    const fecha_cesion = {
      year: fecha.getUTCFullYear(),
      month: fecha.getUTCMonth() + 1,
      day: fecha.getUTCDate()
    }

    this.formCesionDatosPersonalesValidation.patchValue({
      cesionDatosPersonalesId: cesionDatos[0].cesionDatosPersonalesId,
      check_nombre: cesionDatos[0].check_nombre,
      check_direccion: cesionDatos[0].check_direccion,
      check_telefonoParticular: cesionDatos[0].check_telefonoParticular,
      check_email: cesionDatos[0].check_email,
      check_cesion_datos: cesionDatos[0].check_cesion_datos,
      medio: cesionDatos[0].medio,
      fuente: cesionDatos[0].fuente,
      fecha_cesion: fecha_cesion
    });
  }




  //La banderilla se utiliza para saber si ya se accedió al grupo de checkboxes, 
  //si es verdadero, se evalua si se seleccionó algún check, de lo contrario muestra el error
  banderillaCheckBoxes: boolean = false;

  //Validar formularios
  validarFormGrupoOrganizado(campo: string) {
    return this.formGrupoOrganizadoValidation.controls[campo].errors
      && this.formGrupoOrganizadoValidation.controls[campo].touched
  }

  validarFormCheckBox(campo: string) {
    return this.formGrupoOrganizadoValidation.controls[campo].errors
      && this.banderillaCheckBoxes == true;
  }

  validarFormDireccion(campo: string) {
    return this.formDireccionValidation.controls[campo].errors
      && this.formDireccionValidation.controls[campo].touched
  }

  validarFormTitular(campo: string) {
    return this.formTitularValidation.controls[campo].errors
      && this.formTitularValidation.controls[campo].touched
  }

  validarFormCesionDatosPersonales(campo: string) {
    return this.formCesionDatosPersonalesValidation.controls[campo].errors
      && this.formCesionDatosPersonalesValidation.controls[campo].touched
  }

  //Se importa el wizard para poder utilizar sus métodos
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;

  pasoSiguiente() {
    //Se evalua si el formulario es valido, de lo contrario marcará todos los campos requeridos
    if (this.formGrupoOrganizadoValidation.invalid) {
      this.formGrupoOrganizadoValidation.markAllAsTouched();
      this.banderillaCheckBoxes = true;
      return;
    }
    //this.formGrupoOrganizadoValidation.reset();
    this.wizard.goToNextStep();
  }

  //Form validation function
  isGrupoOrganizadoInfoValid() {
    if (this.formGrupoOrganizadoValidation.valid) {
      return true;
    }
    return false;
  }

  isDireccionInfoValid() {
    if (this.formDireccionValidation.valid) {
      return true;
    }
    return false;
  }

  isTitularInfoValid() {
    if (this.formTitularValidation.valid) {
      return true;
    }
    return false;
  }

  isCesionDatosInforValid() {
    if (this.formCesionDatosPersonalesValidation.valid) {
      return true;
    }
    return false;
  }

  isAllInfoValid() {
    return this.isGrupoOrganizadoInfoValid() && this.isDireccionInfoValid() && this.isTitularInfoValid() && this.isCesionDatosInforValid();
  }

  // Cambiar la variable entre Crear y Actualizar y Duplicar
  isUdating = false;
  isDuplicate = false;


  guardar() {
    if (this.isAllInfoValid()) {
      //this.limpiarDTO();

      //Se asigna el valor del formGrupoOrganizadoValidation a grupoOrganizadoDTO
      this.grupoOrganizadoDTO = this.formGrupoOrganizadoValidation.value;

      //console.log(this.grupoOrganizadoDTO)
      //Se convierte el arreglo de días a string
      let diasSeleccionados = this.filtrarChecksSeleccionados();

      //La variable checks respaldo se utiliza para reestablecer los valores de los checks seleccionados antes de filtrar
      let checksRespaldo = this.grupoOrganizadoDTO.dias_de_atencion;

      this.grupoOrganizadoDTO.dias_de_atencion = diasSeleccionados;

      //Se formatean los horarios de atencion a string
      const horario_atencion_inicial = '2022-01-01T' + this.formGrupoOrganizadoValidation.controls['horario_atencion_inicial'].value;
      const horario_atencion_termino = '2022-01-01T' + this.formGrupoOrganizadoValidation.controls['horario_atencion_termino'].value;
      this.grupoOrganizadoDTO.horario_atencion_inicial = horario_atencion_inicial;
      this.grupoOrganizadoDTO.horario_atencion_termino = horario_atencion_termino;

      //Se crea la propoiedad direccionDTO dentro de grupoOrganizadoDTO
      this.grupoOrganizadoDTO["direccionDTO"] = this.formDireccionValidation.value;

      //Se asigna el valor del formTitularValidation a titularDTO
      this.titularDTO = this.formTitularValidation.value;

      //Se asigna el valor  del formCesionDatosPersonalesValidation a cesionDatosPersonalesDTO
      this.cesionDatosPersonalesDTO = this.formCesionDatosPersonalesValidation.value;

      //Se formatea el valor de la fecha de cesion a string
      const fecha_cesion = this.parserFormatter.format(this.formCesionDatosPersonalesValidation.controls['fecha_cesion'].value);
      //Se asigna el valor de la variable date a cesionDatosPersonalesDTO.fecha_cesion
      this.cesionDatosPersonalesDTO.fecha_cesion = fecha_cesion;

      //Se crea la propiedad cesionDatosPersonalesDTO dentro de titularDTO
      this.titularDTO["cesionDatosPersonalesDTO"] = this.cesionDatosPersonalesDTO;

      //Se crea la propiedad titularDTO dentro de grupoOrganizadoDTO
      this.grupoOrganizadoDTO["titularDTO"] = this.titularDTO;

      if (!this.isUdating) {

        if (this.isDuplicate == true) {
          //Al ser un duplicado se asigna el id original
          this.grupoOrganizadoDTO.grupoOrganizadoOriginalId = this.grupoOrganizadoId;

          this._gruposService.CreateGrupoOrganizado(this.grupoOrganizadoDTO)
            .subscribe(grupoOrganizadoDTO => {
              //Si el duplicado se creo, entonces hay que cambiar el estatus del registro anterior.


              this._gruposService.CambiarEstatus(this.grupoOrganizadoId, 2)
                .subscribe(estatus => {
                  this.grupoOrganizadoDTO.dias_de_atencion = checksRespaldo;
                  this.router.navigate(['grupos-organizados-de-la-sociedad-civil/directorio'])
                },
                  error => {
                    console.log(error)
                  });




            },
              error => {
                console.log(error)
              });
          this.grupoOrganizadoDTO.dias_de_atencion = checksRespaldo;

        }
        else { //Nuevo Grupo Organizado
          this._gruposService.CreateGrupoOrganizado(this.grupoOrganizadoDTO)
            .subscribe(grupoOrganizadoDTO => {
              // this.limpiarDTO();
              // this.limpiarFormularios();


              this.grupoOrganizadoDTO.dias_de_atencion = checksRespaldo;
              this.router.navigate(['grupos-organizados-de-la-sociedad-civil/directorio'])
            },
              error => {
                console.log(error)
              });
          this.grupoOrganizadoDTO.dias_de_atencion = checksRespaldo;
        }
      }
      else {
        this._gruposService.ActualizarGrupoOrganizado(this.grupoOrganizadoDTO)
          .subscribe(grupoOrganizado => {
            this.router.navigate(['grupos-organizados-de-la-sociedad-civil/directorio'])
          },
            error => console.log(error));
        this.grupoOrganizadoDTO.dias_de_atencion = checksRespaldo;

      }
    }
  }

  filtrarChecksSeleccionados() {
    const selectedDiasAtencion = this.formGrupoOrganizadoValidation.value.dias_de_atencion
      .map((checked, i) => checked ? this.diasSemana[i].id : null)
      .filter(value => value !== null);

    return selectedDiasAtencion.toString();
  }

  //Limpiar formularios
  limpiarDTO() {
    this.grupoOrganizadoDTO = null;
    this.titularDTO = null;
    this.cesionDatosPersonalesDTO = null;
  }

  limpiarFormularios() {
    this.formGrupoOrganizadoValidation.reset();
    this.formDireccionValidation.reset();
    this.formTitularValidation.reset();
    this.formCesionDatosPersonalesValidation.reset();
  }

}
