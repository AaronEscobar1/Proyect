export interface Nomina {
    /**** Básica ****/
        idEmpresa: string;
        tipnom:    string;
        desnom:    string;
        /* Frecuencia */
            // Días
            frenom:    number;
            // No considerar en sueldo
            fresue:    string;
            // Año comercial
            anocom:    string;
        /* Fechas topes */
            fecto1:    Date | null;
            fecto2:    Date | null;
            fecto3:    Date | null;
            fecto4:    Date | null;
            fecto5:    Date | null;
            fecto6:    Date | null;
            fecto7:    Date | null;
            fecto8:    Date | null;
            fecto9:    Date | null;
            fecto10:   Date | null;
        // Redondeo
        valred:    number;
        // Recibo
        pgmrec:    string;
        /* Guardería */
            // Cantidad de salarios minimos
            canmin:    number;
            // Salario tope de guarderia
            topgua:    number;
            // Factor guarderia
            facgua:    number;
    /**** Miscelanea ****/
        /* Sencillo en fondo */
            // Asignacion
            asifon:    number;
            // Deduccion
            dedfon:    number;
            // valor
            valfon:    number;
        /* Vacación */
            // Tipo de fecha
            tipfec:    number;
            // Fecha de control
            fecabo:    Date | null;
            // Regreso habil
            reghab:    string;
    
    /* Otros atributos */
        // Tipo de moneda
        tipmon:    any;
        // Tasa de conversion de moneda
        tasmon:    any;
        // Clasificacion de nomina (1=Elegible, 2=Activo)
        clanom:    string;
        // Codigo del Pais donde ser  instalado el sistema
        codpai:    any;
        // Codigo contable, para considerar en la generacion del numero de comprobante
        codcon:    any;
}

export const daysData = [
    { label: '7',   value: 7 },
    { label: '10', value: 10 },
    { label: '14', value: 14 },
    { label: '15', value: 15 },
    { label: '21', value: 21 },
    { label: '28', value: 28 },
    { label: '30', value: 30 },
];

export const redondeoData = [
    { label: '0.01',    value: 0.01 },
    { label: '0.05',    value: 0.05 },
    { label: '0.25',    value: 0.25 },
    { label: '0.50',    value: 0.50 },
    { label: '0.50 +',  value: 0.50 },
    { label: '1.00',    value: 1.00 },
]