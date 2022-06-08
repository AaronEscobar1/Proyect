export interface ResponseUser {
    tokenDeAcceso?: string;
    tipoDeToken?:   string;
    ssUsuario?:     SsUsuario;
}

export interface SsUsuario {
    id:             string;
    ssPerfil:       SsPerfil;
    claveAcceso:    string;
    pregSecreta:    string;
    respSecreta:    string;
    idPais:         any;
    email:          string;
    usrcre:         any;
    feccre:         any;
    usract:         any;
    fecact:         any;
    cambioClave:    any;
    inactivo:       string;
    idioma:         any;
    idAcceso:       string;
    fecha_acce:     any;
    intentos:       any;
    ssRolAsiganado: SsRolAsiganado[];
}

export interface SsPerfil {
    id:           string;
    intentos:     number;
    vencimiento:  number;
    historial:    number;
    caracterMayu: boolean;
    caracterMinu: boolean;
    caracterNume: boolean;
    caracterEspe: boolean;
    longMinima:   number;
    usrcre:       string;
    feccre:       null;
    usract:       null;
    fecact:       null;
}

export interface SsRolAsiganado {
    id:      string;
    descrip: string;
    usrcre:  any;
    feccre:  any;
    usract:  any;
    fecact:  any;
}
