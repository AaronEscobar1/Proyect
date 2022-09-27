export interface CargoTabulador {
    // Codigo de cargo de tabulador e idEmpresa (Atributo para rellenar en el formulario para poder crear un registro)
    idEmpresa:   string;
    id:          string;
    // Id de empresa e Id del tabulador
    nmCargoTabuladorTbId: TBID;
    // Tabuladores 01
    tabu01:               Tabu;
    // Tabuladores 02
    tabu02:               Tabu;
    // Tabuladores 03
    tabu03:               Tabu;
    // Tabuladores 04 
    tabu04:               Tabu;
    // Tabuladores 05
    tabu05:               Tabu;
    // Tabuladores 06
    tabu06:               Tabu;
    // Tabuladores 07
    tabu07:               Tabu;
    // Tabuladores 08
    tabu08:               Tabu;
    // Tabuladores 09
    tabu09:               Tabu;
    // Tabuladores 10 
    tabu10:               Tabu;
    // Tabuladores 11
    tabu11:               Tabu;
    // Tabuladores 12
    tabu12:               Tabu;
    // Meses de Servicios Asociado al Tabulador 1
    mest01:               number;
    // Meses de Servicio Asociado al Tabulador 2
    mest02:               number;
    // Meses de Servicio Asociado al Tabulador 3
    mest03:               number;
    // Meses de Servicio Asociado al Tabulador 4
    mest04:               number;
    // Meses de Servicio Asociado al Tabulador 5
    mest05:               number;
    // Meses de Servicio Asociado al Tabulador 6
    mest06:               number;
    // Meses de Servicio Asociado al Tabulador 7
    mest07:               number;
    // Meses de Servicio Asociado al Tabulador 8
    mest08:               number;
    // Meses de Servicio Asociado al Tabulador 9
    mest09:               number;
    // Meses de Servicio Asociado al Tabulador 10
    mest10:               number;
    // Meses de Servicio Asociado al Tabulador 11
    mest11:               number;
    // Meses de Servicio Asociado al Tabulador 12
    mest12:               number;
    
}

export interface TBID {
    idEmpresa: string;
    id:        string;
}

export interface Tabu {
    eoGradoTbId: TBID;
    descrip:     string;
    codOficial:  string;
}
