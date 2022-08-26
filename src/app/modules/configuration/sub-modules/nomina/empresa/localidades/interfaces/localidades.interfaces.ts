export interface Localidad {
    // Codigo de localidad
    codloc:       string;   
    // Descripcion (1ra linea)
    deslo1:       string;
    // Direccion (1ra linea)
    direc1:       string;
    // Direccion (2da linea)
    direc2:       string;
    // Parroquia
    codParroquia: string;
    // Codigo del Municipio
    codMunicipio: string;
    // Codigo de la Entidad Federal
    codEntidad:   string;
    // Codigo de Pais
    codPais:      string;
    // Actividad economica
    acteco:       string;
    // Capital
    caploc:       number;
    // Fecha de fundacion
    fecfun:       Date;
    // Numero de S.S.O
    nrosso:       string;
    // Nuumero de Orden
    nroord:       string;
    // Numero de registro en el Ministerio del Trabajo
    regmin:       string;
    // Nombre del propietario o due?o
    proloc:       string;
    // Siglas de la Localidad
    siglas:       string;
    // Numero de R.I.F.
    numrif:       string;
    // Numero de N.I.T.
    numnit:       string;
    // Numero de telefono
    numtlf:       string;
    // Numero de F.A.X.
    numfax:       string;
    // Direccion de correo electronico (e-mail)
    eMail:        string;
    // Numero horas a trabajar en la semana
    horsem:       number;
    // Numero de turnos diarios que se trabaja
    turnos:       number;
    // Nombre del informante
    nominf:       string;
    // Cargo del informante
    cgoinf:       string;
    // Numero de identificacion del informante
    ideinf:       string;
    // Numero de identificacion laboral asignado por MINTRA -venezuela
    nilcia:       string;
    // Numero de identificacion del propietario
    idepro:       string;
    // Codigo postal
    codpos:       string;
    // Nacionalidad del informante
    nacional:     string;
    // Fecha de inscripci¿n en el Seguro Social
    fecsso:       Date;
    // Riesgo del Seguro Social
    riesso:       number;
    // Regimen del Seguro Social
    regsso:       string;
}

// Interfaces para actualizar registros
export type LocalidadUpdate = Omit<Localidad, 'codloc'>;
