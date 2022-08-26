import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { TarifasImpuestosService } from './tarifas-impuestos.service';

describe('NivelesEducativosServices', () => {

  let nivelesEducativosService   : TarifasImpuestosService;
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
      providers: [ TarifasImpuestosService ]
    });

    nivelesEducativosService = TestBed.inject(TarifasImpuestosService);

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

    nivelesEducativosService.getAllTarifasByEmpresa("93")
      .subscribe((resp) => {
        console.log(resp);
        
        expect(resp).toEqual(mockResult);
        done();
      });

  }));

  it('Deberia retornar Nivel Educativo (Id Existente)', waitForAsync( (done: DoneFn) => {
    
    const id = '1'
    const mockResult: any = {
      nivelEducativo1: true,
      nivelEducativo2: true
    };

    expect(id).toContain('1')

    getHttpClientSpy.get.and.returnValue(of(mockResult));

    nivelesEducativosService.getTiposTarifas()
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  })); 

  it('Deberia retornar mensaje de error: 404 (Id inexistente)', waitForAsync( (done: DoneFn) => {

    const data = {
      "despun": "descripcion",
      "aumpun": "1",
      "codpun": "02",
      "idEmpresa": "93",
      "idNomina": "0001"
    };
    
    const id = '99'
    const error404 = new HttpErrorResponse({
      error: 'Bad Id',
      status: 404,
      statusText: 'Not Found'
    });

    expect(id).toContain('99')

    getHttpClientSpy.get.and.returnValue(throwError(error404));

    nivelesEducativosService.getFrecuenciasImpuestos()
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('Deberia retornar mensaje de error: 404 (Id inexistente)', waitForAsync( (done: DoneFn) => {

    const data = {
      "despun": "descripcion",
      "aumpun": "1",
      "codpun": "02",
      "idEmpresa": "93",
      "idNomina": "0001"
    };
    
    const id = '99'
    const error404 = new HttpErrorResponse({
      error: 'Bad Id',
      status: 404,
      statusText: 'Not Found'
    });

    expect(id).toContain('99')

    getHttpClientSpy.get.and.returnValue(throwError(error404));

    nivelesEducativosService.getById("93")
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('Deberia retornar mensaje de error: 404 (Id inexistente)', waitForAsync( (done: DoneFn) => {

    const data = {
      "tasim1": 14,
      "tasim2": 14,
      "valsus": 14,
      "idEmpresa": "93",
      "anomes": new Date("2022-04-01T00:00:00"),
      "remdes": 669,
      "remhas": 6600,
      "frecue": 360,
      "tipreg": "2"
    };
    
    const id = '99'
    const error404 = new HttpErrorResponse({
      error: 'Bad Id',
      status: 404,
      statusText: 'Not Found'
    });

    expect(id).toContain('99')

    getHttpClientSpy.get.and.returnValue(throwError(error404));

    nivelesEducativosService.delete(data)
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

});
  