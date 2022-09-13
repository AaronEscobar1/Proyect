export interface DenominacionMoneda {
    // Código de la empresa
    idEmpresa: string;
    // Código de la nomina
    idNomina:  string;
    // Código de la moneda
    idMoneda:  string;
    // Fecha de entrada en vigencia del valor de la moneda
    fvigencia: Date | string;
    // Valor de la moneda para la conversión
    valor:     number;
    // Denominación del valor de la moneda
    nombre:    string;
}

// Interfaces con los datos necesarios para actualizar
export type DenominacionMonedaUpdate = Pick<DenominacionMoneda, 'valor' | 'nombre'>