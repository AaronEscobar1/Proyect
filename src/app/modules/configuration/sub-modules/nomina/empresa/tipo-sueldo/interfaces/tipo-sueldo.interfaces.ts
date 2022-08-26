export interface TipoSueldo {
    // Id empresa 
    idEmpresa: string;
    // Codigo de tipo sueldo
    id:        string;
    // Nombre o descripcion de tipo sueldo
    nombre:    string;
    // Tipo de sueldo
    sueldoUno: boolean;
}

// Interfaces para actualizar registros
export type TipoSueldoUpdate = Pick<TipoSueldo, 'nombre' | 'sueldoUno'>;