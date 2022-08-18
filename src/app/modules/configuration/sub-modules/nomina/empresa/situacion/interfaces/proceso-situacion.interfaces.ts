export interface ProcesoSituacion {
    // Codigo de la Compañia
    idEmpresa:               string;
    // Tipo de Nomina
    idNomina:                string;
    // Codigo de Status
    codStat:                 string;
    // Tipo de Proceso
    procTippro: number;
    // Tipo de Subproceso (0..9)
    tipsub:     number;
    // Dias limites para considerar en la suspension del proceso
    dialim:     number;
    // No suspender si la Situacion de Vacacion (0=No, 1=Salida, 2=Regreso)
    susvac:     string;
}

// Interfaces para crear registros
export interface ProcesoSituacionCreate {
    procTippro: string;
    tipsub:     string;
    dialim:     number;
    susvac:     string;
}

// Interfaces para actualizar registros omitiendo [procTippro, tipsub]
export type ProcesoSituacionUpdate = Omit<ProcesoSituacionCreate, 'procTippro' | 'tipsub'>;
