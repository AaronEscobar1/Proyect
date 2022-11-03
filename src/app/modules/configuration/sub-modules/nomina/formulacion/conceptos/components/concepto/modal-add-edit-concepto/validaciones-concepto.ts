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
  // Miscelánea
  (data.suscuota === '1' || data.suscuota == true) ? data.suscuota = true : data.suscuota = false;
  (data.manins   === '1' || data.manins == true)   ? data.manins   = true : data.manins   = false;
  (data.unasup   === '1' || data.unasup == true)   ? data.unasup   = true : data.unasup   = false;

  return data;
}

/**
 * Si el check de estos campos esta seleccionado, es decir esta en true se coloca el valor 1, de lo contrario 0
 * @param data Concepto
 * @returns Concepto
 */
export const trasnformCheckboxTrueOrFalseToString = (data: Concepto): Concepto => {
    
  // Basico
  data.noimpr    = data.noimpr    ? '1' : '0';
  data.noneto    = data.noneto    ? '1' : '0';
  data.incdet    = data.incdet    ? '1' : '0';
  data.abopre    = data.abopre    ? '1' : '0';
  data.montocero = data.montocero ? '1' : '0';
  data.topmon    = data.topmon    ? '1' : '0';
  data.inactivo  = data.inactivo  ? '1' : '0';
  // Salario
  data.topsue    = data.topsue    ? '1' : '0';
  // Valor
  data.suecav    = data.suecav    ? '1' : '0';
  data.bussuv    = data.bussuv    ? '1' : '0';
  data.salmiv    = data.salmiv    ? '1' : '0';
  data.valmes    = data.valmes    ? '1' : '0';
  data.topval    = data.topval    ? '1' : '0';
  // Factor
  data.suecaf    = data.suecaf    ? '1' : '0';
  data.bussuf    = data.bussuf    ? '1' : '0';
  data.salmif    = data.salmif    ? '1' : '0';
  data.facmes    = data.facmes    ? '1' : '0';
  data.faccen    = data.faccen    ? '1' : '0';
  data.topfac    = data.topfac    ? '1' : '0';
  // Cantidad
  data.suecac    = data.suecac    ? '1' : '0';
  data.bussuc    = data.bussuc    ? '1' : '0';
  data.salmic    = data.salmic    ? '1' : '0';
  data.canmes    = data.canmes    ? '1' : '0';
  data.topcan    = data.topcan    ? '1' : '0';
  // Limite
  data.suelim    = data.suelim    ? '1' : '0';
  data.salmil    = data.salmil    ? '1' : '0';
  // Procesar
  data.profij    = data.profij    ? '1' : '0';
  data.fijing    = data.fijing    ? '1' : '0';
  data.prope1    = data.prope1    ? '1' : '0';
  data.prope2    = data.prope2    ? '1' : '0';
  data.prope3    = data.prope3    ? '1' : '0';
  data.prope4    = data.prope4    ? '1' : '0';
  data.prope5    = data.prope5    ? '1' : '0';
  data.proani    = data.proani    ? '1' : '0';
  data.conexc    = data.conexc    ? '1' : '0';
  // Vacación
  data.afereg    = data.afereg    ? '1' : '0';
  data.conabo    = data.conabo    ? '1' : '0';
  data.posvac    = data.posvac    ? '1' : '0';
  // Miscelanea
  data.suscuota  = data.suscuota  ? '1' : '0';
  data.manins    = data.manins    ? '1' : '0';
  data.unasup    = data.unasup    ? '1' : '0';

  return data;
}

/**
 * Validar que los campos que no permiten nulos, si en el formulario se dejan vacios se envien con valor 0 por defecto
 * @param data Concepto
 * @returns Concepto
 */
export const fieldsNoNullsWithValueCero = (data: Concepto): Concepto => {

  /** BASICO */
    if ( data.prieje == null || data.prieje == '' ) data.prieje = 0;   // Validar si el campo (prioridad) esta en null colocarle un 0
    if ( data.facafe == null || data.facafe == '' ) data.facafe = 0;   // Validar si el campo (factor) esta en null colocarle un 0
    /** SALARIO */
    if ( data.salmin == null ) data.salmin = 0;                        // Validar si el campo (minimo) estan en null colocarle un 0
    if ( data.salmis == null ) data.salmis = 0;                        // Validar si el campo (minimo) estan en null colocarle un 0
    /** VALOR */
    if ( data.valcto == null || data.valcto == '' ) data.valcto = 0;   // Validar si el campo (valor) esta en null colocarle un 0
    /** FACTOR */
    if ( data.faccto == null || data.faccto == '' ) data.faccto = 0;   // Validar si el campo (factor) estan en null colocarle un 0
    /** CANTIDAD */
    if ( data.cancto == null || data.cancto == '' ) data.cancto = 0;   // Validar si el campo (cantidad) esta en null colocarle un 0
  /** LIMITE */
    if ( data.canlid == null || data.canlid == '' ) data.canlid = 0;   // Validar si el campo (cantidad desde) esta en null colocarle un 0
    if ( data.canlih == null || data.canlih == '' ) data.canlih = 0;   // Validar si el campo (cantidad hasta) esta en null colocarle un 0
    if ( data.liminf == null || data.liminf == '' ) data.liminf = 0;   // Validar si el campo (sueldo desde) esta en null colocarle un 0
    if ( data.limsup == null || data.limsup == '' ) data.limsup = 0;   // Validar si el campo (sueldo hasta) esta en null colocarle un 0
    if ( data.limsue == null || data.limsue == '' ) data.limsue = '0'; // Validar que el campo no quede null
  /** MISCELANEA */
    if ( data.facfij == null || data.facfij == '' ) data.facfij = 0;   // Validar si el campo (factor generar) esta en null colocarle un 0
    if ( data.facaho == null || data.facaho == '' ) data.facaho = 0;   // Validar si el campo (factor deposito) esta en null colocarle un 0
  /** CAMPOS SOBRANTES */
    if ( data.difcon == null || data.difcon == '') data.difcon = '0';  // Colocar por defecto el valor 0
    if ( data.discen == null || data.discen == '') data.discen = '0';  // Colocar por defecto el valor 0

  return data;
}