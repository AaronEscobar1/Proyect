export interface TarifaImpuesto {
    // Codigo de la compañia
    idEmpresa: string;
    // Año y mes (fecha YYYY/MM/01) calendario de vigencia de la tarifa
    anomes:    Date | string;
    // Remuneracion Desde
    remdes:    number;
    // Remuneracion Hasta
    remhas:    number;
    // Tipo de registro (0=No aplica, 1=Impuesto, 2=Subsidio, 3=Credito)
    tipreg:    string;
    // Frecuencia de impuesto (0=No aplica, 7=Semanal, 15=quincenal, 30=Mensual, 360=Anual)
    frecue:    number;
    // Tasa Imponible 1
    tasim1:    number;
    // Tasa Imponible 2
    tasim2:    number;
    // Valor  del sustraendo
    valsus:    number;
}

// Interfaces con los datos necesarios para actualizar
export type TarifaImpuestoUpdate = Pick<TarifaImpuesto, 'tasim1' | 'tasim2' | 'valsus'>

export interface TipoTarifa {
    tipreg:      string;
    descripcion: string;
}

export interface FrecuenciaImpuesto {
    frecue:      number;
    descripcion: string;
}
