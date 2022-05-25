export interface Empresa {
    codemp: string;
    desemp: string;
}

export interface EmpresaFuncionario {
    // funcionario
    nombre: string;
    nacionalidad: string;
    tipIden: number;
    cedula: string;

    // contribuyente
    tipAgen: number;
    numeroContribuyente: string;
    otrosDatos: string;
}