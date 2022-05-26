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

export interface dropdownType {
    label: string;
    value: string;
}

export const identificatioType: dropdownType[] = [
    { label: '1', value: 'Cedula'    },
    { label: '2', value: 'Pasaporte' },
    { label: '3', value: 'Carnet'    }
];

export const agentType: dropdownType[] = [
    { label: '1', value: 'Persona Natural'     },
    { label: '2', value: 'Persona Jurídica'    },
    { label: '3', value: 'Dependencia oficial' }
];