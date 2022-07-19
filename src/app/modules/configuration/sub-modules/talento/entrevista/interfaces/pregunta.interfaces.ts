export interface PreguntaEntrevista {
    id          : number;
    idEntrevista: number;
    titulo      : string;
    cerrada     : string;
}

export interface TipoPregunta {
    descripcion: string;
    cerrada    : string;
}