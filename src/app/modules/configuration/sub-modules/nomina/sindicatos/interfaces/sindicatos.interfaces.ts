export interface Sindicatos {
    codsin      : string;
    dessin      : string;
    
    // Registro
    registro    : Date;
    nroreg      : string;
    ntomo       : string;
    nfolio      : string;

    // Inspectoria
    local       : string;

    // Direccion
    dirsi1?     : string;
    paiCodpai   : string;
    pais        : string;
    edoCodedo   : string;
    entidadfed  : string;
    cdadCodciu? : string;
    tlfsi1?     : string;
    tlfsi2?     : string;
    faxsin?     : string;
    tlxsin?     : string;
    eMail?      : string;    
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
    originalEvent: PointerEvent;
    value: string;
}

