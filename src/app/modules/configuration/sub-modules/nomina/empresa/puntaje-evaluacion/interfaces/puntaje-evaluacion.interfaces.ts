export interface PuntajeEvaluacion {
    // Codigo de la empresa
    idEmpresa: string;
    // Tipo de Nomina
    idNomina:  string;
    // Codigo del puntaje de evaluacion (Not NULL)
    codpun:    string;
    // Descripcion del puntaje de evaluacion (Not NULL)
    despun:    string;
    // Debe considerarse en aumento (1=Si) (Not NULL)
    aumpun:    string;
}

// Interfaces con los datos necesarios para actualizar
export type PuntajeEvaluacionUpdate = Pick<PuntajeEvaluacion, 'despun' | 'aumpun'>