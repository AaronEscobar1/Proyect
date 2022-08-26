export interface TipoCuenta {
    tipcta: string;
    descta: string;
}

// Interfaces con los datos necesarios para actualizar
export type TipoCuentaUpdate = Pick<TipoCuenta, 'descta'>;