import { CargoTabulador } from '../../../interfaces/cargos-tabulador.interfaces';

/**
 * Retorna objetos vacios si la propiedad del objeto es null
 * @param data: InstitucionTercero
 * @returns InstitucionTercero
 */
export const objectEmptyEdit = (data: CargoTabulador): CargoTabulador => {
    if ( !data.tabu01 ) data.tabu01 = { eoGradoTbId: { } };
    if ( !data.tabu02 ) data.tabu02 = { eoGradoTbId: { } };
    if ( !data.tabu03 ) data.tabu03 = { eoGradoTbId: { } };
    if ( !data.tabu04 ) data.tabu04 = { eoGradoTbId: { } };
    if ( !data.tabu05 ) data.tabu05 = { eoGradoTbId: { } };
    if ( !data.tabu06 ) data.tabu06 = { eoGradoTbId: { } };
    if ( !data.tabu07 ) data.tabu07 = { eoGradoTbId: { } };
    if ( !data.tabu08 ) data.tabu08 = { eoGradoTbId: { } };
    if ( !data.tabu09 ) data.tabu09 = { eoGradoTbId: { } };
    if ( !data.tabu10 ) data.tabu10 = { eoGradoTbId: { } };
    if ( !data.tabu11 ) data.tabu11 = { eoGradoTbId: { } };
    if ( !data.tabu12 ) data.tabu12 = { eoGradoTbId: { } };
    return data;
}

/**
 * Deja la propierdad en null si el id del objeto es null
 * @param data: CargoTabulador
 * @returns CargoTabulador
 */
export const mapJsonCargo = (data: CargoTabulador): CargoTabulador => {
    if ( data.tabu01 && data.tabu01.eoGradoTbId.id === null ) data.tabu01 = null;
    if ( data.tabu02 && data.tabu02.eoGradoTbId.id === null ) data.tabu02 = null;
    if ( data.tabu03 && data.tabu03.eoGradoTbId.id === null ) data.tabu03 = null;
    if ( data.tabu04 && data.tabu04.eoGradoTbId.id === null ) data.tabu04 = null;
    if ( data.tabu05 && data.tabu05.eoGradoTbId.id === null ) data.tabu05 = null;
    if ( data.tabu06 && data.tabu06.eoGradoTbId.id === null ) data.tabu06 = null;
    if ( data.tabu07 && data.tabu07.eoGradoTbId.id === null ) data.tabu07 = null;
    if ( data.tabu08 && data.tabu08.eoGradoTbId.id === null ) data.tabu08 = null;
    if ( data.tabu09 && data.tabu09.eoGradoTbId.id === null ) data.tabu09 = null;
    if ( data.tabu10 && data.tabu10.eoGradoTbId.id === null ) data.tabu10 = null;
    if ( data.tabu11 && data.tabu11.eoGradoTbId.id === null ) data.tabu11 = null;
    if ( data.tabu12 && data.tabu12.eoGradoTbId.id === null ) data.tabu12 = null;
    return data;
}

/**
 * Agregar el idEmpresa al objeto eoGradoTbId.idEmpresa
 * @param data: CargoTabulador
 * @returns CargoTabulador
 */
export const addIdEmpresaToObject = (data: CargoTabulador, idEmpresa: string): CargoTabulador => {
    if ( data.tabu01 && data.tabu01.eoGradoTbId ) data.tabu01.eoGradoTbId.idEmpresa = idEmpresa;
    if ( data.tabu02 && data.tabu02.eoGradoTbId ) data.tabu02.eoGradoTbId.idEmpresa = idEmpresa;
    if ( data.tabu03 && data.tabu03.eoGradoTbId ) data.tabu03.eoGradoTbId.idEmpresa = idEmpresa;
    if ( data.tabu04 && data.tabu04.eoGradoTbId ) data.tabu04.eoGradoTbId.idEmpresa = idEmpresa;
    if ( data.tabu05 && data.tabu05.eoGradoTbId ) data.tabu05.eoGradoTbId.idEmpresa = idEmpresa;
    if ( data.tabu06 && data.tabu06.eoGradoTbId ) data.tabu06.eoGradoTbId.idEmpresa = idEmpresa;
    if ( data.tabu07 && data.tabu07.eoGradoTbId ) data.tabu07.eoGradoTbId.idEmpresa = idEmpresa;
    if ( data.tabu08 && data.tabu08.eoGradoTbId ) data.tabu08.eoGradoTbId.idEmpresa = idEmpresa;
    if ( data.tabu09 && data.tabu09.eoGradoTbId ) data.tabu09.eoGradoTbId.idEmpresa = idEmpresa;
    if ( data.tabu10 && data.tabu10.eoGradoTbId ) data.tabu10.eoGradoTbId.idEmpresa = idEmpresa;
    if ( data.tabu11 && data.tabu11.eoGradoTbId ) data.tabu11.eoGradoTbId.idEmpresa = idEmpresa;
    if ( data.tabu12 && data.tabu12.eoGradoTbId ) data.tabu12.eoGradoTbId.idEmpresa = idEmpresa;
    return data;
}

/**
 * Validar que se seleccione ambos campos tabulador y mes
 * @param data: CargoTabulador
 * @param index: number
 * @returns boolean
 */
export const validarCampos = ( data: any, index: number): boolean => {
    const indice = index < 10 ? `0${index}` : index;
    const tabu = data[`tabu${indice}`];
    const mest = data[`mest${indice}`];
    if ( tabu && !mest || !tabu && mest ) {
        return true;
    }
    return false;
}