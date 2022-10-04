import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { Institucion, InstitucionUpdate } from '../interfaces/instituciones.interfaces';
import { ProgramasInstitucionService } from './programas-institucion.service';
import { InstitucionPrograma, InstitucionProgramaUpdate } from '../interfaces/instituciones-programas.interfaces';

describe('NivelesEducativosServices', () => {

  let procesosService   : ProgramasInstitucionService;
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
      providers: [ ProgramasInstitucionService ]
    });

    procesosService = TestBed.inject(ProgramasInstitucionService);

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
      },
      "idEmpresa": "93",
      "tipiCodtip": "01",
      "codins": "0001"
    };

    expect(mockResult.length).toBeGreaterThan(1)

    getHttpClientSpy.get.and.returnValue(of(mockResult));

    procesosService.getProgramaInstitucionesByEmpresa(query)
      .subscribe((resp) => {
        console.log(resp);
        
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Crear nivel educativo (Caso exitoso)', waitForAsync( (done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: InstitucionPrograma = {
      "descrip": "Cheque",
      "nmTipoProgramaTb": {
          "tippgm": "3",
          "descripcion": "Cheque",
          "primaryKey": {
              "tippgm": "3"
          }
      },
      "nombrePgm": "2",
      "codins": "CAJA",
      "idEmpresa": "93",
      "tipiCodtip": "02",
      "idTableTemporal": 1
    }

    const mockResult: any = {
      response: true,
    };

    expect(token).toContain('xxxxx')

    httpClientSpy.post.and.returnValue(of(mockResult));

    procesosService.create(query)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Crear nivel Educativo mensaje de error: any (caso incorrecto)', waitForAsync( (done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: InstitucionPrograma = {
      "descrip": "Cheque",
      "nmTipoProgramaTb": {
          "tippgm": "3",
          "descripcion": "Cheque",
          "primaryKey": {
              "tippgm": "3"
          }
      },
      "nombrePgm": "2",
      "codins": "CAJA",
      "idEmpresa": "93",
      "tipiCodtip": "02",
      "idTableTemporal": 1
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
    const query: InstitucionPrograma = {
      "descrip": "Cheque",
      "nmTipoProgramaTb": {
          "tippgm": "3",
          "descripcion": "Cheque",
          "primaryKey": {
              "tippgm": "3"
          }
      },
      "nombrePgm": "2",
      "codins": "CAJA",
      "idEmpresa": "93",
      "tipiCodtip": "02",
      "idTableTemporal": 1
    }

    const queryUpdate: InstitucionProgramaUpdate = {
      "descrip": "Cheque",
      "nmTipoProgramaTb": {
          "tippgm": "3",
          "descripcion": "Cheque",
          "primaryKey": {
              "tippgm": "3"
          }
      },
    };

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

  it('actualizar nivel Educativo mensaje de error: any (caso incorrecto)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: InstitucionPrograma = {
      "descrip": "Cheque",
      "nmTipoProgramaTb": {
          "tippgm": "3",
          "descripcion": "Cheque",
          "primaryKey": {
              "tippgm": "3"
          }
      },
      "nombrePgm": "2",
      "codins": "CAJA",
      "idEmpresa": "93",
      "tipiCodtip": "02",
      "idTableTemporal": 1
    }

    const queryUpdate: InstitucionProgramaUpdate = {
      "descrip": "Cheque",
      "nmTipoProgramaTb": {
          "tippgm": "3",
          "descripcion": "Cheque",
          "primaryKey": {
              "tippgm": "3"
          }
      },
    };

    const mockResult: any = {
      response: false,
    };

    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(throwError(mockResult));

    procesosService.update(query, queryUpdate)
      .subscribe((resp) => {
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  }));

  it('Eliminar Forma de pago (Caso exitoso)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: InstitucionPrograma = {
      "descrip": "Cheque",
      "nmTipoProgramaTb": {
          "tippgm": "3",
          "descripcion": "Cheque",
          "primaryKey": {
              "tippgm": "3"
          }
      },
      "nombrePgm": "2",
      "codins": "CAJA",
      "idEmpresa": "93",
      "tipiCodtip": "02",
      "idTableTemporal": 1
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

  it('Eliminar Forma de pago (Caso incorrecto)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'
    const query: InstitucionPrograma = {
      "descrip": "Cheque",
      "nmTipoProgramaTb": {
          "tippgm": "3",
          "descripcion": "Cheque",
          "primaryKey": {
              "tippgm": "3"
          }
      },
      "nombrePgm": "2",
      "codins": "CAJA",
      "idEmpresa": "93",
      "tipiCodtip": "02",
      "idTableTemporal": 1
    }

    const mockResult: any = {
      response: false,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    procesosService.delete(query)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

  it('Eliminar Forma de pago (Caso exitoso)', waitForAsync ((done: DoneFn) => {
    
    const token = 'xxxxx'

    const mockResult: any = {
      response: true,
    };
    
    expect(token).toContain('xxxxx')

    putHttpClientSpy.put.and.returnValue(of(mockResult));

    procesosService.getTiposProgramas()
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  }));

});
  