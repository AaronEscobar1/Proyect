import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { Sindicatos } from '../interfaces/sindicatos.interfaces';
import { SindicatosService } from './sindicatos.service';

describe('NivelesEducativosServices', () => {

  let sindicatosService   : SindicatosService;
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
      providers: [ SindicatosService ]
    });

    sindicatosService = TestBed.inject(SindicatosService);

    // Peticiones mock
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    getHttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    putHttpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
    deleteHttpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);

  });

  it('Debe crearse el servicio correctamente', () => {
    expect(SindicatosService).toBeTruthy();
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

    sindicatosService.getAll()
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

    sindicatosService.getById(id)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
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

    sindicatosService.getById(id)
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('Crear nivel educativo (Caso exitoso)', waitForAsync( (done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    } 
    const mockResult: any = {
      response: true,
    };

    expect(token).toContain('xxxxx')

    httpClientSpy.post.and.returnValue(of(mockResult));

    sindicatosService.create(query)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Crear nivel Educativo mensaje de error: any (caso incorrecto)', waitForAsync( (done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    } 

    const mockResult: any = {
      response: false,
    };

    expect(token).toContain('xxxxx')

    httpClientSpy.post.and.returnValue(throwError(mockResult));

    sindicatosService.create(query)
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('actualizar nivel educativo (Caso exitoso)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    } 

    const mockResult: any = {
      response: true,
    };

    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    sindicatosService.update(query)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('actualizar nivel Educativo mensaje de error: any (caso incorrecto)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    } 

    const mockResult: any = {
      response: false,
    };

    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(throwError(mockResult));

    sindicatosService.update(query)
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('Eliminar Forma de pago (Caso exitoso)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    } 

    const mockResult: any = {
      response: true,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    sindicatosService.delete(query.codsin)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Eliminar Forma de pago (Caso incorrecto)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    } 

    const mockResult: any = {
      response: false,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    sindicatosService.delete(query.codsin)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Obtener todos los paises (Caso exitoso)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    } 

    const mockResult: any = {
      response: true,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    sindicatosService.getAllCountry()
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Eliminar Forma de pago (Caso incorrecto)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": "VEN",
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    } 

    const mockResult: any = {
      response: false,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    sindicatosService.getEntitiesByCountry("VEN")
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

});
  