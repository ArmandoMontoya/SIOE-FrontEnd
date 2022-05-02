export class frmProceso{
  "idProcesoElectoral": number = 0;
  "nombre": string = "";
  "institucion": string = "";
  "descripcion": string = "";
  "fechaInicio": string = "";
  "horaInicio": string = "";
  "fechaFin": string = "";
  "horaFin": string = "";
  "logoFile": File = null;
  "logoFileName": string = "";
  "logo": string = "";
  "estatus": string = "";
  "tipo": boolean = false;
}

export class frmEleccion{
  "idProcesoElectoral": number = 0;
  "idEleccion": number = 0;
  "nombre": string = "";
  "indicaciones": string = "";
  "descripcion": string = "";
  "orden": number = null;
  "noVotos": number = null;
  "noGanadores": number = null;
  "votoNulo": boolean = false;
}

export class frmCandidato{
  "idEleccion": number = 0;
  "idCandidatura": number = 0;
  "nombre": string = "";
  "orden": number = null;
  "esEquipo": boolean= false;
  "candidatoFile": File = null;
  "candidatoFileName": string = "";
  "Equipo": Array<frmEquipo> = new Array<frmEquipo>();
  "tipo": boolean = false;
  "imagen": string = "";
}

export class frmEquipo{
  "idEquipo": number = 0;
  "nombre": string = "";
  "puesto": string = "";
  "orden": number = null;
}