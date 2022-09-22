export interface InstitucionTercero {
    // Codigo de la Empresa
    idEmpresa:            string;
    // Codigo del Tipo de Institucion para Deposito
    tipiCodtip:           string;
    // Codigo de Institucion para deposito
    codins:               string;
    // Codigo del banco emisor
    bancoEmisorObj?:       BancoOrObj;
    // Codigo agencia banco emisor
    agenciaEmisor:        string;
    // Tipo de pago del banco emisor
    tipoPagoEmisorObj?:    TipoPagoOrObj;
    // Forma de pago del banco emisor
    pagoFormaEmisorObj?:   PagoFormaOrObj;
    // Codigo del banco receptor
    bancoReceptorObj?:     BancoOrObj;
    // Codigo agencia del banco receptor
    agenciaReceptor:      string;
    // Tipo de pago del banco receptor
    tipoPagoReceptorObj?:  TipoPagoOrObj;
    // Forma de pago del banco receptor
    pagoFormaReceptorObj?: PagoFormaOrObj;
    // Indentificacion del tipo de documento
    tipoDocumentoObj?:     TipoDocumentoObj;
    // Version
    version:              string;
    // Siglas o nomenclatura del tipo de moneda del monto del debito
    monedaEmisorObj?:      MonedaOrObj;
    // Siglas o nomenclatura del tipo de moneda del monto del debito
    monedaReceptorObj?:    MonedaOrObj;
    // Tipo de transaccion a ejecutar
    tipoTransaccionObj?:   TipoTransaccionObj;
    // Texto libre 1
    texto1:               string;
    // Texto libre 2
    texto2:               string;
    // Objeto para obtener descripcion de la agencia emisor
    agenciaEmisorObj:     AgenciaOrObj;
    // Objeto para obtener descripcion de la agencia receptor
    agenciaReceptorObj:   AgenciaOrObj;
}

export interface BancoOrObj {
    codBanco?:    string;
    descripcion?: string;
}

export interface TipoPagoOrObj {
    tipoPago?:    string;
    descripcion?: string;
}

export interface PagoFormaOrObj {
    codpag?: string;
    despag?: string;
}

export interface TipoDocumentoObj {
    tipoDocu?:    string;
    descripcion?: string;
}

export interface TipoTransaccionObj {
    tipoTransac?: string;
    descripcion?: string;
}

export interface MonedaOrObj {
    id?:        string;
    nombre?:    string;
    simbolo?:   string;
    codigoiso?: null;
}

export interface AgenciaOrObj {
    codBanco?:    string;
    codAgencia?:  string;
    descripcion?: string;
}

// Interfaces para crear registros
export type InstitucionTerceroCreate = Omit<InstitucionTercero, 'agenciaEmisorObj' | 'agenciaReceptorObj'>

// Interfaces para actualizara registros
export type InstitucionTerceroUpdate = Omit<InstitucionTercero, 'agenciaEmisorObj' | 'agenciaReceptorObj' | 'idEmpresa' | 'tipiCodtip' | 'codins'>
