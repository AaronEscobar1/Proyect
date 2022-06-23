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
    rif2          : string;
    direccion     : string;
    ciudad        : string;
    idEntfe       : string;
    idPais        : string;
    codPostal     : string;
    telefono1     : string;
    telefono2     : string;
    fax           : string;
    paginaWeb     : string;
    eMail         : string;
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

export const sectorEmpresaData: dropdownType[] = [
    {  label: 'Comercio',            value: 'Comercio'            },
    {  label: 'Educación',           value: 'Educación'           },
    {  label: 'Finanzas',            value: 'Finanzas'            },
    {  label: 'Gobierno',            value: 'Gobierno'            },
    {  label: 'Industría',           value: 'Industría'           },
    {  label: 'Negocios y economía', value: 'Negocios y economía' },
    {  label: 'Salud',               value: 'Salud'               },
    {  label: 'Seguridad',           value: 'Seguridad'           },
    {  label: 'Seguros',             value: 'Seguros'             },
    {  label: 'Servicios',           value: 'Servicios'           },
    {  label: 'Transporte',          value: 'Transporte'          },
    {  label: 'Turismo',             value: 'Turismo'             },
    {  label: 'N/A',                 value: 'NA'                  }
];

export const conceptoEconomicoData: dropdownType[] = [
    { label: 'Empresa pública', value: '1', inactive: false },
    { label: 'Empresa privada', value: '0', inactive: false },
    { label: 'Empresa mixta',   value: '2', inactive: true }
];