import { EoGradoTBID } from './grados-tabuladores.interfaces';

export interface ValorGrado {
    // Codigo de la empresa
    idEmpresa:  string;
    // Codigo del tabulador o grado
    tabuCodtab: string;
    // Fecha de efectividad del paso o valor del tabulador o grado
    fecefe:     Date;
    // Paso o consecutivo del tabulador o grado
    pastab:     number;
    // Valor del salario diario del tabulador
    valtab:     number;
    // Atributo adicional para obtener la descripción del grado
    eoGradoTb:  EoGradoTB;
}

export interface EoGradoTB {
    eoGradoTbId: EoGradoTBID;
    descrip:     string;
    codOficial:  string;
}

// Interfaces para actualizar registros
export type ValorGradoUpdate = Pick<ValorGrado, 'valtab' | 'eoGradoTb'>