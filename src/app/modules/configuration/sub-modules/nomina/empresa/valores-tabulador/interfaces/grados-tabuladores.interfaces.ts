import { dropdownType } from '../../../../../../../shared/interfaces/typesFiles.interfaces';

export interface Grados {
    // Codigo de tabulador o grado ( Atributo para rellenar en el formulario a la hora de actualizar)
    id:            string;
    idEmpresa:     string;
    // Identificador de empresa y codigo de tabulador o grado
    eoGradoTbId:   EoGradoTBID;
    // Nombre o descripcion
    descrip:       string;
    // Codigo alterno -oficial
    codOficial:    string;
    // Atributo para deshabilitar el campo en la lista
    disabledGrado?: boolean;
}

export interface EoGradoTBID {
    idEmpresa: string;
    id:        string;
}

// Interfaces para crear registro
export interface GradoCreate {
    idEmpresa:  string;
    id:         string;
    descrip:    string;
    codOficial: string;
}

// Interfaces para actualizar registro
export type GradoCreateUpdate = Omit<GradoCreate, 'idEmpresa' | 'id'>

export const sueldoList: dropdownType[] = [
    { label: 'Mensual', value: 'Mensual' },
    { label: 'Diario',  value: 'Diario'  }
]