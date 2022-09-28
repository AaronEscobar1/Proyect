export interface CargoTabulador {
    // Codigo de cargo de tabulador e idEmpresa (Atributo para rellenar en el formulario para poder crear un registro)
    idEmpresa:   string;
    id:          string;
    // Id de empresa e Id del tabulador
    nmCargoTabuladorTbId: TBID;
    // Tabuladores 01
    tabu01:               Tabu | null;
    // Tabuladores 02
    tabu02:               Tabu | null;
    // Tabuladores 03
    tabu03:               Tabu | null;
    // Tabuladores 04 
    tabu04:               Tabu | null;
    // Tabuladores 05
    tabu05:               Tabu | null;
    // Tabuladores 06
    tabu06:               Tabu | null;
    // Tabuladores 07
    tabu07:               Tabu | null;
    // Tabuladores 08
    tabu08:               Tabu | null;
    // Tabuladores 09
    tabu09:               Tabu | null;
    // Tabuladores 10 
    tabu10:               Tabu | null;
    // Tabuladores 11
    tabu11:               Tabu | null;
    // Tabuladores 12
    tabu12:               Tabu | null;
    // Meses de Servicios Asociado al Tabulador 1
    mest01:               number | null;
    // Meses de Servicio Asociado al Tabulador 2
    mest02:               number | null;
    // Meses de Servicio Asociado al Tabulador 3
    mest03:               number | null;
    // Meses de Servicio Asociado al Tabulador 4
    mest04:               number | null;
    // Meses de Servicio Asociado al Tabulador 5
    mest05:               number | null;
    // Meses de Servicio Asociado al Tabulador 6
    mest06:               number | null;
    // Meses de Servicio Asociado al Tabulador 7
    mest07:               number | null;
    // Meses de Servicio Asociado al Tabulador 8
    mest08:               number | null;
    // Meses de Servicio Asociado al Tabulador 9
    mest09:               number | null;
    // Meses de Servicio Asociado al Tabulador 10
    mest10:               number | null;
    // Meses de Servicio Asociado al Tabulador 11
    mest11:               number | null;
    // Meses de Servicio Asociado al Tabulador 12
    mest12:               number | null;
    
}

export interface TBID {
    idEmpresa?: string;
    id?:        string;
}

export interface Tabu {
    eoGradoTbId: TBID;
    descrip?:     string;
    codOficial?:  string;
}

// Interfaces para actualizar registros
export type CargoTabuladorUpdate = Omit<CargoTabulador, 'idEmpresa' | 'id' | 'nmCargoTabuladorTbId'>