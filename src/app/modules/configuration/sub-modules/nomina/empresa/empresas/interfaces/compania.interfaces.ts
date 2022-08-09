import { dropdownType } from "src/app/shared/interfaces/typesFiles.interfaces";

export interface SectorEmpresas {
    descripcion: string;
    sectorEmp: string;
}

export const conceptoEconomicoData: dropdownType[] = [
    { label: 'Empresa pública', value: '1', inactive: false },
    { label: 'Empresa privada', value: '0', inactive: false },
    { label: 'Empresa mixta',   value: '2', inactive: false }
];