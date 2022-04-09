import { Procesos } from './procesos.interfaces';

export const procesosData: Procesos[] = [
    {
        codpro: '01',
        despro: 'proceso 1',
        desadic: 'descripcion proceso 1',
        definitivo: false,
        codsec: '1',
        dessec: 'subproceso 1',
        fecact: new Date(),
        feccre: new Date(),
        usract: '',
        usrcre: ''
    },
    {
        codpro: '02',
        despro: 'proceso 2',
        desadic: 'descripcion proceso 2',
        definitivo: true,
        codsec: '2',
        dessec: 'subproceso 2',
        fecact: new Date(),
        feccre: new Date(),
        usract: '',
        usrcre: ''
    },
    {
        codpro: '03',
        despro: 'proceso 3',
        desadic: 'descripcion proceso 3',
        definitivo: true,
        codsec: '3',
        dessec: 'subproceso 3',
        fecact: new Date(),
        feccre: new Date(),
        usract: '',
        usrcre: ''
    }
]; 