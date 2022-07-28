import { dropdownType } from "src/app/shared/interfaces/typesFiles.interfaces";

export interface GrupoTrabajo {
    codgru:      string;
    desgru:      string;
    labdom:      string;
    tipoJornada: TipoJornada;
}

export interface TipoJornada {
    id:          string;
    descripcion: string;
}

// Objeto para filtrar y mostrar la lista de tipos de jornadas en el formulario
export const tipoJornadaData: dropdownType[] = [
    { label: 'Diurna',              value: 'D' },
    { label: 'Nocturna',            value: 'N' },
    { label: 'Mixta',               value: 'M' },
    { label: 'Continua',            value: 'C' },
    { label: 'Rotativa (2 Turnos)', value: 'R' },
    { label: 'Rotativa (3 Turnos)', value: 'R', inactive: true }
];