export interface Sindicatos {
    codsin      : string;
    dessin      : string;
    
    // Registro
    registro    : Date | null;
    nroreg      : string | null;
    ntomo       : string | null;
    nfolio      : string | null;

    // Inspectoria
    local       : string;

    // Direccion
    dirsi1?     : string | null;
    dirsi2?     : string | null;
    dirsi3?     : string | null;
    paiCodpai   : string | null;
    pais?        : string | null;
    edoCodedo   : string | null;
    entidadfed?  : string | null;
    cdadCodciu? : string | null;
    tlfsi1?     : string | null;
    tlfsi2?     : string | null;
    faxsin?     : string | null;
    tlxsin?     : string | null;
    eMail?      : string | null;    
}

export interface Countrys {
    nombre: string;
    codigo: string;
}

export interface FederalEntities {
    nombre: string;
    codPais: string;
    codEntidad: string;
}

export interface ObjectEventChange {
    originalEvent: any;
    value: any;
}

export interface Dropdown {
    selectedOption: {
        nombre: string
    };
}

