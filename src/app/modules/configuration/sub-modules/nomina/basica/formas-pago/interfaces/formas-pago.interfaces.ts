export interface FormasPago {
    codpag: string;
    despag: string;
    conins: string;
    coninsString?: string;
    usrcre?: string;
    feccre?: Date;
    usract?: string;
    fecact?: Date;
}

export interface TypeFormasPago {
    label: string;
    value: string;
}

export enum TypeFormasPagoEnum {
    efectivo         = '1',
    deposito         = '2',
    chequeNoContinuo = '3',
    chequeContinuo   = '4'
}