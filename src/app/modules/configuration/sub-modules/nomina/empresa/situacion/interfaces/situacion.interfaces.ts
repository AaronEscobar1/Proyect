import { GrupoRotacion } from "../../shared-empresa/interfaces/grupo-rotacion.interfaces";

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
    nmGrupoRotacionTb:        GrupoRotacion;
}

// Interface para actualizar situación
export interface SituacionUpdate {
    // Descripcion de la situación                  (Requerido)
    dessta:                   string;
    // Consecutivo del Grupo
    idGrupo:                  string | null;
    // Considerar el esquema de trabajo en calculo de vacacion (0= No, 1=Generar, 2= Cargar)
    idRotacion:               string | null;
    // Status es de Vacacion (0=No, 1..4=Si)        (Requerido)
    nmVacacionStatusTb:       PrimaryKeyNmVacacion;
    // Considerar el esquema de trabajo en calculo de vacacion (0= No, 1=Generar, 2= Cargar)
    nmTipoEsquTrabCalcVacaTb: PrimaryKeyNmTipoEsquTrabCalcVaca;
    // Clasificacion de la situacion
    cfClaseSituacionTb:       PrimaryKeyCFClaseSituacion;
    // Grupo Rotacion
    nmGrupoRotacionTb?:       PrimaryKeyNmGrupoRotacion;
}

/**
 * Interface para esstatus es de vacación
 */
export interface NmVacacionStatusTB {
    vacsta:      string;
    descripcion: string;
    primaryKey?:  PrimaryKeyNmVacacion;
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
    primaryKey?:  PrimaryKeyNmTipoEsquTrabCalcVaca;
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
    primaryKey?:  PrimaryKeyCFClaseSituacion;
}

export interface PrimaryKeyCFClaseSituacion {
    clasta: string;
}

// Interfaces para clasificacion de la situacion
export type ClaseSituaciones = Omit<CFClaseSituacionTB, 'primaryKey'>;

/**
 * Interface para Grupo Rotacion
 */
export interface PrimaryKeyNmGrupoRotacion {
    idEmpresa: string;
    idGrupo:   string;
    idNomina:  string;
    congru:    string;
}