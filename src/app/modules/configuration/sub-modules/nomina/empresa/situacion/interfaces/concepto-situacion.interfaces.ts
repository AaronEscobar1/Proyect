export interface ConceptoSituacion {
    // Codigo de la Compañia
    idEmpresa:               string;
    // Tipo de Nomina
    idNomina:                string;
    // Codigo de Status
    codStat:                 string;
    // Codigo de Concepto
    idConcepto:              string;
    // Cantidad limite, en dias, para desactivar el Concepto
    dialim:                  number | null;
    // No suspender si la Situacion de Vacacion (0=No, 1=Salida, 2=Regreso)
    nmTipoSuspencionVacacTb: NmTipoSuspencionVacacTB;
    // Id temporal para [dataKey] de tabla edit
    idTableTemporal:        number;
}

export interface NmTipoSuspencionVacacTB {
    susvac:      string;
    descripcion?: string;
    primaryKey?:  PrimaryKey;
}

export interface PrimaryKey {
    susvac: string;
}

// Interfaces para crear registros
export interface ConceptoSituacionCreate {
    // Codigo de Concepto
    idConcepto: string;
    // Cantidad limite, en dias, para desactivar el Concepto
    dialim:     number;
    // No suspender si la Situacion de Vacacion (0=No, 1=Salida, 2=Regreso)
    susvac:     string;
}

// Interfaces para actualizar registros omitiendo el idConcepto
export type ConceptoSituacionUpdate = Omit<ConceptoSituacionCreate, 'idConcepto'>;

// Interfaces de suspenciones por vacacion
export interface SuspencionVacacion {
    susvac:      string;
    descripcion: string;
}
