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

// Interface para status es de Vacacion
export interface NmVacacionStatusTB {
    vacsta:      string;
    descripcion: null;
    primaryKey:  PrimaryKeyNmVacacion;
}

export interface PrimaryKeyNmVacacion {
    vacsta: string;
}

// Interface para Considerar el esquema de trabajo en calculo de vacacion
export interface NmTipoEsquTrabCalcVacaTB {
    conesq:      string;
    descripcion: null;
    primaryKey:  PrimaryKeyNmTipoEsquTrabCalcVaca;
}

export interface PrimaryKeyNmTipoEsquTrabCalcVaca {
    conesq: string;
}

// Interface para Clasificacion de la situacion
export interface CFClaseSituacionTB {
    clasta:      string;
    descripcion: null;
    primaryKey:  PrimaryKeyCFClaseSituacion;
}

export interface PrimaryKeyCFClaseSituacion {
    clasta: string;
}

// Grupo Rotacion
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
    diag31:     null;
    diav01:     null;
    diav02:     null;
    diav03:     null;
    diav04:     null;
    diav05:     null;
    diav06:     null;
    diav07:     null;
    diav08:     null;
    diav09:     null;
    diav10:     null;
    diav11:     null;
    diav12:     null;
    diav13:     null;
    diav14:     null;
    diav15:     null;
    diav16:     null;
    diav17:     null;
    diav18:     null;
    diav19:     null;
    diav20:     null;
    diav21:     null;
    diav22:     null;
    diav23:     null;
    diav24:     null;
    diav25:     null;
    diav26:     null;
    diav27:     null;
    diav28:     null;
    diav29:     null;
    diav30:     null;
    diav31:     null;
    canlim:     number;
    diaga1:     null;
    diaga2:     null;
    diaga3:     null;
    diaga4:     null;
    diava1:     null;
    diava2:     null;
    diava3:     null;
    diava4:     null;
    primaryKey: PrimaryKeyNmGrupoRotacion;
}

export interface PrimaryKeyNmGrupoRotacion {
    idEmpresa: string;
    idGrupo:   string;
    idNomina:  string;
    congru:    number;
}
