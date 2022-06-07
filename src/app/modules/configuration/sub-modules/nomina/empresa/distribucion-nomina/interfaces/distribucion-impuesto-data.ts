import { DistribucionNominaEmpresa, EmpresaNomina } from './distribucion-impuesto.interfaces';

export const empresasData: EmpresaNomina[] = [
    {
        codemp: '0001',
        desemp: 'Preparametrizado' 
    },
    {
        codemp: '0031',
        desemp: 'Industria farmaceutica Nacional, C.A' 
    },
    {
        codemp: '0033',
        desemp: 'Infocent LATAM' 
    },
    {
        codemp: '1000',
        desemp: 'OUTSOURCING NOMINAS' 
    }
];

export const distribucionNominaData: DistribucionNominaEmpresa[] = [
    {
        coddis: '1',
        desdis: 'Prueba1',
        ubidis: 'Caracas'
    },
    {
        coddis: '2',
        desdis: 'Prueba2',
        ubidis: 'Valencia'
    },
    {
        coddis: '3',
        desdis: 'Prueba3',
        ubidis: 'Miranda'
    }
]