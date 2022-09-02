// Paises
export interface Countrys {
    nombre: string;
    codigo: string;
}

// Entidades federales
export interface FederalEntities {
    nombre: string;
    codPais: string;
    codEntidad: string;
}

// Municipios
export interface Municipality {
    nombre:       string;
    codPais:      string;
    codEntidad:   string;
    codMunicipio: string;
}

// Parroquias
export interface Parishes {
    nombre:       string;
    codPais:      string;
    codEntidad:   string;
    codMunicipio: string;
    codParroquia: string;
}

export interface ObjectEventChange {
    originalEvent: PointerEvent | any;
    value: any;
}

export interface Dropdown {
    selectedOption: {
        nombre: string
    };
}

// Objeto para mostrar pais, entidad, municipio o parroquia en el campo deshabilitado
export interface DireccionDisabled {
    pais?:      string;
    entidad?:   string;
    municipio?: string;
    parroquia?: string;
}