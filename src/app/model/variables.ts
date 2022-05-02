export enum EstatusColorText {
  Primary = 'text-primary',
  Secondary = 'text-secondary',
  Success = 'text-success',
  Danger = 'text-danger',
  Warning = 'text-warning',
  Info = 'text-info',
  Light = 'text-light',
  Dark = 'text-dark',
  Body = 'text-body',
  Muted = 'text-muted',
  White = 'text-white',
  Black50 = 'text-black-50',
  White50 = 'text-white-50',

  Cancelado = 'text-danger',
  Admitido = 'text-success',
  Registro = 'text-info',
  Desechado = 'text-danger',
  Acta = 'text-success',
  FueraTiempo = 'text-danger',
}

export enum Roles {
  partidoLocal = 1,
  partido = 2,
  oficial = 3,
  administrador = 4,
}

export class SolicitudTipo {
  copiasCertificadas: Boolean = false;
}
