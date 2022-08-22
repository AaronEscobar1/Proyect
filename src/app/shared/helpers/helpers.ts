import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { Message } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { SortEventOrder } from '../interfaces/tableHead.interfaces';

@Injectable({
    providedIn: 'root'
})
export class Helpers {

    static APPLICATION_JSON = 'application/json';
    static APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded';
    static MULTIPART_FORM_DATA = 'multipart/form-data;';
    SUCCESS_MESSAGE = 'success';
    ERROR_MESSAGE = 'error';
    FAIL_MESSAGE = 'fail';
    BAD_CREDENTIALS = 'Bad credentials';
    ERROR_GENERAL_MESSAGE = 'No hubo comunicación con el servidor.';

    /**
     * @brief Obtiene la url basica desde las environments
     * @return string
     */
    getBasicEndPoint(path: string): string {
        return `${environment.api}${path}`;
    }

    /**
     * @brief Construye un mensaje de alerta
     * @params type: string (info, success, warn, error), msg: string, title?: string
     * @return Message[]
     */
    msgAlert(type: string, msg: string, title?: string): Message[] {
        return [{ severity: type, summary: title, detail: msg }];
    }

    /**
     * @brief Muestra un modal de tipo exitoso
     * @params textArg: string, titleArg: string
     * @return Promise<SweetAlertResult>
     */
    openSuccessAlert(textArg: string, titleArg: string = ''): Promise<SweetAlertResult> {
        return Swal.fire(this.swalModalBasic(textArg, titleArg, 'success'));
    }

    /**
     * @brief Muestra un modal de tipo info
     * @params textArg: string, titleArg?: string
     * @return Promise<SweetAlertResult>
     */
    openInfoAlert(textArg: string, titleArg: string = ''): Promise<SweetAlertResult> {
        return Swal.fire(this.swalModalBasic(textArg, titleArg, 'info'));
    }

    /**
     * @brief Muestra un modal de tipo error
     * @params textArg: string, titleArg: string
     * @return Promise<SweetAlertResult>
     */
    openErrorAlert(textArg: string, titleArg: string = ''): Promise<SweetAlertResult> {
        return Swal.fire(this.swalModalBasic(textArg, titleArg, 'error'));
    }

    /**
     * @brief Construye un modal de Swal
     * @params textArg: string, titleArg: string, iconArg: any
     * @return SweetAlertOptions
     */
    private swalModalBasic(textArg: string, titleArg: string, iconArg: any): SweetAlertOptions {
        return {
            title: titleArg,
            text: textArg,
            icon: iconArg,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        };
    }

    /**
     * Formatear fecha con día por defecto en 01, YYYY/MM/01
     * @param date: Date
     * @returns string
     */
    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = '01';
        return `${year}-${month}-${day}`;
    }

    /**
     * Método para ordenar de manera ascendente y descendente los datos en la tabla usando formulario reactivos
     * @param event: SortEventOrder
     */
    customSort(event: SortEventOrder) {
      event.data.sort((data1, data2) => {
        let value1 = data1.value[event.field];
        let value2 = data2.value[event.field];
        let result = 0;
        if (value1 == null && value2 != null)
          result = -1;
        else if (value1 != null && value2 == null)
          result = 1;
        else if (value1 == null && value2 == null)
          result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        return (event.order * result);
      })
    }

}
