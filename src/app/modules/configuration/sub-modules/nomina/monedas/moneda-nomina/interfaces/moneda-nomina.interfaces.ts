import { TipoMoneda } from '../../tipos-monedas/interfaces/tipo-moneda.interfaces';

export interface MonedaNomina {
    // Codigo de la empresa
    empresaid:      string;
    // Codigo de la nomina
    nominaid:       string;
    // Codigo del tipo de moneda que se utiliza en nomina
    monedaid:       string;
    // Fecha de vigencia del tipo de monena utilizado en nomina
    fvigencia:      Date | string;
    // Comentario
    comentario:     string;
    // Atributo adicional de tipo de moneda
    tipo: TipoMoneda;
}

// Interfaces para crear registro
export type MonedaNominaCreate = Omit<MonedaNomina, 'empresaid' | 'nominaid' | 'cfMonedaTipoTb'>;

// Interfaces para actualizar registro
export type MonedaNominaUpdate = Pick<MonedaNomina, 'comentario'>;