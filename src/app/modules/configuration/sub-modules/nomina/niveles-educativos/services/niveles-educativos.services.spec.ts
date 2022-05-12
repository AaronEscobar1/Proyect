import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { NivelesEducativosService } from './niveles-educativos.service';
import { NivelesEducativosComponent } from '../pages/niveles-educativos/niveles-educativos.component';
import { NivelesEducativos } from '../interfaces/niveles-educativos.interfaces';

describe('NivelesEducativosServices', () => {

  let nivelesEducativosService   : NivelesEducativosService;
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
      providers: [ NivelesEducativosService ]
    });

    nivelesEducativosService = TestBed.inject(NivelesEducativosService);

    // Peticiones mock
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete']);
    getHttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    putHttpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
    deleteHttpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);

  });

  it('Debe crearse el servicio correctamente', () => {
    expect(nivelesEducativosService).toBeTruthy();
  });

  it('Deberia retornar arreglo de Niveles Educativos', (done: DoneFn) => {
    
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

    getHttpClientSpy.get.and.returnValue(of(mockResult));

    nivelesEducativosService.getNivelesAll()
      .subscribe((resp) => {
        console.log(resp);
        
        expect(resp).toEqual(mockResult);
        done();
      });
  });

  // it('Deberia retornar Nivel Educativo (Id Existente)', (done: DoneFn) => {
    
  //   const id = '1'
  //   const mockResult: any = {
  //     nivelEducativo1: true,
  //     nivelEducativo2: true
  //   };

  //   getHttpClientSpy.get.and.returnValue(of(mockResult));

  //   nivelesEducativosService.getNivelById(id)
  //     .subscribe((resp) => {
  //       expect(resp).toEqual(mockResult);
  //       done();
  //     });
  // });

  // it('Deberia retornar mensaje de error: 404 (Id inexistente)', (done: DoneFn) => {
    
  //   const id = '99'
  //   const error404 = new HttpErrorResponse({
  //     error: 'Bad Id',
  //     status: 404,
  //     statusText: 'Not Found'
  //   });

  //   getHttpClientSpy.get.and.returnValue(throwError(error404));

  //   nivelesEducativosService.getNivelById(id)
  //     .subscribe((resp) => {
  //     }, (error) => {
  //       expect(error.status).toEqual(500);
  //       done();
  //     });
  // });

  // it('Crear nivel educativo (Caso exitoso)', (done: DoneFn) => {
    
  //   const token = 'xxxxx'
  //   const query: NivelesEducativos = {
  //     codniv: 'string',
  //     desniv: 'string',
  //     codley:'string',
  //     usrcre:'string',
  //     usract:'string',
  //   } 
  //   const mockResult: any = {
  //     response: true,
  //   };

  //   httpClientSpy.post.and.returnValue(of(mockResult));

  //   nivelesEducativosService.createNivel(query)
  //     .subscribe((resp) => {
  //       expect(resp).toEqual(mockResult);
  //       done();
  //     });
  // });

  // it('Crear nivel Educativo mensaje de error: any (caso incorrecto)', (done: DoneFn) => {
    
  //   const token = 'xxxxx'
  //   const query: NivelesEducativos = {
  //     codniv: 'string',
  //     desniv: 'string',
  //     codley:'string',
  //     usrcre:'string',
  //     usract:'string',
  //   } 
  //   const mockResult: any = {
  //     response: false,
  //   };

  //   httpClientSpy.post.and.returnValue(throwError(mockResult));

  //   nivelesEducativosService.createNivel(query)
  //     .subscribe((resp) => {
  //     }, (error) => {
  //       expect(error.status).toEqual(500);
  //       done();
  //     });
  // });

  // it('actualizar nivel educativo (Caso exitoso)', (done: DoneFn) => {
    
  //   const token = 'xxxxx'
  //   const query: NivelesEducativos = {
  //     codniv: 'string',
  //     desniv: 'string',
  //     codley:'string',
  //     usrcre:'string',
  //     usract:'string',
  //   } 
  //   const mockResult: any = {
  //     response: true,
  //   };

  //   putHttpClientSpy.put.and.returnValue(of(mockResult));

  //   nivelesEducativosService.updateNivel(query)
  //     .subscribe((resp) => {
  //       expect(resp).toEqual(mockResult);
  //       done();
  //     });
  // });

  // it('actualizar nivel Educativo mensaje de error: any (caso incorrecto)', (done: DoneFn) => {
    
  //   const token = 'xxxxx'
  //   const query: NivelesEducativos = {
  //     codniv: 'string',
  //     desniv: 'string',
  //     codley:'string',
  //     usrcre:'string',
  //     usract:'string',
  //   } 
  //   const mockResult: any = {
  //     response: false,
  //   };

  //   putHttpClientSpy.put.and.returnValue(throwError(mockResult));

  //   nivelesEducativosService.updateNivel(query)
  //     .subscribe((resp) => {
  //     }, (error) => {
  //       expect(error.status).toEqual(500);
  //       done();
  //     });
  // });


  // it('Obtener token (Caso erróneo)', () => {
  //   localStorage.setItem(KEY, JSON.stringify(''));
  //   expect(authService.getToken()).toBeUndefined();
  // });

  // it('SetToken to localstorage (Caso éxitoso)', () => {
  //   // TODO: Recibir el usuario del localStorage y actualizar el token enviado
  //   localStorage.setItem(KEY, JSON.stringify(USER));
  //   // TODO: Se envia un nuevo token
  //   const newToken =  'abcdfghbGci.abcdf.zxyilhe-rrr';
  //   authService.setToken(newToken);
  //   const auth: ResponseUser = authService.getAuth();
  //   expect(auth.tokenDeAcceso).toEqual(newToken);
  // });

  // it('SetToken to localstorage (Caso erróneo)', () => {
  //   // TODO: No se encuentra la key auth del localStorage y retorna el metodo 
  //   const newToken =  'abcdfghbGci.abcdf.zxyilhe-rrr';
  //   expect(authService.setToken(newToken)).toBeUndefined();
  // });

  // it('Cerrar sesión: redirigir al Login', fakeAsync( async() => {
  //   await router.navigate(['home']);
  //   await authService.closeSession();
  //   tick();
  //   expect(location.path()).toBe('/login');
  // }));

});
  