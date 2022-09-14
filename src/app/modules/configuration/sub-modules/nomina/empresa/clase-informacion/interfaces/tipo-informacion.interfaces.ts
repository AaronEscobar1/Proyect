import { Company } from "../../shared-empresa/interfaces/empresa.interfaces";

export interface TipoInformacion {
    // Identificador o codigo de empresa
    idEmpresa:            string;
    // Id clase de información
    idClase:              string;
    // Id clase de tipo de información
    id:                   string;
    // Nombre de informacion
    nombre:               string;
    // Fecha de efectividad del tipo de informaci¿n
    fecEfectiva:          Date | null;
    // Fecha de inicio del tipo de informaci¿n
    fechaIni:             Date | null;
    // Fecha final del tipo de informaci¿n
    fechaFin:             Date | null;
    // Atributo adicional de clase de información 
    nmInformacionClaseTb: NmInformacionClaseTB;
}

export interface NmInformacionClaseTB {
    nombre:                 string;
    cfEmpresaTB:            Company;
    equivalencia:           Equivalencia;
    nmInformacionClaseTbId: NmInformacionClaseTBID;
}

export interface NmInformacionClaseTBID {
    id:        string;
    idEmpresa: string;
}

export interface Equivalencia {
    id:     string;
    nombre: string;
}

// Interfaces para crear
export type TipoInformacionCreate = Omit<TipoInformacion, 'idEmpresa'>;

// Interfaces para actualizar
export type TipoInformacionUpdate = Omit<TipoInformacion, 'idEmpresa' | 'idClase' | 'id'>;

