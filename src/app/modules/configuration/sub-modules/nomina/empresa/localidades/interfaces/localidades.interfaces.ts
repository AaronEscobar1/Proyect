export interface Localidad {
  /**** Básica ****/
    // Codigo de localidad
    codloc:       string;   
    // Descripcion (1ra linea)
    deslo1:       string;
    // Siglas de la Localidad
    siglas:       string;
    // Numero de R.I.F.
    numrif:       string;
    // Numero de N.I.T.
    numnit:       string;
    // Nuumero de Orden
    nroord:       string;
    // Numero de turnos diarios que se trabaja
    turnos:       number;
    // Numero de identificacion laboral asignado por MINTRA -venezuela
    nilcia:       string;
    // Numero de S.S.O
    nrosso:       string;
    // Riesgo del Seguro Social
    riesso:       number;
    // Fecha de inscripci¿n en el Seguro Social
    fecsso:       Date;
    // Regimen del Seguro Social
    regsso:       string;
    // Numero de registro en el Ministerio del Trabajo
    regmin:       string;
    // Numero horas a trabajar en la semana
    horsem:       number;
      /* Informante */
        // Nombre del informante
        nominf:       string;
        // Cargo del informante
        cgoinf:       string;
        // Numero de identificacion del informante
        ideinf:       string;
        // Nacionalidad del informante
        nacional:     string;
  /**** Dirección ****/
    // Direccion (1ra linea)
    direc1:       string;
    // Direccion (2da linea)
    direc2:       string;
    // Codigo de Pais
    codPais:      string;
    // Codigo de la Entidad Federal
    codEntidad:   string;
    // Numero de telefono
    numtlf:       string;
    // Numero de F.A.X.
    numfax:       string;
    // Direccion de correo electronico (e-mail)
    eMail:        string | null;
    // Codigo postal
    codpos:       string;
  /**** Ubicación ****/
    // Código del Municipio
    codMunicipio: string;
    // Parroquia
    codParroquia: string;
  /**** Actividad economica ****/
    // codigo actividad economica
    acteco:       string;  
    // Capital
    caploc:       number;
    // Fecha de fundacion
    fecfun:       Date;
    // Nombre del propietario o due?o
    proloc:       string;   
    // Numero de identificacion del propietario
    idepro:       string;   
}

// Interfaces para actualizar registros
export type LocalidadUpdate = Omit<Localidad, 'codloc'>;
