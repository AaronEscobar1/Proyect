export interface FormasPago {
    codpag: string;
    despag: string;
}

// Interfaces para actualizar registro
export type FormasPagoUpdate = Omit<FormasPago, 'codpag'>;