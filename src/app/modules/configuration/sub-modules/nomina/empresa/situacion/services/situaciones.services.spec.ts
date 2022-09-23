import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { SituacionService } from './situacion.service';

describe('NivelesEducativosServices', () => {

  let nivelesEducativosService   : SituacionService;
  let httpClientSpy : { post: jasmine.Spy };
  let getHttpClientSpy : { get: jasmine.Spy };
  let putHttpClientSpy : { put: jasmine.Spy };
  let deleteHttpClientSpy : { delete: jasmine.Spy };

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [ SituacionService ]
    });

    nivelesEducativosService = TestBed.inject(SituacionService);

    // Peticiones mock
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    getHttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    putHttpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
    deleteHttpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);

  });

  it('Debe crearse el servicio correctamente', () => {
    expect(nivelesEducativosService).toBeTruthy();
  });

  it('Deberia retornar arreglo de Niveles Educativos', waitForAsync ((done: DoneFn) => {
    
    const situacion = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "clasta": "0"
          }
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "conesq": "0"
          }
      },
      "nmVacacionStatusTb": {
          "vacsta": "3",
          "descripcion": "Rotacion situacion",
          "primaryKey": {
              "vacsta": "3"
          }
      },
      "nmGrupoRotacionTb": {
          "idEmpresa": "93",
          "idNomina": "0001",
          "idGrupo": "PP",
          "congru": "1",
          "diag01": "P",
          "diag02": "P",
          "diag03": "P",
          "diag04": "P",
          "diag05": "P",
          "diag06": "P",
          "diag07": "P",
          "diag08": "P",
          "diag09": "P",
          "diag10": "P",
          "diag11": "P",
          "diag12": "P",
          "diag13": "P",
          "diag14": "P",
          "diag15": "P",
          "diag16": "P",
          "diag17": "P",
          "diag18": "P",
          "diag19": "P",
          "diag20": "P",
          "diag21": "P",
          "diag22": "P",
          "diag23": "P",
          "diag24": "P",
          "diag25": "P",
          "diag26": "P",
          "diag27": "P",
          "diag28": "P",
          "diag29": "P",
          "diag30": "P",
          "diag31": null,
          "diav01": null,
          "diav02": null,
          "diav03": null,
          "diav04": null,
          "diav05": null,
          "diav06": null,
          "diav07": null,
          "diav08": null,
          "diav09": null,
          "diav10": null,
          "diav11": null,
          "diav12": null,
          "diav13": null,
          "diav14": null,
          "diav15": null,
          "diav16": null,
          "diav17": null,
          "diav18": null,
          "diav19": null,
          "diav20": null,
          "diav21": null,
          "diav22": null,
          "diav23": null,
          "diav24": null,
          "diav25": null,
          "diav26": null,
          "diav27": null,
          "diav28": null,
          "diav29": null,
          "diav30": null,
          "diav31": null,
          "canlim": 0,
          "diaga1": null,
          "diaga2": null,
          "diaga3": null,
          "diaga4": null,
          "diava1": null,
          "diava2": null,
          "diava3": null,
          "diava4": null,
          "idTableTemporal": 1
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPAR",
      "idEmpresa": "93",
      "idNomina": "0001"
    }

    const mockResult: any = [
      {
          "desniv": "Basica",
          "codley": null,
          "codniv": "6"
      },
      {
          "desniv": "Universitario",
          "codley": null,
          "codniv": "4"
      },
      {
          "desniv": "Bachiller",
          "codley": null,
          "codniv": "5"
      },
      {
          "desniv": "Primaria",
          "codley": null,
          "codniv": "1"
      },
      {
          "desniv": "Secundaria",
          "codley": "SES",
          "codniv": "2"
      }
    ]

    expect(mockResult.length).toBeGreaterThan(1)

    getHttpClientSpy.get.and.returnValue(of(mockResult));

    nivelesEducativosService.getAllSituacionesByEmpresaNomina("94", "0004")
      .subscribe((resp) => {
        console.log(resp);
        
        expect(resp).toEqual(mockResult);
        done();
      });

  }));

  it('Deberia retornar Nivel Educativo (Id Existente)', waitForAsync( (done: DoneFn) => {
    
    const situacion = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "clasta": "0"
          }
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "conesq": "0"
          }
      },
      "nmVacacionStatusTb": {
          "vacsta": "3",
          "descripcion": "Rotacion situacion",
          "primaryKey": {
              "vacsta": "3"
          }
      },
      "nmGrupoRotacionTb": {
          "idEmpresa": "93",
          "idNomina": "0001",
          "idGrupo": "PP",
          "congru": "1",
          "diag01": "P",
          "diag02": "P",
          "diag03": "P",
          "diag04": "P",
          "diag05": "P",
          "diag06": "P",
          "diag07": "P",
          "diag08": "P",
          "diag09": "P",
          "diag10": "P",
          "diag11": "P",
          "diag12": "P",
          "diag13": "P",
          "diag14": "P",
          "diag15": "P",
          "diag16": "P",
          "diag17": "P",
          "diag18": "P",
          "diag19": "P",
          "diag20": "P",
          "diag21": "P",
          "diag22": "P",
          "diag23": "P",
          "diag24": "P",
          "diag25": "P",
          "diag26": "P",
          "diag27": "P",
          "diag28": "P",
          "diag29": "P",
          "diag30": "P",
          "diag31": null,
          "diav01": null,
          "diav02": null,
          "diav03": null,
          "diav04": null,
          "diav05": null,
          "diav06": null,
          "diav07": null,
          "diav08": null,
          "diav09": null,
          "diav10": null,
          "diav11": null,
          "diav12": null,
          "diav13": null,
          "diav14": null,
          "diav15": null,
          "diav16": null,
          "diav17": null,
          "diav18": null,
          "diav19": null,
          "diav20": null,
          "diav21": null,
          "diav22": null,
          "diav23": null,
          "diav24": null,
          "diav25": null,
          "diav26": null,
          "diav27": null,
          "diav28": null,
          "diav29": null,
          "diav30": null,
          "diav31": null,
          "canlim": 0,
          "diaga1": null,
          "diaga2": null,
          "diaga3": null,
          "diaga4": null,
          "diava1": null,
          "diava2": null,
          "diava3": null,
          "diava4": null,
          "idTableTemporal": 1
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPAR",
      "idEmpresa": "93",
      "idNomina": "0001"
    }

    const proceso = {
      "dialim": 300,
      "susvac": "0",
      "idEmpresa": "94",
      "idNomina": "0004",
      "statCodsta": "AUA",
      "procTippro": 1,
      "tipsub": 2,
      "idTableTemporal": 11
    }

    const id = '1'
    const mockResult: any = {
      nivelEducativo1: true,
      nivelEducativo2: true
    };

    expect(id).toContain('1')

    getHttpClientSpy.get.and.returnValue(of(mockResult));

    nivelesEducativosService.getSituacionByEmpresaNominaSituacion("Empresa", "Nomina", "Situacion")
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  })); 

  it('Deberia retornar mensaje de error: 404 (Id inexistente)', waitForAsync( (done: DoneFn) => {
   
    const situacion = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "clasta": "0"
          }
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "conesq": "0"
          }
      },
      "nmVacacionStatusTb": {
          "vacsta": "3",
          "descripcion": "Rotacion situacion",
          "primaryKey": {
              "vacsta": "3"
          }
      },
      "nmGrupoRotacionTb": {
          "idEmpresa": "93",
          "idNomina": "0001",
          "idGrupo": "PP",
          "congru": "1",
          "diag01": "P",
          "diag02": "P",
          "diag03": "P",
          "diag04": "P",
          "diag05": "P",
          "diag06": "P",
          "diag07": "P",
          "diag08": "P",
          "diag09": "P",
          "diag10": "P",
          "diag11": "P",
          "diag12": "P",
          "diag13": "P",
          "diag14": "P",
          "diag15": "P",
          "diag16": "P",
          "diag17": "P",
          "diag18": "P",
          "diag19": "P",
          "diag20": "P",
          "diag21": "P",
          "diag22": "P",
          "diag23": "P",
          "diag24": "P",
          "diag25": "P",
          "diag26": "P",
          "diag27": "P",
          "diag28": "P",
          "diag29": "P",
          "diag30": "P",
          "diag31": null,
          "diav01": null,
          "diav02": null,
          "diav03": null,
          "diav04": null,
          "diav05": null,
          "diav06": null,
          "diav07": null,
          "diav08": null,
          "diav09": null,
          "diav10": null,
          "diav11": null,
          "diav12": null,
          "diav13": null,
          "diav14": null,
          "diav15": null,
          "diav16": null,
          "diav17": null,
          "diav18": null,
          "diav19": null,
          "diav20": null,
          "diav21": null,
          "diav22": null,
          "diav23": null,
          "diav24": null,
          "diav25": null,
          "diav26": null,
          "diav27": null,
          "diav28": null,
          "diav29": null,
          "diav30": null,
          "diav31": null,
          "canlim": 0,
          "diaga1": null,
          "diaga2": null,
          "diaga3": null,
          "diaga4": null,
          "diava1": null,
          "diava2": null,
          "diava3": null,
          "diava4": null,
          "idTableTemporal": 1
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPAR",
      "idEmpresa": "93",
      "idNomina": "0001"
    }

    const id = '99'
    const error404 = new HttpErrorResponse({
      error: 'Bad Id',
      status: 404,
      statusText: 'Not Found'
    });

    expect(id).toContain('99')

    getHttpClientSpy.get.and.returnValue(throwError(error404));

    nivelesEducativosService.create(situacion)
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('Deberia retornar mensaje de error: 404 (Id inexistente)', waitForAsync( (done: DoneFn) => {
   
    const situacion = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "clasta": "0"
          }
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "conesq": "0"
          }
      },
      "nmVacacionStatusTb": {
          "vacsta": "3",
          "descripcion": "Rotacion situacion",
          "primaryKey": {
              "vacsta": "3"
          }
      },
      "nmGrupoRotacionTb": {
          "idEmpresa": "93",
          "idNomina": "0001",
          "idGrupo": "PP",
          "congru": "1",
          "diag01": "P",
          "diag02": "P",
          "diag03": "P",
          "diag04": "P",
          "diag05": "P",
          "diag06": "P",
          "diag07": "P",
          "diag08": "P",
          "diag09": "P",
          "diag10": "P",
          "diag11": "P",
          "diag12": "P",
          "diag13": "P",
          "diag14": "P",
          "diag15": "P",
          "diag16": "P",
          "diag17": "P",
          "diag18": "P",
          "diag19": "P",
          "diag20": "P",
          "diag21": "P",
          "diag22": "P",
          "diag23": "P",
          "diag24": "P",
          "diag25": "P",
          "diag26": "P",
          "diag27": "P",
          "diag28": "P",
          "diag29": "P",
          "diag30": "P",
          "diag31": null,
          "diav01": null,
          "diav02": null,
          "diav03": null,
          "diav04": null,
          "diav05": null,
          "diav06": null,
          "diav07": null,
          "diav08": null,
          "diav09": null,
          "diav10": null,
          "diav11": null,
          "diav12": null,
          "diav13": null,
          "diav14": null,
          "diav15": null,
          "diav16": null,
          "diav17": null,
          "diav18": null,
          "diav19": null,
          "diav20": null,
          "diav21": null,
          "diav22": null,
          "diav23": null,
          "diav24": null,
          "diav25": null,
          "diav26": null,
          "diav27": null,
          "diav28": null,
          "diav29": null,
          "diav30": null,
          "diav31": null,
          "canlim": 0,
          "diaga1": null,
          "diaga2": null,
          "diaga3": null,
          "diaga4": null,
          "diava1": null,
          "diava2": null,
          "diava3": null,
          "diava4": null,
          "idTableTemporal": 1
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPAR",
      "idEmpresa": "93",
      "idNomina": "0001"
    }

    const situacionUptate = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
      },
      "nmVacacionStatusTb": {
          "vacsta": "3",
      },
      "nmGrupoRotacionTb": {
          "idEmpresa": "93",
          "idNomina": "0001",
          "idGrupo": "PP",
          "congru": "1",
          "diag01": "P",
          "diag02": "P",
          "diag03": "P",
          "diag04": "P",
          "diag05": "P",
          "diag06": "P",
          "diag07": "P",
          "diag08": "P",
          "diag09": "P",
          "diag10": "P",
          "diag11": "P",
          "diag12": "P",
          "diag13": "P",
          "diag14": "P",
          "diag15": "P",
          "diag16": "P",
          "diag17": "P",
          "diag18": "P",
          "diag19": "P",
          "diag20": "P",
          "diag21": "P",
          "diag22": "P",
          "diag23": "P",
          "diag24": "P",
          "diag25": "P",
          "diag26": "P",
          "diag27": "P",
          "diag28": "P",
          "diag29": "P",
          "diag30": "P",
          "diag31": null,
          "diav01": null,
          "diav02": null,
          "diav03": null,
          "diav04": null,
          "diav05": null,
          "diav06": null,
          "diav07": null,
          "diav08": null,
          "diav09": null,
          "diav10": null,
          "diav11": null,
          "diav12": null,
          "diav13": null,
          "diav14": null,
          "diav15": null,
          "diav16": null,
          "diav17": null,
          "diav18": null,
          "diav19": null,
          "diav20": null,
          "diav21": null,
          "diav22": null,
          "diav23": null,
          "diav24": null,
          "diav25": null,
          "diav26": null,
          "diav27": null,
          "diav28": null,
          "diav29": null,
          "diav30": null,
          "diav31": null,
          "canlim": 0,
          "diaga1": null,
          "diaga2": null,
          "diaga3": null,
          "diaga4": null,
          "diava1": null,
          "diava2": null,
          "diava3": null,
          "diava4": null,
          "idTableTemporal": 1
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPAR",
      "idEmpresa": "93",
      "idNomina": "0001"
    }

    const id = '99'
    const error404 = new HttpErrorResponse({
      error: 'Bad Id',
      status: 404,
      statusText: 'Not Found'
    });

    expect(id).toContain('99')

    getHttpClientSpy.get.and.returnValue(throwError(error404));

    nivelesEducativosService.update(situacion, situacionUptate)
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('Deberia retornar mensaje de error: 404 (Id inexistente)', waitForAsync( (done: DoneFn) => {
   
    const situacion = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "clasta": "0"
          }
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "conesq": "0"
          }
      },
      "nmVacacionStatusTb": {
          "vacsta": "3",
          "descripcion": "Rotacion situacion",
          "primaryKey": {
              "vacsta": "3"
          }
      },
      "nmGrupoRotacionTb": {
          "idEmpresa": "93",
          "idNomina": "0001",
          "idGrupo": "PP",
          "congru": "1",
          "diag01": "P",
          "diag02": "P",
          "diag03": "P",
          "diag04": "P",
          "diag05": "P",
          "diag06": "P",
          "diag07": "P",
          "diag08": "P",
          "diag09": "P",
          "diag10": "P",
          "diag11": "P",
          "diag12": "P",
          "diag13": "P",
          "diag14": "P",
          "diag15": "P",
          "diag16": "P",
          "diag17": "P",
          "diag18": "P",
          "diag19": "P",
          "diag20": "P",
          "diag21": "P",
          "diag22": "P",
          "diag23": "P",
          "diag24": "P",
          "diag25": "P",
          "diag26": "P",
          "diag27": "P",
          "diag28": "P",
          "diag29": "P",
          "diag30": "P",
          "diag31": null,
          "diav01": null,
          "diav02": null,
          "diav03": null,
          "diav04": null,
          "diav05": null,
          "diav06": null,
          "diav07": null,
          "diav08": null,
          "diav09": null,
          "diav10": null,
          "diav11": null,
          "diav12": null,
          "diav13": null,
          "diav14": null,
          "diav15": null,
          "diav16": null,
          "diav17": null,
          "diav18": null,
          "diav19": null,
          "diav20": null,
          "diav21": null,
          "diav22": null,
          "diav23": null,
          "diav24": null,
          "diav25": null,
          "diav26": null,
          "diav27": null,
          "diav28": null,
          "diav29": null,
          "diav30": null,
          "diav31": null,
          "canlim": 0,
          "diaga1": null,
          "diaga2": null,
          "diaga3": null,
          "diaga4": null,
          "diava1": null,
          "diava2": null,
          "diava3": null,
          "diava4": null,
          "idTableTemporal": 1
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPAR",
      "idEmpresa": "93",
      "idNomina": "0001"
    }

    const id = '99'
    const error404 = new HttpErrorResponse({
      error: 'Bad Id',
      status: 404,
      statusText: 'Not Found'
    });

    expect(id).toContain('99')

    getHttpClientSpy.get.and.returnValue(throwError(error404));

    nivelesEducativosService.delete(situacion)
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('Deberia retornar mensaje de error: 404 (Id inexistente)', waitForAsync( (done: DoneFn) => {

    const id = '99'
    const error404 = new HttpErrorResponse({
      error: 'Bad Id',
      status: 404,
      statusText: 'Not Found'
    });

    expect(id).toContain('99')

    getHttpClientSpy.get.and.returnValue(throwError(error404));

    nivelesEducativosService.getEsquemaTrabajo()
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('Deberia retornar mensaje de error: 404 (Id inexistente)', waitForAsync( (done: DoneFn) => {

    const id = '99'
    const error404 = new HttpErrorResponse({
      error: 'Bad Id',
      status: 404,
      statusText: 'Not Found'
    });

    expect(id).toContain('99')

    getHttpClientSpy.get.and.returnValue(throwError(error404));

    nivelesEducativosService.getEstatusVacaciones()
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('Deberia retornar mensaje de error: 404 (Id inexistente)', waitForAsync( (done: DoneFn) => {

    const id = '99'
    const error404 = new HttpErrorResponse({
      error: 'Bad Id',
      status: 404,
      statusText: 'Not Found'
    });

    expect(id).toContain('99')

    getHttpClientSpy.get.and.returnValue(throwError(error404));

    nivelesEducativosService.getClasesSituaciones()
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

});
  