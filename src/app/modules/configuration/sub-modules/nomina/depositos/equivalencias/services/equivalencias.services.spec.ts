import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { EquivalenciaTipoCuenta, EquivalenciaTipoCuentaUpdate } from '../interfaces/equivalencias.interfaces';
import { Institucion } from '../../instituciones/interfaces/instituciones.interfaces';
import { EquivalenciasService } from './equivalencias.service';

describe('NivelesEducativosServices', () => {

  let procesosService   : EquivalenciasService;
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
      providers: [ EquivalenciasService ]
    });

    procesosService = TestBed.inject(EquivalenciasService);

    // Peticiones mock
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    getHttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    putHttpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
    deleteHttpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);

  });

  it('Debe crearse el servicio correctamente', () => {
    expect(procesosService).toBeTruthy();
  });

  it('Deberia retornar arreglo de Niveles Educativos', waitForAsync ((done: DoneFn) => {
    
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

    const query: Institucion = {
      "desins": "BANCO VENEZOLANO DE CREDITO",
      "nrorif": "J003016560",
      "direc1": "null",
      "direc2": "null",
      "direc3": "null",
      "cdadCodciu": "CARACAS",
      "nrotl1": "null",
      "nrotl2": "null",
      "nrofax": "null",
      "nrocta": "01040107180107067094",
      "ctacon": "null",
      "nomcon": "null",
      "noctto": "FXC",
      "codrie": "null",
      "tctaTipcta": {
          "tipcta": "1",
          "descta": "CUENTA CORRIENTE",
      },
      "idEmpresa": "93",
      "tipiCodtip": "01",
      "codins": "0001",
      "paisEntidadFed": {
        "codPais":     "1",
        "codEntidad":  "3",
        "nombre":      "VEN",
      },
      "tipoInstitucion" : {
        "idEmpresa": "93",
        "codtip": "1",
        "destip": "hola",
        "nmClaseTipoInstitucionTb": {
          "clatip": "01",
          "descripcion": "hola"
        } 
      }
    };

    expect(mockResult.length).toBeGreaterThan(1)

    getHttpClientSpy.get.and.returnValue(of(mockResult));

    procesosService.getAllEquivalenciasCuenta(query)
      .subscribe((resp) => {
        console.log(resp);
        
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Crear nivel educativo (Caso exitoso)', waitForAsync( (done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Institucion = {
      "desins": "BANCO VENEZOLANO DE CREDITO",
      "nrorif": "J003016560",
      "direc1": "null",
      "direc2": "null",
      "direc3": "null",
      "cdadCodciu": "CARACAS",
      "nrotl1": "null",
      "nrotl2": "null",
      "nrofax": "null",
      "nrocta": "01040107180107067094",
      "ctacon": "null",
      "nomcon": "null",
      "noctto": "FXC",
      "codrie": "null",
      "tctaTipcta": {
          "tipcta": "1",
          "descta": "CUENTA CORRIENTE",
      },
      "idEmpresa": "93",
      "tipiCodtip": "01",
      "codins": "0001",
      "paisEntidadFed": {
        "codPais":     "1",
        "codEntidad":  "3",
        "nombre":      "VEN",
      },
      "tipoInstitucion" : {
        "idEmpresa": "93",
        "codtip": "1",
        "destip": "hola",
        "nmClaseTipoInstitucionTb": {
          "clatip": "01",
          "descripcion": "hola"
        } 
      }
    };

    const equivalencia: EquivalenciaTipoCuenta = {
      idEmpresa:              "01",
      tipiCodtip:             "01",
      codins:                 "01",
      tctaTipcta:             "01",
      equiva:                 "01",
      cfDepositoCuentaTipoTb: {
        tipcta: "01",
        descta: "01",
      }
    }

    const mockResult: any = {
      response: true,
    };

    expect(token).toContain('xxxxx')

    httpClientSpy.post.and.returnValue(of(mockResult));

    procesosService.create(equivalencia)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Crear nivel Educativo mensaje de error: any (caso incorrecto)', waitForAsync( (done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Institucion = {
      "desins": "BANCO VENEZOLANO DE CREDITO",
      "nrorif": "J003016560",
      "direc1": "null",
      "direc2": "null",
      "direc3": "null",
      "cdadCodciu": "CARACAS",
      "nrotl1": "null",
      "nrotl2": "null",
      "nrofax": "null",
      "nrocta": "01040107180107067094",
      "ctacon": "null",
      "nomcon": "null",
      "noctto": "FXC",
      "codrie": "null",
      "tctaTipcta": {
          "tipcta": "1",
          "descta": "CUENTA CORRIENTE",
      },
      "idEmpresa": "93",
      "tipiCodtip": "01",
      "codins": "0001",
      "paisEntidadFed": {
        "codPais":     "1",
        "codEntidad":  "3",
        "nombre":      "VEN",
      },
      "tipoInstitucion" : {
        "idEmpresa": "93",
        "codtip": "1",
        "destip": "hola",
        "nmClaseTipoInstitucionTb": {
          "clatip": "01",
          "descripcion": "hola"
        } 
      }
    };

    const equivalencia: EquivalenciaTipoCuenta = {
      idEmpresa:              "01",
      tipiCodtip:             "01",
      codins:                 "01",
      tctaTipcta:             "01",
      equiva:                 "01",
      cfDepositoCuentaTipoTb: {
        tipcta: "01",
        descta: "01",
      }
    }
    const equivalenciaUpdate: EquivalenciaTipoCuentaUpdate = {
      equiva:                 "01",
    }


    const mockResult: any = {
      response: false,
    };

    expect(token).toContain('xxxxx')

    httpClientSpy.post.and.returnValue(throwError(mockResult));

    procesosService.update(equivalencia, equivalenciaUpdate)
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('actualizar nivel educativo (Caso exitoso)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'

    const equivalencia: EquivalenciaTipoCuenta = {
      idEmpresa:              "01",
      tipiCodtip:             "01",
      codins:                 "01",
      tctaTipcta:             "01",
      equiva:                 "01",
      cfDepositoCuentaTipoTb: {
        tipcta: "01",
        descta: "01",
      }
    }

    const mockResult: any = {
      response: true,
    };

    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    procesosService.delete(equivalencia)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));
});
  