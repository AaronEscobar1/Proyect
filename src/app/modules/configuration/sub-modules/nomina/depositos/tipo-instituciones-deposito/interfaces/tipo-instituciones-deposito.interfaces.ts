export interface TipoInstitucion {
    // Código de empresa
    idEmpresa:                string;
    // Código del Tipo de Institución para deposito
    codtip:                   string;
    // Descripción del Tipo de Institución para deposito
    destip:                   string;
    // Clasificación de tipo de institución o fondo
    nmClaseTipoInstitucionTb: NmClaseTipoInstitucionTB;
}

export interface NmClaseTipoInstitucionTB {
    clatip:       string;
    descripcion?: string;
    primaryKey?:  PrimaryKey;
}

export interface PrimaryKey {
    clatip: string;
}

// Interfaces con los datos necesarios para actualizar
export type TipoInstitucionUpdate = Omit<TipoInstitucion, 'idEmpresa' | 'codtip'>;

export interface ClasificacionInstituciones {
    clatip:      string;
    descripcion: string;
}
