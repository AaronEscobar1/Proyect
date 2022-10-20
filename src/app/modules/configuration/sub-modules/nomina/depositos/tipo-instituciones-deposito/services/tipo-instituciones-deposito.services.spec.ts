import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { TipoInstitucion, TipoInstitucionUpdate } from '../interfaces/tipo-instituciones-deposito.interfaces';
import { TipoInstitucionesDepositoService } from './tipo-instituciones-deposito.service';

describe('NivelesEducativosServices', () => {

  let procesosService   : TipoInstitucionesDepositoService;
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
      providers: [ TipoInstitucionesDepositoService ]
    });

    procesosService = TestBed.inject(TipoInstitucionesDepositoService);

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

    expect(mockResult.length).toBeGreaterThan(1)

    getHttpClientSpy.get.and.returnValue(of(mockResult));

    procesosService.getTiposInstitucionesByEmpresa("93")
      .subscribe((resp) => {
        console.log(resp);
        
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Crear nivel educativo (Caso exitoso)', waitForAsync( (done: DoneFn) => {
    
    const token = 'xxxxx'

    const mockResult: any = {
      response: true,
    };

    expect(token).toContain('xxxxx')

    httpClientSpy.post.and.returnValue(of(mockResult));

    procesosService.getAllInstitucionesByTipoInstitucion("93", "12")
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Crear nivel Educativo mensaje de error: any (caso incorrecto)', waitForAsync( (done: DoneFn) => {
    
    const token = 'xxxxx'

    const query: TipoInstitucion = {
      idEmpresa:                "93",
      codtip:                   "93",
      destip:                   "93",
      nmClaseTipoInstitucionTb: {
        clatip:       "93",
        descripcion: "93",
        primaryKey:  {
          clatip: "93"
        },
      } 
    }

    const mockResult: any = {
      response: false,
    };

    expect(token).toContain('xxxxx')

    httpClientSpy.post.and.returnValue(throwError(mockResult));

    procesosService.create(query)
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('actualizar nivel educativo (Caso exitoso)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'

    const query: TipoInstitucion = {
      idEmpresa:                "93",
      codtip:                   "93",
      destip:                   "93",
      nmClaseTipoInstitucionTb: {
        clatip:       "93",
        descripcion: "93",
        primaryKey:  {
          clatip: "93"
        },
      } 
    }

    const queryUpdate: TipoInstitucionUpdate = {
      destip:                   "93",
      nmClaseTipoInstitucionTb: {
        clatip:       "93",
        descripcion: "93",
        primaryKey:  {
          clatip: "93"
        },
      } 
    }

    const mockResult: any = {
      response: true,
    };

    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    procesosService.update(query, queryUpdate)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('actualizar nivel educativo (Caso exitoso)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'

    const query: TipoInstitucion = {
      idEmpresa:                "93",
      codtip:                   "93",
      destip:                   "93",
      nmClaseTipoInstitucionTb: {
        clatip:       "93",
        descripcion: "93",
        primaryKey:  {
          clatip: "93"
        },
      } 
    }

    const mockResult: any = {
      response: true,
    };

    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    procesosService.delete(query)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('actualizar nivel educativo (Caso exitoso)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'

    const mockResult: any = {
      response: true,
    };

    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    procesosService.getClasificacionInstituciones()
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

});
  