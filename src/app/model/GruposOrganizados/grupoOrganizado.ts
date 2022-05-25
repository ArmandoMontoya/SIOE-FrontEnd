import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class grupoOrganizadoListado {
    grupoOrganizadoId: number;
    logo: string;
    nombregrupo: string;
    nombreJer: string;
    nombreTitular: string;
    telefono: string;
    extension: string;
    estatus: number;
}

export class grupoOrganizadoDTO {
    grupoOrganizadoId: number;
    nombre: string;
    acta_constitutiva: string;
    telefono_gosc: string;
    extension: string;
    dias_de_atencion: string;
    horario_atencion_inicial: string;
    horario_atencion_termino: string;
    logotipo: string;
    pagina_web: string;
    observacion: string;
    propone_ciudadano: boolean;
    estatus: number;
    grupoOrganizadoOriginalId: number;
    municipioId: number;
    tipoOrganismoId: number;
    procesoElectoralId: number;
    direccion: DireccionDTO [] = null;
    titular: TitularDTO [] = null;
}

export class grupoOrganizadoIds {
    grupoOrganizadoId: number;
}

export class DireccionDTO {
    direccionId: number;
    calle: string;
    colonia: string;
    codigo_postal: string;
    grupoOrganizadoId: number;
}

export class TitularDTO {
    titularId: number;
    nombre: string;
    email: string;
    genero: string;
    telefono_particular: string;
    nombre_contacto: string;
    cargo: string;
    grupoOrganizadoId: number;
    cesionDatos: CesionDatosPersonalesDTO [] = null;
}
export class CesionDatosPersonalesDTO {
    cesionDatosPersonalesId: number;
    check_nombre: boolean;
    check_direccion: boolean;
    check_telefonoParticular: boolean;
    check_email: boolean;
    check_cesion_datos: boolean;
    medio: string;
    fuente: string;
    fecha_cesion: string;
    titularId: number;
}

export class verificacionVigenciaDTO {
    verificacionvigenciaId: number;
    check_llamada_gosc: boolean;
    check_llamada_particular: boolean;
    check_email: boolean;
    fecha_llamada_gosc: string;
    hora_llamada_gosc: string;
    fecha_llamada_particular: string;
    hora_llamada_particular: string;
    fecha_envio_email: string;
    hora_envio_email: string;
    fecha_respuesta_email: string;
    hora_respuesta_email: string;
    check_otro_medio: boolean;
    descripcion_otro_medio: string;
    fecha_otro_medio: string;
    descripcion_baja: string;
}

export class verDetalle {
    grupoOrganizadoId: number;
    nombre: string;
    acta_constitutiva: string;
    telefono_gosc: string;
    extension: string;
    dias_de_atencion: string;
    horario_atencion_inicial: string;
    horario_atencion_termino: string;
    logotipo: string;
    pagina_web: string;
    observacion: string;
    propone_ciudadano: boolean;
    estatus: number;
    municipio: string;
    tipo_organismo: string;
    proceso: string;
    calle: string;
    colonia: string;
    codigo_postal: string;
    nombreTitular: string;
    email: string;
    sexo: string;
    telefono_particular: string;
    nombre_contacto: string;
    cargo: string;
    check_nombre: boolean;
    check_direccion: boolean;
    check_telefonoParticular: boolean;
    check_email: boolean;
    check_cesion_datos: boolean;
    medio: string;
    fuente: string;
    fecha_cesion: string;
    descripcion_baja: string;
}