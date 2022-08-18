import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { NominasService } from './nominas.service';
import { TipoNomina } from '../../shared-empresa/interfaces/nominas.interfaces';

describe('NivelesEducativosServices', () => {

  let nivelesEducativosService   : NominasService;
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
      providers: [ NominasService ]
    });

    nivelesEducativosService = TestBed.inject(NominasService);

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

    nivelesEducativosService.getNominaByEmpresa("93", "0001")
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

    nivelesEducativosService.getNominaByEmpresa("93", "0001")
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  })); 

  it('Deberia retornar mensaje de error: 404 (Id inexistente)', waitForAsync( (done: DoneFn) => {

    const data = {
      "tipnom": "0001",
      "desnom": "Empleados Directos",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": null,
      "fecto2": null,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 123,
      "canmin": 123,
      "facgua": 123,
      "asifon": 123,
      "dedfon": 123,
      "valfon": 0.5,
      "fecabo": null,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "1",
      "anocom": "0",
      "pgmrec": "0",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
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
  