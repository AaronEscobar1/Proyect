import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { of, throwError } from 'rxjs';

// Servicios y componentes requeridos
import { AuthService } from './auth.service';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../../modules/home/home.component';
import { ResponseUser } from '../interfaces/response-user.interfaces';

describe('AuthService', () => {

  let authService   : AuthService;
  let router        : Router;
  let httpClientSpy : { post: jasmine.Spy };
  let location      : Location;

  const KEY   : string = 'auth'; 
  const USER  : any    = { tokenDeAcceso: 'eyJhbGci.IiOiJ.xilhe-TNW', tipoDeToken: "Bearer", ssUsuario: { id: "ADP_SPITEST", claveAcceso: "CARACAS01"} };
  const routes: Routes = [ { path: 'home', component: HomeComponent}, { path: '', children: [ { path: 'login', component: LoginComponent } ] } ];

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [],
      providers: [ AuthService ]
    });

    authService = TestBed.inject(AuthService);
    router      = TestBed.inject(Router);
    location    = TestBed.inject(Location);

    // Peticiones mock
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authService = new AuthService(router as Router, httpClientSpy as any);

    router.initialNavigation();
  });

  afterEach( () => {
    localStorage.removeItem(KEY);
  });

  it('Debe crearse el servicio correctamente', () => {
    expect(authService).toBeTruthy();
  });

  it('Deberia retornar objeto usuario (Login Correcto)', (done: DoneFn) => {
    
    const mockUser = { usernameOrEmail : "ADP_SPITEST", password: "CARACAS01" };
    const mockResult: any = {
      tokenDeAcceso: "eyJhbGcUxMiJ9.eyJzdWIiOiJBRFBNiwiZXhwIjoxNjQ5Mjc2MDI2fQ.htWVfYxilhe-TNWOVX9Ek3jFQ3PkHdd90Lw",
      ssUsuario: {
        id: "ADP_SPITEST",
        claveAcceso: "CARACAS01",
      }
    };

    httpClientSpy.post.and.returnValue(of(mockResult));

    authService.authenticateUser(mockUser)
      .subscribe((resp) => {
        expect(resp).toEqual(mockResult);
        done();
      });
  });

  it('Deberia retornar mensaje de error: Bad credentials (Login incorrecto)', (done: DoneFn) => {
    
    const mockUser = { usernameOrEmail : "ADP_SPITEST", password: "VNZLA2022" };
    const error500 = new HttpErrorResponse({
      error: 'Bad credentials',
      status: 500,
      statusText: 'Not Found'
    });

    httpClientSpy.post.and.returnValue(throwError(error500));

    authService.authenticateUser(mockUser)
      .subscribe((resp) => {
        
      }, (error) => {
        expect(error.status).toEqual(500);
        done();
      });
  });

  it('Obtener token del localstorage (Caso éxitoso)', () => {
    localStorage.setItem(KEY, JSON.stringify(USER));
    expect(authService.getToken()).toEqual('eyJhbGci.IiOiJ.xilhe-TNW');
  });

  it('Obtener token (Caso erróneo)', () => {
    localStorage.setItem(KEY, JSON.stringify(''));
    expect(authService.getToken()).toBeUndefined();
  });

  it('SetToken to localstorage (Caso éxitoso)', () => {
    // TODO: Recibir el usuario del localStorage y actualizar el token enviado
    localStorage.setItem(KEY, JSON.stringify(USER));
    // TODO: Se envia un nuevo token
    const newToken =  'abcdfghbGci.abcdf.zxyilhe-rrr';
    authService.setToken(newToken);
    const auth: ResponseUser = authService.getAuth();
    expect(auth.tokenDeAcceso).toEqual(newToken);
  });

  it('SetToken to localstorage (Caso erróneo)', () => {
    // TODO: No se encuentra la key auth del localStorage y retorna el metodo 
    const newToken =  'abcdfghbGci.abcdf.zxyilhe-rrr';
    expect(authService.setToken(newToken)).toBeUndefined();
  });

  it('Cerrar sesión: redirigir al Login', fakeAsync( async() => {
    await router.navigate(['home']);
    await authService.closeSession();
    tick();
    expect(location.path()).toBe('/login');
  }));

});
