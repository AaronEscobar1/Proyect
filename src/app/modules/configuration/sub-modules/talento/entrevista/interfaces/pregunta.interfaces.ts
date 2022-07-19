export interface PreguntaEntrevista {
    id           : number;
    id_entrevista: number;
    titulo       : string;
    cerrada      : string;
}

export interface TipoPregunta {
    descripcion: string;
    cerrada    : string;
}