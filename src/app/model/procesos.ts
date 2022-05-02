export class ProcesoElectoral{
  "idProcesoElectoral": number = 0;
  "nombre": string = "";
  "descripcion": string = "";
  "institucion": string = "";
  "logo": string ="";
  "estatus": string = "";
  "idEstatus": number = 0;
  "fechaHoraInicio": string ="";
  "fechaHoraFin": string ="";
  "uuid": string ="";
  "url": string ="";
  "urlResultados": string ="";
  "Elecciones": Array<Elecciones> = new Array<Elecciones>();
  "Votantes": any;
}

export class Elecciones {
  "idProcesoElectoral": number = 0;
  "idEleccion": number = 0;
  "nombre": string = "";
  "indicaciones": string = "";
  "descripcion": string = "";
  "noVotos": number = 0;
  "noGanadores": number = 0;
  "votoNulo": boolean = false;
  "orden": number = 0;
  "Candidaturas": Array<Candidatos> = new Array<Candidatos>();
}

export class Candidatos{
  "idEleccion": number = 0;
  "idCandidatura": number = 0;
  "nombre": string = "";
  "orden": number = 0;
  "esEquipo": boolean = false;
  "imagen": string = "";
  "Equipos": Array<Equipos> = new Array<Equipos>();
}

export class Equipos{
  "idCandidatura": number = 0;
  "idEquipo": number = 0;
  "nombre": string = "";
  "puesto": string = "";
  "orden": number = 0;
}

// export class Candidaturas