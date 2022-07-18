export interface Competencias {
    id     :  number;
    nombre :  string;
    descrip:  string;
    tipo   :  TiposCompetencias;
    links? :  Link[];
}

export interface Link {
    rel :  string;
    href:  string;
}

export interface TiposCompetencias {
    id     : string;
    nombre : string;
}
