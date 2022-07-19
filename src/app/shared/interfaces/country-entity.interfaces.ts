export interface Countrys {
    nombre: string;
    codigo: string;
}

export interface FederalEntities {
    nombre: string;
    codPais: string;
    codEntidad: string;
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
