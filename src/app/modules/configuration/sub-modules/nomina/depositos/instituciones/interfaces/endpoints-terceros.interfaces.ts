// Interfaces para bancos
export interface BancoInstitucion {
    codBanco:    string;
    descripcion: string;
}

// Interfaces para agencias de bancos
export interface AgenciaBanco {
    codBanco:    string;
    codAgencia:  string;
    descripcion: string;
}

// Interfaces para tipos de transacciones
export interface TipoTransaccion {
    tipoTransac: string;
    descripcion: string;
}

// Interfaces para tipos pago
export interface TipoPago {
    tipoPago:    string;
    descripcion: string;
}

// Interfaces para tipos documentos
export interface TipoDocumento {
    tipoDocu:    string;
    descripcion: string;
}
