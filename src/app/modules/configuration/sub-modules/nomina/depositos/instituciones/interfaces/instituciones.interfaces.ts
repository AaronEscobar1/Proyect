export interface Institucion {
    // Codigo de la empresa
    idEmpresa:              string;
    // Codigo del Tipo de Institucion para Deposito
    tipiCodtip:             string;
    // Codigo de Institucion para deposito
    codins:                 string;
    // Descripcion de Institucion para deposito
    desins:                 string;
    // Numero del RIF
    nrorif:                 string;
    // Nombre de la persona Contacto
    nomcon:                 string;
    // Codigo de riesgo segun clasificacion
    codrie:                 string;
    // 1ra linea de direccion
    direc1:                 string;
    // 2da linea de direccion
    direc2:                 string;
    // 3ra linea de direccion
    direc3:                 string;
    // Codigo de Pais
    spiPaisEntidadFedTb:    SPIPaisEntidadFedTB;
    // Codigo de Ciudad
    cdadCodciu:             string;
    // 1er Numero de telefono
    nrotl1:                 string;
    // 2do Numero de telefono
    nrotl2:                 string;
    // Numero de FAX
    nrofax:                 string;
    // Numero de Cuenta
    nrocta:                 string;
    // Tipo de cuenta para deposito
    tctaTipcta?:            TctaTipcta;
    // Numero de contrato para realizar el contrato
    noctto:                 string;
    // Cuenta Contable
    ctacon:                 string;    
    // Codigo y descripcion del Tipo de Institucion para Deposito
    cfTipoInstitutoFinanTb: CFTipoInstitutoFinanTB;
}

export interface SPIPaisEntidadFedTB {
    // Codigo de Pais
    codPais:     string;
    // Codigo de Estado
    codEntidad:  string;
    nombre:      string;
    primaryKey?: PrimaryKey;
}

export interface PrimaryKey {
    codEntidad: string;
    codPais:    string;
}

export interface TctaTipcta {
    tipcta?: string;
    descta?: string;
}

export interface CFTipoInstitutoFinanTB {
    tipiCodtip:  string;
    descripcion: string;
}

// Interfaces para actualizar registros
export type InstitucionUpdate = Omit<Institucion, 'idEmpresa' | 'tipiCodtip' | 'codins'>;


