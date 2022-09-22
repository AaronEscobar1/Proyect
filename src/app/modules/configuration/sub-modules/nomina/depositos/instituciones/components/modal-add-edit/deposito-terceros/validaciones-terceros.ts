import { InstitucionTercero } from '../../../interfaces/instituciones-terceros.interfaces';

/**
 * Retorna objetos vacios si la propiedad del objeto es null
 * @param data: InstitucionTercero
 * @returns InstitucionTercero
 */
export const objectEmptyEdit = (data: InstitucionTercero): InstitucionTercero => {
    if ( !data.bancoEmisorObj       ) data.bancoEmisorObj       = { };
    if ( !data.tipoPagoEmisorObj    ) data.tipoPagoEmisorObj    = { };
    if ( !data.pagoFormaEmisorObj   ) data.pagoFormaEmisorObj   = { };
    if ( !data.monedaEmisorObj      ) data.monedaEmisorObj      = { };
    if ( !data.bancoReceptorObj     ) data.bancoReceptorObj     = { };
    if ( !data.tipoPagoReceptorObj  ) data.tipoPagoReceptorObj  = { };
    if ( !data.pagoFormaReceptorObj ) data.pagoFormaReceptorObj = { };
    if ( !data.monedaReceptorObj    ) data.monedaReceptorObj    = { };
    if ( !data.tipoDocumentoObj     ) data.tipoDocumentoObj     = { };
    if ( !data.tipoTransaccionObj   ) data.tipoTransaccionObj   = { };
    return data;
}

/**
 * Elimina el objeto si la propiedad del objeto es null
 * @param data: InstitucionTercero
 * @returns InstitucionTercero
 */
export const validateJsonCreate = (data: InstitucionTercero): InstitucionTercero => {
    if ( data.bancoEmisorObj?.codBanco        === null ) delete data.bancoEmisorObj;
    if ( data.tipoPagoEmisorObj?.tipoPago     === null ) delete data.tipoPagoEmisorObj;
    if ( data.pagoFormaEmisorObj?.codpag      === null ) delete data.pagoFormaEmisorObj;
    if ( data.monedaEmisorObj?.id             === null ) delete data.monedaEmisorObj;
    if ( data.bancoReceptorObj?.codBanco      === null ) delete data.bancoReceptorObj;
    if ( data.tipoPagoReceptorObj?.tipoPago   === null ) delete data.tipoPagoReceptorObj;
    if ( data.pagoFormaReceptorObj?.codpag    === null ) delete data.pagoFormaReceptorObj;
    if ( data.monedaReceptorObj?.id           === null ) delete data.monedaReceptorObj;
    if ( data.tipoDocumentoObj?.tipoDocu      === null ) delete data.tipoDocumentoObj;
    if ( data.tipoTransaccionObj?.tipoTransac === null ) delete data.tipoTransaccionObj;
    return data;
}