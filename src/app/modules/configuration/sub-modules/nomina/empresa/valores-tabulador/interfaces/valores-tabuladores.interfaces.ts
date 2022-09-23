import { EoGradoTBID } from './grados-tabuladores.interfaces';

export interface ValoresGrados {
    valtab:     number;
    eoGradoTb:  EoGradoTB;
    idEmpresa:  string;
    tabuCodtab: string;
    fecefe:     Date;
    pastab:     number;
}

export interface EoGradoTB {
    eoGradoTbId: EoGradoTBID;
    descrip:     string;
    codOficial:  string;
}