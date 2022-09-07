export interface TipoMoneda {
    // Codigo que identifica el tipo de moneda
    id:        string;
    // Nombre descriptivo del tipo de moneda
    nombre:    string;
    // Simbolo o nombre abreviado del tipo de moneda
    simbolo:   string;
    // Codigo ISO de la moneda
    codigoiso: string;
}

// Interfaces con los datos necesarios para actualizar
export type TipoMonedaUpdate = Omit<TipoMoneda, 'id'>;