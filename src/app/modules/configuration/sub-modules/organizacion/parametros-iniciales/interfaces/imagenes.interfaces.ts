import { dropdownType } from "src/app/shared/interfaces/typesFiles.interfaces";

export interface Imagen {
    // Identificador de empresa
    empresaId:         string;
    // Tipo de imagen
    tipo:              string;
    // Nombre o descripcion del uso de la imagen
    nombre:            string;
    // Nombre del archivo
    fileName:          string;
    // Contentido del archivo
    fileContentBase64: string;
    // Tama?o del archivo
    fileSize:          string;
    // Tipo de archivo
    fileType:          string;
}

// Interfaces para actualizar registros
export type ImagenUpdate = Omit<Imagen, 'empresaId' | 'tipo'>;

export const TipoImagenData: dropdownType[] = [
    { label: 'Logos recibos o planillas', value: 'logos'  },
    { label: 'Página de inicio',          value: 'pagina' }
];

// Interfaz para obtener los datos de la imagen
export interface ImageConvert {
    fileName:          string;
    fileContentBase64: string;
    fileSize:          string;
    fileType:          string;
}