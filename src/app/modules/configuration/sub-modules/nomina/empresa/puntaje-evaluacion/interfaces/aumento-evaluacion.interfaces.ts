export interface AumentoEvaluacion {
    // Codigo de la empresa
    idEmpresa:    string;
    // Tipo de Nomina
    idNomina:     string;
    // Codigo del puntaje de evaluacion
    idEvaluacion: string;
    // Codigo de Concepto
    idConcepto:   number;
    // Monto a considerar en el aumento por evaluación
    moncto:       number;
    // Cantidad a considerar en el aumento por evaluación
    cancto:       number;
    // Factor a considerar en el aumento por evaluación
    facsue:       number;
    // Sueldo a considerar en el aumento por evaluación
    incsue:       number;
}

// Interfaces para actualizar registros
export type AumentoEvaluacionUpdate = Omit<AumentoEvaluacion, 'idEmpresa' | 'idNomina' | 'idEvaluacion' | 'idConcepto'>;