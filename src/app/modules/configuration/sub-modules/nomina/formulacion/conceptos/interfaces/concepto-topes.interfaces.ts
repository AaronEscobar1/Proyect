export interface ConceptoTope {
    // Codigo de la Compa?ia
    idEmpresa:  string;
    // Tipo de Nomina
    idNomina:   string;
    // Codigo de Concepto
    idConcepto: number;
    // Tipo de elemento a considerar como tope
    tipele:     string;
    // Tipo o accion del tope a considerar (1=Superior, 2=Diferencia, 3=Diferencia+, 4=Inferior)
    tiptop:     string;
    // Valor o monto fijo a considerar como tope
    valtop:     number;
    // Considerar sueldo como tope (0=No, 1..6=si)
    tipsue:     string;
    // Cantidad de sueldos minimos a considerar como tope
    canmin:     number;
    // Tipo de sueldo para considerar el tope segun escala (0..6)
    sueesc:     string;
    // Codigo del Promedio
    promCodEsc: string | null;
    // Cantidad de salarios miminos para buscar tope por escala de sueldo
    minesc:     string;
    // Busqueda en escala de sueldo por limite superior (1=Si)
    busesc:     string;
    // Codigo del Promedio
    promCodTop: string | null;
    // Factor a considerar como tope
    factop:     number;
    // El tope se considera segun el tiempo de servicio
    tieser:     string;
    /** Campos sobrantes */
    // Sueldo a considerar como tope
    suetop:     number;
    // Cantidad a considerar como tope
    cantop:     number;
    // Factor que afecta en proporcion el tope indicado
    facafe:     number;
    // Monto de calculo a considerar como tope
    montop:     number;
}

// Interfaces para actualizar registros
export type ConceptoTopeUpdate = Omit<ConceptoTope, 'idEmpresa' | 'idNomina' | 'idConcepto' | 'tipele'>;