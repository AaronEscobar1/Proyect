export interface EquivalenciaTipoCuenta {
    // Codigo de la Empresa
    idEmpresa:              string;
    // Codigo del Tipo de Institucion para Deposito
    tipiCodtip:             string;
    // Codigo de Institucion para deposito
    codins:                 string;
    // Codigo de tipo de cuenta
    tctaTipcta:             string;
    // Codigo de equivalencia del tipo de cuenta indicado
    equiva:                 string;
    // Objeto adicional para obtener toda la data de cuenta
    cfDepositoCuentaTipoTb: CFDepositoCuentaTipoTB;
}

export interface CFDepositoCuentaTipoTB {
    tipcta: string;
    descta: string;
}

// Interfaces para crear registros
export type EquivalenciaTipoCuentaCreate = Omit<EquivalenciaTipoCuenta, 'cfDepositoCuentaTipoTb'>;

// Interfaces para actualizar registros
export type EquivalenciaTipoCuentaUpdate = Pick<EquivalenciaTipoCuenta, 'equiva'>;