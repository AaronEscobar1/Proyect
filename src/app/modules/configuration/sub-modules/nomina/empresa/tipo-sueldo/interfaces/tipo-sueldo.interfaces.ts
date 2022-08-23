export interface TipoSueldo {
    // Codigo de tipo sueldo
    id:        string;
    // Nombre o descripcion de tipo sueldo
    nombre:    string;
    // Tipo de sueldo
    sueldoUno: boolean;
    // Id empresa 
    idEmpresa: string;
}

// Interfaces para crear registros
export interface TipoSueldoCreate {
    idEmpresa: string;
    id:        string;
    nombre:    string;
}

// Interfaces para actualizar registros
export type TipoSueldoUpdate = Pick<TipoSueldoCreate, 'nombre'>;