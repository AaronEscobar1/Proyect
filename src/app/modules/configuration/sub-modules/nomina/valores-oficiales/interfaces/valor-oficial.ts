import { ValorOficial } from './valor-oficial.interfaces';

export const valorOficialData: ValorOficial[] = [
    {
        codvlo: '1',
        tipevlo: 'Valor unidad tributaria',
        datevlo: new Date('2021/10/19'),
        valor: '32414'
    },
    {
        codvlo: '2', 
        tipevlo: 'Rebaja personal',
        datevlo: new Date('2020/08/09'),
        valor: '51421'
    },
    {
        codvlo: '3',
        tipevlo: 'Rebaja familiar',
        datevlo: new Date('2005/03/29'),
        valor: '5623423'
    }
]