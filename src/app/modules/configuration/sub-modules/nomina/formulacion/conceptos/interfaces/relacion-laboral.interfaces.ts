export interface RelacionLaboral {
    fIngreso:             Date;
    fCorporacion:         Date;
    fAjustada1:           Date;
    fAjustada2:           Date;
    fAjustada3:           Date;
    nroRif:               null;
    nroSso:               null;
    fRetiro:              Date;
    fContrato:            null;
    nroTarjeta:           null;
    fGraduacion:          null;
    anoAprobado:          null;
    iniGrado:             null;
    aumentoGrado:         string;
    fichaJefe:            null;
    idCategoria1:         null;
    idCategoria3:         null;
    idCategoria2:         null;
    idCentroMed:          null;
    idFiniquito:          IDFiniquito;
    idNivelEdu:           IDNivelEdu;
    idProfesion:          IDProfesion;
    idSindicato:          null;
    eoHorarioTrabajoDet1: null;
    eoHorarioTrabajoDet2: null;
    eoHorarioTrabajoDet3: null;
    eoHorarioTrabajoDet4: null;
    eoHorarioTrabajoDet5: null;
    nmLocalidad:          NmLocalidad;
    eoGrado:              EoGrado;
    persona:              Persona;
    idEmpresa:            string;
    ficha:                string;
}

export interface EoGrado {
    descrip:    string;
    codOficial: string;
    idEmpresa:  string;
    id:         string;
}

export interface IDFiniquito {
    desde1: string;
    desde2: string;
    impliq: string;
    classo: string;
    coddes: string;
}

export interface IDNivelEdu {
    desniv: string;
    codley: null;
    codniv: string;
}

export interface IDProfesion {
    desprf: string;
    codprf: string;
}

export interface NmLocalidad {
    deslo1:       string;
    direc1:       string;
    direc2:       string;
    caploc:       number;
    fecfun:       Date;
    nrosso:       string;
    nroord:       string;
    regmin:       string;
    proloc:       string;
    siglas:       string;
    numrif:       string;
    numnit:       string;
    numtlf:       string;
    numfax:       string;
    eMail:        string;
    horsem:       number;
    turnos:       number;
    nominf:       string;
    cgoinf:       string;
    ideinf:       string;
    nilcia:       string;
    idepro:       string;
    codpos:       string;
    nacional:     string;
    fecsso:       Date;
    riesso:       number;
    regsso:       string;
    acteco:       string;
    codPais:      string;
    codEntidad:   string;
    codMunicipio: string;
    codParroquia: string;
    codloc:       string;
    idEmpresa:    string;
}

export interface Persona {
    nombre1:           string;
    nombre2:           string;
    apellido1:         string;
    apellido2:         string;
    nacional:          string;
    numIden:           string;
    pasaporte:         null;
    fechaNa:           Date;
    ciudadNa:          string;
    sexo:              string;
    zurdo:             number;
    tipoSangre:        null;
    factorRh:          null;
    direccion:         string;
    ciudad:            string;
    codPostal:         null;
    telefono1:         string;
    telefono2:         null;
    fax:               null;
    celular:           null;
    eMail1:            string;
    eMail2:            null;
    inRelTrab:         string;
    usrcre:            string;
    feccre:            null;
    usract:            string;
    fecact:            null;
    nombreFoto:        null;
    enfermedadocu:     string;
    etniaindigena:     string;
    discauditiva:      string;
    discvisual:        string;
    discintelectual:   string;
    discmental:        string;
    discmusculoesq:    string;
    discaccidente:     string;
    discotra:          string;
    descridisca:       null;
    edoCivil:          EDOCivil;
    idTipoIden:        IDTipoIden;
    spiPaisEntidadFed: SPIPaisEntidadFed;
    spiParroquia:      SPIParroquia;
    id:                number;
}

export interface EDOCivil {
    nombre:    string;
    codigoLey: null;
    id:        string;
}

export interface IDTipoIden {
    descrip: string;
    id:      string;
}

export interface SPIPaisEntidadFed {
    nombre:     string;
    codPais:    string;
    codEntidad: string;
}

export interface SPIParroquia {
    nombre:       string;
    codPais:      string;
    codEntidad:   string;
    codMunicipio: string;
    codParroquia: string;
}
