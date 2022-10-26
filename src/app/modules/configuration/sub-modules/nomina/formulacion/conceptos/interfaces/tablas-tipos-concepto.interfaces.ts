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

/** Tipos de salarios */
export interface TipoSalario {
    idEmpresa: string;
    id:        string;
    nombre:    string;
    sueldoUno: boolean;
}

/** Promedios */
export interface Promedio {
    // Codigo de la Compa?ia
    idEmpresa:  string;
    // Tipo de Nomina
    idNomina:   string;
    // Codigo del Promedio
    codpro:     string;
    // Descripcion del Promedio
    despro:     string;
    // Numero de periodos a considerar
    percon:     number;
    // El Numero de periodos a considerar son meses (1=Si)
    permes:     string;
    // Considerar el movimento del periodo en proceso (1=Si)
    conmov:     string;
    // Numero de meses anterior al mes actual
    mesant:     number;
    // Factor para periodos completos
    facper:     number;
    // Fecha de ingreso, trabajador, a considerar en meses completo (0..5)
    tipfec:     number;
    // Ubicacion de la cantidad para el divisor (0..4)
    ubidiv:     string;
    // Divisor para promediar
    divpro:     number;
    // Calcular la media (1=Si)
    calmed:     string;
    // Sumar Sueldo Basico (0=No, 1..6=Si)
    sumsue:     string;
    // Factor para considerar proporcion de sueldo a sumar
    facsue:     number;
    // Considerar cantidad limite (1=Si)
    conlim:     string;
    // Cantidad limite a considerar
    canlim:     number;
    // Se acumula para promediar (1=Si)
    seacum:     string;
    // Rutina de calculo para obtener montos promediados
    contop:     string;
    // Mes final o tope para obtener acumulado para promedio
    mestop:     number;
    // Promedio para obtener acumulador, acorde a su definicion
    promMonacu: string | null;
    // Consolidar el promedio por compa?ia (1=Si)
    consolida:  string;
    // Promedio inactivo (1=Si)
    inactivo:   string;
}

