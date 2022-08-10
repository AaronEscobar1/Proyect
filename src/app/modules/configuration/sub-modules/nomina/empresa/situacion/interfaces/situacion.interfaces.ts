export interface Situacion {
    // Código de la Compañia                        (Requerido)
    idEmpresa:                string;
    // Tipo de Nómina                               (Requerido)
    idNomina:                 string;
    // Código de la situación                       (Requerido)
    codsta:                   string;
    // Descripcion de la situación                  (Requerido)
    dessta:                   string;
    // Status es de Vacacion (0=No, 1..4=Si)        (Requerido)
    nmVacacionStatusTb:       NmVacacionStatusTB;
    // Código del Grupo de Trabajo
    idGrupo:                  string;
    // Consecutivo del Grupo
    idRotacion:               string;
    // Considerar el esquema de trabajo en calculo de vacacion (0= No, 1=Generar, 2= Cargar)
    nmTipoEsquTrabCalcVacaTb: NmTipoEsquTrabCalcVacaTB;
    // Clasificacion de la situacion
    cfClaseSituacionTb:       CFClaseSituacionTB;
    // Grupo Rotacion
    nmGrupoRotacionTb:        NmGrupoRotacionTB;
}

/**
 * Interface para esstatus es de vacación
 */
export interface NmVacacionStatusTB {
    vacsta:      string;
    descripcion: string;
    primaryKey:  PrimaryKeyNmVacacion;
}

export interface PrimaryKeyNmVacacion {
    vacsta: string;
}

// Interfaces para estatus vacación
export type EstatusVacacion = Omit<NmVacacionStatusTB, 'primaryKey'>;

/**
 * Interface para Considerar el esquema de trabajo en calculo de vacacion
 */
export interface NmTipoEsquTrabCalcVacaTB {
    conesq:      string;
    descripcion: string;
    primaryKey:  PrimaryKeyNmTipoEsquTrabCalcVaca;
}

export interface PrimaryKeyNmTipoEsquTrabCalcVaca {
    conesq: string;
}

// Interfaces para esquema de trabajo
export type EsquemaTrabajo = Omit<NmTipoEsquTrabCalcVacaTB, 'primaryKey'>;

/**
 * Interface para clasificacion de la situacion
 */
export interface CFClaseSituacionTB {
    clasta:      string;
    descripcion: string;
    primaryKey:  PrimaryKeyCFClaseSituacion;
}

export interface PrimaryKeyCFClaseSituacion {
    clasta: string;
}

// Interfaces para clasificacion de la situacion
export type ClaseSituaciones = Omit<CFClaseSituacionTB, 'primaryKey'>;

/**
 * Grupo Rotacion
 */
export interface NmGrupoRotacionTB {
    idEmpresa:  string;
    idNomina:   string;
    idGrupo:    string;
    congru:     number;
    diag01:     string;
    diag02:     string;
    diag03:     string;
    diag04:     string;
    diag05:     string;
    diag06:     string;
    diag07:     string;
    diag08:     string;
    diag09:     string;
    diag10:     string;
    diag11:     string;
    diag12:     string;
    diag13:     string;
    diag14:     string;
    diag15:     string;
    diag16:     string;
    diag17:     string;
    diag18:     string;
    diag19:     string;
    diag20:     string;
    diag21:     string;
    diag22:     string;
    diag23:     string;
    diag24:     string;
    diag25:     string;
    diag26:     string;
    diag27:     string;
    diag28:     string;
    diag29:     string;
    diag30:     string;
    diag31:     any;
    diav01:     any;
    diav02:     any;
    diav03:     any;
    diav04:     any;
    diav05:     any;
    diav06:     any;
    diav07:     any;
    diav08:     any;
    diav09:     any;
    diav10:     any;
    diav11:     any;
    diav12:     any;
    diav13:     any;
    diav14:     any;
    diav15:     any;
    diav16:     any;
    diav17:     any;
    diav18:     any;
    diav19:     any;
    diav20:     any;
    diav21:     any;
    diav22:     any;
    diav23:     any;
    diav24:     any;
    diav25:     any;
    diav26:     any;
    diav27:     any;
    diav28:     any;
    diav29:     any;
    diav30:     any;
    diav31:     any;
    canlim:     number;
    diaga1:     any;
    diaga2:     any;
    diaga3:     any;
    diaga4:     any;
    diava1:     any;
    diava2:     any;
    diava3:     any;
    diava4:     any;
    primaryKey: PrimaryKeyNmGrupoRotacion;
}

export interface PrimaryKeyNmGrupoRotacion {
    idEmpresa: string;
    idGrupo:   string;
    idNomina:  string;
    congru:    number;
}
