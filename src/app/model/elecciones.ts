export class ResultadoProceso {
    votantes: number = 0;
    votos: number = 0;
    porcentaje: number = 0;
    nombre: string = '';
    institucion: string = '';
    imagen: string = '';
    elecciones: ResultadoElecciones[] = null;
    estatus: boolean = false;
    imprimir: boolean = false;
    uuid: string = "";
}

export class ResultadoElecciones {
    nombre: string = '';
    candidaturas: ResultadoCandidaturas[] = null;
    maximos: Array<number> = [];
    ganadores: Array<number> = [];
    nulos: number = null;
}

export class ResultadoCandidaturas {
    nombre: string = '';
    imagen: string = '';
    votos: number = 0;
    porcentaje: number = 0;
}

export class EleccionesPreview {
    idEleccion: number;
    idCandidato: string;
    imagen: string;
    nombre: string;
}