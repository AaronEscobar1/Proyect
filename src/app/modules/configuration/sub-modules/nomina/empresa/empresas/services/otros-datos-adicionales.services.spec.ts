import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { OtroDatosAdicionalesService } from './otro-datos-adicionales.service';
import { OtrosDatosEmpresa } from '../interfaces/otros-datos-empresa.interfaces';

describe('NivelesEducativosServices', () => {

  let sindicatosService   : OtroDatosAdicionalesService;
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
      providers: [ OtroDatosAdicionalesService ]
    });

    sindicatosService = TestBed.inject(OtroDatosAdicionalesService);

    // Peticiones mock
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    getHttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    putHttpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
    deleteHttpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);

  });

  it('Debe crearse el servicio correctamente', () => {
    expect(OtroDatosAdicionalesService).toBeTruthy();
  });

  it('Crear nivel educativo (Caso exitoso)', waitForAsync( (done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: OtrosDatosEmpresa = {
      "ciacon": null,
      "nomfun": "funcionario",
      "cedfun": "24998740",
      "nacfun": "0",
      "nrocon": null,
      "tipage": "1",
      "datcon": null,
      "claapo": "0",
      "forpre": "1",
      "tipemp": "0",
      "pgmctb": null,
      "tideIdefun": "1",
      "idEmpresa": "1"
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
    const query: OtrosDatosEmpresa = {
      "ciacon": null,
      "nomfun": "funcionario",
      "cedfun": "24998740",
      "nacfun": "0",
      "nrocon": null,
      "tipage": "1",
      "datcon": null,
      "claapo": "0",
      "forpre": "1",
      "tipemp": "0",
      "pgmctb": null,
      "tideIdefun": "1",
      "idEmpresa": "1"
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
    const query: OtrosDatosEmpresa = {
      "ciacon": null,
      "nomfun": "funcionario",
      "cedfun": "24998740",
      "nacfun": "0",
      "nrocon": null,
      "tipage": "1",
      "datcon": null,
      "claapo": "0",
      "forpre": "1",
      "tipemp": "0",
      "pgmctb": null,
      "tideIdefun": "1",
      "idEmpresa": "1"
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
    const query: OtrosDatosEmpresa = {
      "ciacon": null,
      "nomfun": "funcionario",
      "cedfun": "24998740",
      "nacfun": "0",
      "nrocon": null,
      "tipage": "1",
      "datcon": null,
      "claapo": "0",
      "forpre": "1",
      "tipemp": "0",
      "pgmctb": null,
      "tideIdefun": "1",
      "idEmpresa": "1"
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
    const query: OtrosDatosEmpresa = {
      "ciacon": null,
      "nomfun": "funcionario",
      "cedfun": "24998740",
      "nacfun": "0",
      "nrocon": null,
      "tipage": "1",
      "datcon": null,
      "claapo": "0",
      "forpre": "1",
      "tipemp": "0",
      "pgmctb": null,
      "tideIdefun": "1",
      "idEmpresa": "1"
    }

    const mockResult: any = {
      response: true,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    sindicatosService.delete(query.idEmpresa)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Eliminar Forma de pago (Caso incorrecto)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: OtrosDatosEmpresa = {
      "ciacon": null,
      "nomfun": "funcionario",
      "cedfun": "24998740",
      "nacfun": "0",
      "nrocon": null,
      "tipage": "1",
      "datcon": null,
      "claapo": "0",
      "forpre": "1",
      "tipemp": "0",
      "pgmctb": null,
      "tideIdefun": "1",
      "idEmpresa": "1"
    }

    const mockResult: any = {
      response: false,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    sindicatosService.delete(query.idEmpresa)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Obtener todos los paises (Caso exitoso)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: OtrosDatosEmpresa = {
      "ciacon": null,
      "nomfun": "funcionario",
      "cedfun": "24998740",
      "nacfun": "0",
      "nrocon": null,
      "tipage": "1",
      "datcon": null,
      "claapo": "0",
      "forpre": "1",
      "tipemp": "0",
      "pgmctb": null,
      "tideIdefun": "1",
      "idEmpresa": "1"
    }

    const mockResult: any = {
      response: true,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    sindicatosService.getDatosAdicionalesByIdEmpresa(query.idEmpresa)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Eliminar Forma de pago (Caso incorrecto)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: OtrosDatosEmpresa = {
      "ciacon": null,
      "nomfun": "funcionario",
      "cedfun": "24998740",
      "nacfun": "0",
      "nrocon": null,
      "tipage": "1",
      "datcon": null,
      "claapo": "0",
      "forpre": "1",
      "tipemp": "0",
      "pgmctb": null,
      "tideIdefun": "1",
      "idEmpresa": "1"
    }

    const mockResult: any = {
      response: false,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    sindicatosService.getDatosAdicionalesByIdEmpresa(query.idEmpresa)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

});
  