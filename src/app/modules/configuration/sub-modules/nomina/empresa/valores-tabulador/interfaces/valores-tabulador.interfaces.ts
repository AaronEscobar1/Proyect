export interface Grados {
    eoGradoTbId: EoGradoTBID;
    descrip:     string;
    usrcre:      null;
    feccre:      null;
    usract:      null;
    fecact:      null;
    codOficial:  string;
}

export interface EoGradoTBID {
    idEmpresa: string;
    id:        string;
}

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
    usrcre:      string;
    feccre:      Date;
    usract:      null;
    fecact:      null;
    codOficial:  string;
}
