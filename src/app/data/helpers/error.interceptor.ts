import { Injectable, ErrorHandler } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {
    constructor() { }

    handleError(error: any) {
        console.log("Error Injector")
        console.error(error)
        if (error.status === 400) {
            console.log(error)
            Swal.fire({
                title: 'Error 400',
                text: 'Solicitud incorrecta, comunícate a la Unidad Tecníca de Sistemas de Información y Telecomunicaciones.',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(result => {
                location.reload(true);
            });
        } else if (error.status === 401) {
            console.error(error)
            Swal.fire({
                title: 'La sesión ha caducado.',
                text: 'Vuelva a inicia sesión.',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(result => {
                localStorage.clear();
                location.reload(true);
            });
        } else if (error.status === 404) {
            console.error(error)
            Swal.fire({
                title: 'Oops.',
                text: 'Página no encontrada.',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(result => {
                console.error(error)
            });
        } else if (error.status === 500) {
            console.error(error)
            Swal.fire({
                title: 'Error 500',
                text: 'Error interno del servidor, comunícate a la Unidad Técnica de Sistemas de Información y Telecomunicaciones.',
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(result => {
                console.error(error)
            });
        }
    }
}
