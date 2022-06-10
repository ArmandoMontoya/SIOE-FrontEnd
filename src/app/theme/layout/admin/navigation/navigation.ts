import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'inicio',
        title: 'Inicio',
        type: 'item',
        url: '/inicio',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'gosc',
        title: 'Grupos organizados de la sociedad civil',
        type: 'collapse',
        icon: 'feather icon-users',
        //permiso: [ rol.administrador ],
        children: [
          {
            id: 'reportes',
            title: 'Reportes',
            // type: 'item',
            //url: '/grupos-organizados-de-la-sociedad-civil/reportes',
            type: 'collapse',
            //icon: 'feather icon-pie-chart',
            children: [
              {
                id: 'reportes',
                title: 'Generar PDF',
                type: 'item',
                url: '/grupos-organizados-de-la-sociedad-civil/reportes',
              },
              {
                id: 'imprimir-directorio',
                title: 'Impresión del directorio GOSC',
                type: 'item',
                url: '/grupos-organizados-de-la-sociedad-civil/reportes',
              },
              {
                id: 'imprimir-ficha',
                title: 'Impresión de formato ficha de campo',
                type: 'item',
                url: '/grupos-organizados-de-la-sociedad-civil/reportes',
              },
              {
                id: 'total-gosc',
                title: 'Total de GOSC en el estado, por municipio e integración de JER',
                type: 'item',
                url: '/grupos-organizados-de-la-sociedad-civil/reportes',
              },
              {
                id: 'tipos-gosc',
                title: 'Tipos de GOSC en el estado, por municipio e integración de JER',
                type: 'item',
                url: '/grupos-organizados-de-la-sociedad-civil/reportes',
              },
              {
                id: 'sexo-gosc',
                title: 'Por sexo de los representantes de los GOSC',
                type: 'item',
                url: '/grupos-organizados-de-la-sociedad-civil/reportes',
              },
              {
                id: 'total-propuestas',
                title: 'Total de los GOSC con las propuestas realizadas en el estado, por municipio e integración de JER',
                type: 'item',
                url: '/grupos-organizados-de-la-sociedad-civil/reportes',
              },
              {
                id: 'datos-gosc',
                title: 'Datos de nombre del GOSC y su correo electrónico',
                type: 'item',
                url: '/grupos-organizados-de-la-sociedad-civil/reportes',
              },

            ],
          },
          {
            id: 'proceso',
            title: 'Proceso electoral',
            type: 'item',
            url: '/grupos-organizados-de-la-sociedad-civil/proceso-electoral',
          },
          {
            id: 'directorio',
            title: 'Directorio',
            type: 'item',
            url: '/grupos-organizados-de-la-sociedad-civil/directorio',
          },
        ]
      },
      // {
      //   id: 'inmuebles',
      //   title: 'Gestión de inmuebles',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   permiso: [ rol.administrador ],
      //   children: [
      //     {
      //       id: 'nuevo',
      //       title: 'Reportes',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //     {
      //       id: 'nuevo2',
      //       title: 'Administrar GOSC',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //   ]
      // },
      // {
      //   id: 'consejos',
      //   title: 'Integración de consejos electorales',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   permiso: [ rol.administrador ],
      //   children: [
      //     {
      //       id: 'nuevo',
      //       title: 'Reportes',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //     {
      //       id: 'nuevo2',
      //       title: 'Administrar GOSC',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //   ]
      // },
      // {
      //   id: 'calendario',
      //   title: 'Calendario de actividades',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   permiso: [ rol.administrador ],
      //   children: [
      //     {
      //       id: 'nuevo',
      //       title: 'Reportes',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //     {
      //       id: 'nuevo2',
      //       title: 'Administrar GOSC',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //   ]
      // },
      // {
      //   id: 'sesiones',
      //   title: 'Gestión de sesión de consejos electorales',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   permiso: [ rol.administrador ],
      //   children: [
      //     {
      //       id: 'nuevo',
      //       title: 'Reportes',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //     {
      //       id: 'nuevo2',
      //       title: 'Administrar GOSC',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //   ]
      // },
      // {
      //   id: 'actividades',
      //   title: 'Informe de actividades',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   permiso: [ rol.administrador ],
      //   children: [
      //     {
      //       id: 'nuevo',
      //       title: 'Reportes',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //     {
      //       id: 'nuevo2',
      //       title: 'Administrar GOSC',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //   ]
      // },
      // {
      //   id: 'desinstalacion',
      //   title: 'Desinstalación de consejos electorales',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   permiso: [ rol.administrador ],
      //   children: [
      //     {
      //       id: 'nuevo',
      //       title: 'Reportes',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //     {
      //       id: 'nuevo2',
      //       title: 'Administrar GOSC',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //   ]
      // },
      // {
      //   id: 'custodia',
      //   title: 'Cadena de custodia',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   permiso: [ rol.administrador ],
      //   children: [
      //     {
      //       id: 'nuevo',
      //       title: 'Reportes',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //     {
      //       id: 'nuevo2',
      //       title: 'Administrar GOSC',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //   ]
      // },
      // {
      //   id: 'recepcion',
      //   title: 'Recepción de paquetes electorales',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   permiso: [ rol.administrador ],
      //   children: [
      //     {
      //       id: 'nuevo',
      //       title: 'Reportes',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //     {
      //       id: 'nuevo2',
      //       title: 'Administrar GOSC',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //   ]
      // },
      // {
      //   id: 'seguimiento',
      //   title: 'Seguimiento de la jornada electoral',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   permiso: [ rol.administrador ],
      //   children: [
      //     {
      //       id: 'nuevo',
      //       title: 'Reportes',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //     {
      //       id: 'nuevo2',
      //       title: 'Administrar GOSC',
      //       type: 'item',
      //       url: '/eventos/nuevo',
      //     },
      //   ]
      // },
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
