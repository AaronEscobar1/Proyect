import { dropdownType } from "src/app/shared/interfaces/typesFiles.interfaces";

export interface OtrosDatosEmpresa {
    ciacon    : null;
    nomfun    : string;
    cedfun    : string;
    nacfun    : string;
    nrocon    : null;
    tipage    : string;
    datcon    : null;
    claapo    : string;
    forpre    : string;
    tipemp    : string;
    pgmctb    : null;
    tideIdefun: string;
    idEmpresa : string;
}

export const identificatioType: dropdownType[] = [
    { label: 'Cedula',    value: '1' },
    { label: 'Pasaporte', value: '2' },
    { label: 'Carnet',    value: '3' }
];

export const agentType: dropdownType[] = [
    { label: 'Persona Natural',     value: '1' },
    { label: 'Persona Jurídica',    value: '2' },
    { label: 'Dependencia oficial', value: '3' }
];