import { dropdownType } from "src/app/shared/interfaces/typesFiles.interfaces";

export interface Company {
    id            : string;
    nombre        : string;
    clave         : string;
    nombreAbrev   : string;
    sectorEmp     : string;
    publica       : string;
    capitalPag    : number;
    capitalSub    : number;
    rif1          : string;
    rif2          : string | null;
    direccion     : string;
    ciudad        : string;
    idEntfe       : string;
    idPais        : string;
    codPostal     : string;
    telefono1     : string;
    telefono2     : string | null;
    fax           : string;
    paginaWeb     : string;
    eMail         : string | null;
    feFunda       : Date | null;
    feInicio      : Date;
    filemail      : string;
    subprocesoRnet: number;
    links         : Link[];
}

export interface Link {
    rel : string;
    href: string;
}

export interface SectorEmpresas {
    descripcion: string;
    sectorEmp: string;
}

export const conceptoEconomicoData: dropdownType[] = [
    { label: 'Empresa pública', value: '1', inactive: false },
    { label: 'Empresa privada', value: '0', inactive: false },
    { label: 'Empresa mixta',   value: '2', inactive: false }
];