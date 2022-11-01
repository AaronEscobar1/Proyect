import { Concepto } from '../../../interfaces/concepto.interfaces';

/**
 * Validar si la propiedad a evaluar es = 1, si es = 1 le asignamos true para marcar el check
 * @param data: Concepto
 * @returns Concepto
 */
export const transformObjectToCheck = (data: Concepto): Concepto => {

    // Básica
    (data.noimpr    === '1' || data.noimpr    == true) ? data.noimpr    = true : data.noimpr    = false;
    (data.noneto    === '1' || data.noneto    == true) ? data.noneto    = true : data.noneto    = false;
    (data.incdet    === '1' || data.incdet    == true) ? data.incdet    = true : data.incdet    = false;
    (data.abopre    === '1' || data.abopre    == true) ? data.abopre    = true : data.abopre    = false;
    (data.montocero === '1' || data.montocero == true) ? data.montocero = true : data.montocero = false;
    (data.topmon    === '1' || data.topmon    == true) ? data.topmon    = true : data.topmon    = false;
    (data.inactivo  === '1' || data.inactivo  == true) ? data.inactivo  = true : data.inactivo  = false;
    // Salario
    (data.topsue === '1' || data.topsue == true) ? data.topsue    = true : data.topsue    = false;
    // Valor
    (data.suecav === '1' || data.suecav == true) ? data.suecav = true : data.suecav = false;
    (data.bussuv === '1' || data.bussuv == true) ? data.bussuv = true : data.bussuv = false;
    (data.salmiv === '1' || data.salmiv == true) ? data.salmiv = true : data.salmiv = false;
    (data.valmes === '1' || data.valmes == true) ? data.valmes = true : data.valmes = false;
    (data.topval === '1' || data.topval == true) ? data.topval = true : data.topval = false;
    // Factor
    (data.suecaf === '1' || data.suecaf == true) ? data.suecaf = true : data.suecaf = false;
    (data.bussuf === '1' || data.bussuf == true) ? data.bussuf = true : data.bussuf = false;
    (data.salmif === '1' || data.salmif == true) ? data.salmif = true : data.salmif = false;
    (data.facmes === '1' || data.facmes == true) ? data.facmes = true : data.facmes = false;
    (data.faccen === '1' || data.faccen == true) ? data.faccen = true : data.faccen = false;
    (data.topfac === '1' || data.topfac == true) ? data.topfac = true : data.topfac = false;
    // Cantidad
    (data.suecac === '1' || data.suecac == true) ? data.suecac = true : data.suecac = false;
    (data.bussuc === '1' || data.bussuc == true) ? data.bussuc = true : data.bussuc = false;
    (data.salmic === '1' || data.salmic == true) ? data.salmic = true : data.salmic = false;
    (data.canmes === '1' || data.canmes == true) ? data.canmes = true : data.canmes = false;
    (data.topcan === '1' || data.topcan == true) ? data.topcan = true : data.topcan = false;
    // Limite
    (data.suelim === '1' || data.suelim == true) ? data.suelim = true : data.suelim = false;
    (data.salmil === '1' || data.salmil == true) ? data.salmil = true : data.salmil = false;
    // Procesar
    (data.profij === '1' || data.profij == true) ? data.profij = true : data.profij = false;
    (data.fijing === '1' || data.fijing == true) ? data.fijing = true : data.fijing = false;
    (data.prope1 === '1' || data.prope1 == true) ? data.prope1 = true : data.prope1 = false;
    (data.prope2 === '1' || data.prope2 == true) ? data.prope2 = true : data.prope2 = false;
    (data.prope3 === '1' || data.prope3 == true) ? data.prope3 = true : data.prope3 = false;
    (data.prope4 === '1' || data.prope4 == true) ? data.prope4 = true : data.prope4 = false;
    (data.prope5 === '1' || data.prope5 == true) ? data.prope5 = true : data.prope5 = false;
    (data.proani === '1' || data.proani == true) ? data.proani = true : data.proani = false;
    (data.conexc === '1' || data.conexc == true) ? data.conexc = true : data.conexc = false;
    // Vacación
    (data.afereg === '1' || data.afereg == true) ? data.afereg = true : data.afereg = false;
    (data.conabo === '1' || data.conabo == true) ? data.conabo = true : data.conabo = false;
    (data.posvac === '1' || data.posvac == true) ? data.posvac = true : data.posvac = false;

    return data;
}