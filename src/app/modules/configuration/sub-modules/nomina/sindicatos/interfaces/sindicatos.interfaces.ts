export interface Sindicatos {
    codsin      : string;
    dessin      : string;
    
    // Registro
    datesin     : Date;
    numbersin   : string;
    tomosin     : string;
    folio       : string;

    // Inspectoria
    inspectoria : string;

    // Direccion
    desdir?     : string;
    pais        : string;
    entidadfed  : string;
    ciudad?     : string;
    telefono1?  : string;
    telefono2?  : string;
    fax?        : string;
    telex?      : string;
    email?      : string;    
}
