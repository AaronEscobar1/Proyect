import { dropdownType } from '../../../../../../../shared/interfaces/typesFiles.interfaces';

/** Funciones de Conceptos */
export interface FuncionConcepto {
    functo:      string;
    descripcion: string;
}

/** Tipos Saldos */
export interface TipoSaldo {
    mansal:      string;
    descripcion: string;
}

/** Gravables Impuestos */
export interface GravableImpuesto {
    graimp:      string;
    descripcion: string;
}

/** Métodos Fiscales */
export interface MetodoFiscal {
    tipfis:      number;
    descripcion: string;
}

/** Tipos de Cálculos */
export interface TipoCalculo {
    tipcal:      number;
    descripcion: string;
}

/** Manejos Decimales */
export interface ManejoDecimal {
    sindec:      string;
    descripcion: string;
}

/** Estatus afectaciones Cheques */
export interface AfectacionCheque {
    afeche:      string;
    descripcion: string;
}

/** Indicadores Pagos de Intereses */
export interface PagoInteres {
    capint:      string;
    descripcion: string;
}

/** Indicadores Pagos Cuotas */
export interface PagoCuota {
    concuo:      string;
    descripcion: string;
}

/** Condiciones de Retroactividad */
export interface CondicionRetroactividad {
    cretro:      string;
    descripcion: string;
}

/** Distribuciones Contables */
export interface DistribucionContable {
    discon:      string;
    descripcion: string;
}

/** Indicadores que Generar Retroactivos */
export interface IndicadorRetroactivo {
    gretro:      string;
    descripcion: string;
}

/** Días de Semana */
export interface IndicadorRetroactivo {
    diasem:      number;
    descripcion: string;
}

/** Tipos fechas Aniversario */
export interface FechaAniversario {
    tipfea:      number;
    descripcion: string;
}

/** Rutinas de Cálculos */
export interface RutinaCalculo {
    rutcal:      string;
    descripcion: string;
}

export const redondeoDataConcepto: dropdownType[] = [
    { label: 'No aplica',    value: "0" },
    { label: 'Sin redondeo', value: "1" },
    { label: 'Con redondeo', value: "2" }
];
