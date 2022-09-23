import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { CompaniaService } from './compania.service';
import { Company } from '../../shared-empresa/interfaces/empresa.interfaces';

describe('NivelesEducativosServices', () => {

  let sindicatosService   : CompaniaService;
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
      providers: [ CompaniaService ]
    });

    sindicatosService = TestBed.inject(CompaniaService);

    // Peticiones mock
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    getHttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    putHttpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
    deleteHttpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);

  });

  it('Debe crearse el servicio correctamente', () => {
    expect(CompaniaService).toBeTruthy();
  });

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
    const query: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "2",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "02010201",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.gold",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
        {
          "rel": "datosadicionales",
          "href": "/empresas/93/datosadicionales"
        }
      ]
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
    const query: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "2",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "02010201",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.gold",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
        {
          "rel": "datosadicionales",
          "href": "/empresas/93/datosadicionales"
        }
      ]
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
    const query: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "2",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "02010201",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.gold",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
        {
          "rel": "datosadicionales",
          "href": "/empresas/93/datosadicionales"
        }
      ]
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
    const query: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "2",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "02010201",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.gold",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
        {
          "rel": "datosadicionales",
          "href": "/empresas/93/datosadicionales"
        }
      ]
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
    const query: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "2",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "02010201",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.gold",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
        {
          "rel": "datosadicionales",
          "href": "/empresas/93/datosadicionales"
        }
      ]
    }

    const mockResult: any = {
      response: true,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    sindicatosService.delete(query.id)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Eliminar Forma de pago (Caso incorrecto)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "2",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "02010201",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.gold",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
        {
          "rel": "datosadicionales",
          "href": "/empresas/93/datosadicionales"
        }
      ]
    }

    const mockResult: any = {
      response: false,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    sindicatosService.delete(query.id)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Obtener todos los paises (Caso exitoso)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "2",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "02010201",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.gold",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
        {
          "rel": "datosadicionales",
          "href": "/empresas/93/datosadicionales"
        }
      ]
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
    const query: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "2",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "02010201",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.gold",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
        {
          "rel": "datosadicionales",
          "href": "/empresas/93/datosadicionales"
        }
      ]
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
  