import { dropdownType } from "src/app/shared/interfaces/typesFiles.interfaces";

export interface GrupoTrabajo {
    idNomina:  string;
    idEmpresa: string;
    codgru:    string;
    desgru:    string;
    tipjorn:   string;
    labdom:    string;
}

// Objeto para filtrar y mostrar la lista de tipos de jornadas en el formulario
export const tipoJornadaData: dropdownType[] = [
    { label: 'Diurna',              value: 'D' },
    { label: 'Nocturna',            value: 'N' },
    { label: 'Mixta',               value: 'M' },
    { label: 'Continua',            value: 'C' },
    { label: 'Rotativa (2 Turnos)', value: 'R' },
    { label: 'Rotativa (3 Turnos)', value: 'R' }
];