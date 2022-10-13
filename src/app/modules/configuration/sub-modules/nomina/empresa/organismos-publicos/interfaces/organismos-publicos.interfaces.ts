export interface OrganismoPublico {
    // Codigo del Organismo o institucion publica 
    codorg: string;
    // Nombre del Organismo o institucion publica 
    nomorg: string;
    // Siglas del Organismo o institucion publica 
    siglas: string;
}

// Interfaz para actualizar registros
export type OrganismoPublicoUpdate = Omit<OrganismoPublico, 'codorg'>;