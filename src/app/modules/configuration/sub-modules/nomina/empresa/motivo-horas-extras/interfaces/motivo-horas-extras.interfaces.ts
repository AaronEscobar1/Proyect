export interface MotivoHoraExtra {
    // Id empresa 
    idEmpresa: string;
    // Código del motivo de horas extraordinarias
    id:        string;
    // Descripión del motivo de horas extraordinarias
    nombre:    string;
}

// Interfaces con los datos necesarios para actualizar
export type MotivoHoraExtraUpdate = Pick<MotivoHoraExtra, 'nombre'>