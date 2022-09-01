import { Company } from '../../shared-empresa/interfaces/empresa.interfaces';

export interface ClaseInformacion {
    // Nombre de informacion
    nombre:                 string;
    // Company
    cfEmpresaTB:            Company;
    // Equivalencia clase de informacion: 01=Uniformes, 02=Estudios, 03=Becas, 04=Ocupacion OCEPRE, etcetera
    equivalencia:           Equivalencia;
    // Equivalencia, idEmpresa y idEquivalencia
    nmInformacionClaseTbId: NmInformacionClaseTBID;
}

export interface NmInformacionClaseTBID {
    idEmpresa: string;
    id:        string;
}

export interface Equivalencia {
    id?:      string ;
    nombre?:  string;
}

// Interface para crear registros
export interface ClaseInformacionCreate {
    idEmpresa:      string;
    id:             string;
    nombre:         string;
    equivalencia?:  Equivalencia;
}

// Interfaces para actualizar registros
export interface ClaseInformacionUpdate {
    nombre:        string;
    equivalencia?: string;
}
