import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { CargosTabuladorService } from './cargos-tabulador.service';

describe('NivelesEducativosServices', () => {

  let nivelesEducativosService   : CargosTabuladorService;
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
      providers: [ CargosTabuladorService ]
    });

    nivelesEducativosService = TestBed.inject(CargosTabuladorService);

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

    nivelesEducativosService.getCargosTabuladorByEmpresa("93")
      .subscribe((resp) => {
        console.log(resp);
        
        expect(resp).toEqual(mockResult);
        done();
      });

  }));

  it('Deberia retornar Nivel Educativo (Id Existente)', waitForAsync( (done: DoneFn) => {
    
    const situacion = {
      "idEmpresa":   "93",
      "id":          "1",
      "nmCargoTabuladorTbId": {
        "idEmpresa": "93",
        "id":       "1"
      },
      "tabu01": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu02": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu03": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu04": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu05": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu06": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu07": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu08": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu09": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu10": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu11": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu12": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "mest01": 2,
      "mest02": 2,
      "mest03": 2,
      "mest04": 2,
      "mest05": 2,
      "mest06": 2,
      "mest07": 2,
      "mest08": 2,
      "mest09": 2,
      "mest10": 2,
      "mest11": 2,
      "mest12": 2,  
    }

    const id = '1'
    const mockResult: any = {
      nivelEducativo1: true,
      nivelEducativo2: true
    };

    expect(id).toContain('1')

    getHttpClientSpy.get.and.returnValue(of(mockResult));

    nivelesEducativosService.delete(situacion)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  })); 

});
  