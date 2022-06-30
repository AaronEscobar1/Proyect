export interface Competencias {
    id     : number;
    nombre : string;
    descrip: string;
    tipo   : string;
    links? : Link[];
}

export interface Link {
    rel :  string;
    href:  string;
}

export interface TiposCompetencias {
    tipo   : string;
    nombre : string;
}