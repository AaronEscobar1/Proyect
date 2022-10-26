export interface Concepto {
    // Codigo de la Empresa
    idEmpresa:  string;
    // Tipo de Nomina
    idNomina:   string;
    /** BASICO */
        // Codigo de Concepto
        id:         number;
        // Descripcion del Concepto
        descto:     string;
        // Prioridad de ejecucion
        prieje:     number;
        // Numero de la Clausula del Contrato Colectivo
        clausu:     number | null;
        // Funcion (1=Asignacion, 2=Deduccion, 3=Reserva)
        functo:     string;
        // Tipo de calculo a considerar
        tipcal:     number;
        // Clasificacion del tipo o metodo calculo fiscal
        tipfis:     number | null;
        // Rutina de calculo
        rutcal:     string | null;
        // Maneja saldo (0=No, 1=Acumular, 2=Decrementar)
        mansal:     string;
        // Gravable al Impuesto (1=Si)
        graimp:     string;
        // No debe cosiderarse en la impresion (1=Afirmativo)
        noimpr:     string;
        // No debe reflejarse en el neto (1=Afirmativo)
        noneto:     string;
        // Incorporar el concepto en el listado, de nomina, detalle por concepto (1=Si)
        incdet:     string;
        // Se actualiza en el maestro de prestaciones de antiguedad (1=Si)
        abopre:     string;
        // Indicar si el concepto debe considerarse aun cuando el monto sea cero (1=Si)
        montocero:  string;
        // Considerar tope en monto de calculo (1=Si)
        topmon:     string;
        //*** Los decimales del monto calculado debe ser cero (0= NO, 1=Sin redondeo, 2=Con redondeo)
        sindec:     string;
        //*** Concepto al cual se le afecta el saldo
        ctoafe:     number | null;
        //*** Factor de calculo
        faccto:     number;
        //*** Descripcion del concepto o expresion utilizada en el calculo del factor
        desfac:     string | null;
        //*** Indicar si el concepto esta activo (1=Si)
        inactivo:   string;
    /** SALARIO  */
        // Tipo de sueldo a considerar en el calculo (0=No, 1..6=Si)
        tipsue:     string;
        // Promedio a considerar en calculo
        promCodpro: string | null;
        // Cantidad de salarios miminos a considerar en el calculo
        salmin:     number;
        // Considerar sueldo sustituto (0=No, 1..6=Si)
        sussue:     string;
        // Promedio a sustituir por el sueldo de calculo
        promProsus: string | null;
        // Cantidad de salarios miminos sustituto a considerar en el calculo
        salmis:     number;
        // Rutina de calculo para condicionar la sustitucion de sueldo
        rutsus:     string | null;
        // Considerar sueldo tope (1=Si)
        topsue:     string;

    /** TODO: VALOR  */
    /** TODO: FACTOR  */
    /** TODO: CANTIDAD  */
    /** TODO: LIMITE */
    /** TODO: PROCESAR  */
    /** TODO: VACACION */
    /** TODO: MISCELANEA */
    /** TODO: OTROS */

    // Valor o monto fijo a considerar en el calculo
    valcto:     number;
    // Tipo de Sueldo para considerar el valor segun escala (0..6)
    sueval:     string;
    // Promedio, sueldo, para buscar el valor en escala de sueldos
    promProval: string | null;
    // El valor se encuentra segun tiempo de servicio o grupo (0=No, 1=Tiempo, 2=Grupo)
    serval:     string;
    // Considerar el valor por mes (1=Si)
    valmes:     string;
    // Tipo de Sueldo para considerar el factor segun escala (0..6)
    suefac:     string;
    // Promedio, sueldo, para buscar el factor en escala de sueldo
    promProfac: null;
    // El factor se encuentra segun tiempo de servicio o grupo (0=No, 1=Tiempo, 2=Grupo)
    serfac:     string;
    // Considerar el factor por mes (1=Si)
    facmes:     string;
    // Cantidad a considerar en el calculo
    cancto:     number;
    // Tipo de sueldo para considerar la cantidad segun escala (0..6)
    suecan:     string;
    // Promedio, sueldo, para buscar la cantidada en escala de sueldos
    promProca1: string | null;
    // La cantidad se encuentra segun tiempo de servicio o grupo (0=No, 1=Tiempo, 2=Grupo)
    sercan:     string;
    // Promedio para considerar la cantidad de calculo
    promProcan: string | null;
    // Considerar la cantidad por mes (1=Si)
    canmes:     string;
    // Cantidad segun los dias en el periodo (0=No, 1..7=Si)
    candia:     number;
    // Considerar limite (0=No, 1=Generar, 2=Suspender)
    conlim:     string;
    // Cantidad limite, desde
    canlid:     number;
    // Cantidad limite, hasta
    canlih:     number;
    // Promedio para considerar la cantidad limite
    promProli1: string | null;
    // Sueldo, diario, para el limite inferior
    liminf:     number;
    // Sueldo, diario, para el limite superior
    limsup:     number;
    // Tipo de Sueldo (0..6) para el limite
    limsue:     string;
    // Promedio para considerar el sueldo limite
    promProlim: null;
    // Se procesa en el periodo o semana 1 (1=Si)
    prope1:     string;
    // Se procesa en el periodo o semana 2 (1=Si)
    prope2:     string;
    // Se procesa en el periodo o semana 3 (1=Si)
    prope3:     string;
    // Se procesa en el periodo o semana 4 (1=Si)
    prope4:     string;
    // Se procesa en el ultimo periodo o semana (1=Si)
    prope5:     string;
    // Autorizacion de proceso (1= Limitado, 2= Ilimitado)
    autpro:     string;
    // Se considera solo en el Maestro de Conceptos Fijos (1=Si)
    profij:     string;
    // Se puede considerar excepcion (1=Si)
    conexc:     string;
    // Procesar solo en aniversario (1=Si)
    proani:     string;
    // Tipo de fecha, Desde, para verificar si el Trabajador cumple aniversario
    tipfea:     number;
    // Generar al ingreso (1=Si)
    fijing:     string;
    // Afecta fecha de regreso (1=Si)
    afereg:     string;
    // Calcular en Post Vacacion (1=Si)
    posvac:     string;
    // Se considera en Control de Vacacion (1=Si)
    conabo:     string;
    // Calculo Salario Abono (0=No, 1..4=Si)
    calabo:     string;
    // Considerar cuotas de salida y regreso (0=No, 1=Salida, 2=Regreso, 3=Ambas)
    concuo:     string;
    // Concepto para generar la provision de Vacacion
    ctopro:     number | null;
    // Se considera en el Diferimiento Contable (1=Si)
    difcon:     string;
    // Considerar en la Distribucion  por Centro de Costo (1=Si)
    discen:     string;
    // TODO: Falta ---> Distribucion contable por Tabla (0=No, 1=Departamento, 2=Cargo, 3=No contabilizar)

    // Cuenta Contable
    ctaco1:     null;
    // Posiciones relativas
    posre1:     null;
    // Cuenta Contable (Contra Partida)
    ctaco2:     string | null;
    // Posiciones relativas para la cuenta contable (Contra Partida)
    posre2:     string | null;
    // Concepto a generar fijo
    ctofij:     number | null;
    // Concepto para generar los intereses
    ctoint:     number | null;
    // Maneja institucion para deposito (1=Si)
    manins:     string;
    // Factor para considerar el monto a depositar o si el mismo se resta o suma
    facaho:     number;
    // Codigo del Concepto para realizar el ahorro o deposito (particular) bancario
    ctoaho:     number | null;
    // Control de suplencia (1=Si)
    unasup:     string;
    // Concepto a generar en caso de suplencia
    ctosup:     number | null;
    // Factor de Impresion
    facimp:     number;
    // Considerar valor tope (1=Si)
    topval:     string;
    // Considerar factor tope (1=Si)
    topfac:     string;
    // Considerar cantidad tope (1=Si)
    topcan:     string;
    // Buscar cantidad, en sueldo escala, por limite superior (1=Si)
    bussuc:     string;
    // Buscar factor, en sueldo escala, por limite superior (1=Si)
    bussuf:     string;
    // Buscar valor, en sueldo escala, por limite superior (1=Si)
    bussuv:     string;
    // Considerar sueldo de calculo para buscar, cantidad, por sueldo escala (1=Si)
    suecac:     string;
    // Considerar sueldo de calculo para buscar, factor, por sueldo escala (1=Si)
    suecaf:     string;
    // Considerar sueldo de calculo para buscar, valor, por sueldo escala (1=Si)
    suecav:     string;
    // Considerar sueldo de calculo para vericar el limte (1=Si)
    suelim:     string;
    // Concepto de intereses de prestaciones al cual se le afecta el saldo
    ctoIntpre:  null;
    // Capitalizar o Pagar Intereses/Prestaciones prestaciones (Capitalizar: 0=No, 1=Anual, 2=Mensual; Pagar: 3=No, 4= Anual, 5=Mensual)
    capint:     string;
    // Se acumula para cheques por trabajador concepto(0=No, 1=Incrementa, 2=Decrementa)
    acuche:     string;
    // Se considera en el proceso retroactivo(0=No, 1=Con recalculo, 2=Sin recalculo)
    cretro:     string;
    // Generar monto en el proceso retroactivo(0=No, 1=Mayor a cero, 2=Diferente a cero)
    gretro:     string;
    // Codigo beneficiario (*FICHA=Trabajador)
    codben:     string | null;
    // Cantidad de salarios miminos para buscar, valor, por escala de sueldo
    salmiv:     string;
    // Cantidad de salarios miminos para buscar, cantidad, por escala de sueldo
    salmic:     string;
    // Cantidad de salarios miminos para buscar, factor, por escala de sueldo
    salmif:     string;
    // Cantidad de salarios miminos indicados en el rango limite (1=Si)
    salmil:     string;
    // Factor que indica en que propocion se afecta el saldo de otro concepto
    facafe:     number;
    // Factor que indica en que propocion se afecta la cuota del concepto a generar fijo
    facfij:     number;
    // Determinar el factor por centro o puesto de trabajo (1=Si)
    faccen:     string;
    // Sustituye cuota de prestamos sobre prestaciones(0=No, 1=Si)
    suscuota:   string;
}

// Interfaces para actualizar registros
export type ConceptoUpdate = Omit<Concepto, 'idEmpresa' | 'idNomina' | 'id'>