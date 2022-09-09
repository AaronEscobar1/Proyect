export interface FactorConversion {
    // Codigo de la Empresa
    idEmpresa:       string;
    // Codigo del tipo de moneda, utilizado como fuente para la conversion
    idMonOrigen:     string;
    // Fecha de entrada en vigencia de la tasa de conversion
    fvigencia:       Date | string;
    // Codigo del tipo de moneda, utilizado como destino para la conversion
    idMonDestino:    string;
    // Factor o valor de conversion
    factconv:        number;
    // Valor de redondeo a aplicar
    valorred:        number;
    // Relacion moneda destino
    cfMonedaDestino: CFMoneda;
    // Relacion moneda origen
    cfMonedaOrigen:  CFMoneda;
}

export interface CFMoneda {
    id:        string;
    nombre:    string;
    simbolo:   string;
    codigoiso: string;
}

// Interfaces con los datos necesarios para crear
export type FactorConversionCreate = Omit<FactorConversion, 'cfMonedaDestino' | 'cfMonedaOrigen'>

// Interfaces con los datos necesarios para actualizar
export type FactorConversionUpdate = Pick<FactorConversion, 'factconv' | 'valorred'>