import { dropdownType } from "src/app/shared/interfaces/typesFiles.interfaces";

export interface GrupoTrabajo {
    codemp: string;
    desemp: string;
    codtipnom: string;
    destipnom: string;
}

export const dayType: dropdownType[] = [
    { label: 'Diurna',              value: 'Diurna'    },
    { label: 'Nocturna',            value: 'Nocturna'  },
    { label: 'Mixta',               value: 'Mixta'     },
    { label: 'Continua',            value: 'Continua'  },
    { label: 'Rotativa (2 Turnos)', value: 'Rotativa2' },
    { label: 'Rotativa (3 Turnos)', value: 'Rotativa3' }
];