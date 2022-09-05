export interface InstitucionPrograma {
    // Codigo de la empresa
    idEmpresa:        string;
    // Codigo del Tipo de Institucion para Deposito
    tipiCodtip:       string;
    // Codigo de Institucion para deposito
    codins:           string;
    // Nombre del programa
    nombrePgm:        string;
    // Tipo de programa, 1=Reporte, 2=Archivo, 3=Cheque
    nmTipoProgramaTb: NmTipoProgramaTB;
    // Descripcion del programa
    descrip:          string;
    // Id temporal para [dataKey] de tabla edit
    idTableTemporal:        number;
}

export interface NmTipoProgramaTB {
    tippgm:       string;
    descripcion:  string;
    primaryKey?:  PrimaryKey;
}

export interface PrimaryKey {
    tippgm: string;
}

// Interfaces para actualizar registros
export type InstitucionProgramaUpdate = Pick<InstitucionPrograma, 'descrip' | 'nmTipoProgramaTb'>

export interface TipoPrograma {
    tippgm:      string;
    descripcion: string;
}

