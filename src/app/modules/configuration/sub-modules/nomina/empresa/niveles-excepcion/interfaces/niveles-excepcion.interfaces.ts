export interface NivelExcepcion {
    // Codigo de empresa
    idEmpresa: string;
    // Tipo de nomina
    idNomina:  string;
    // Codigo de nivel de sueldo
    codniv:    number;
    // Descripcion de sueldo
    desniv:    string;
}

// Interfaces con los datos necesarios para actualizar
export type NivelExcepcionUpdate = Pick<NivelExcepcion, 'desniv'>