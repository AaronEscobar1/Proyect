import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { Message } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class Helpers {

    static APPLICATION_JSON = 'application/json';
    static APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded';
    static MULTIPART_FORM_DATA = 'multipart/form-data;';

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

}
