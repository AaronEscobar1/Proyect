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
    feFunda       : Date;
    feInicio      : Date;
    filemail      : string;
    subprocesoRnet: number;
    links         : Link[];
}

export interface Link {
    rel : string;
    href: string;
}