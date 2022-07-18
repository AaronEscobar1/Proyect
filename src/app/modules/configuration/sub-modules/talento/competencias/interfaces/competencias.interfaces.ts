export interface Competencias {
    id     :  number;
    nombre :  string;
    descrip:  string;
    tipo   :  Tipo;
    links? :  Link[];
}

export interface Tipo {
    id    : string;
    nombre: string;
}

export interface Link {
    rel :  string;
    href:  string;
}

export interface TiposCompetencias {
    id     : string;
    nombre : string;
}
