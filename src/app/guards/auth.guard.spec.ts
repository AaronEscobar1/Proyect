import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Routes, Router } from '@angular/router';

// Servicios y componentes requeridos
import { AuthGuard } from './auth.guard';
import { HomeComponent } from '../modules/home/home.component';
import { LoginComponent } from '../auth/pages/login/login.component';

describe('AuthGuard', () => {

  let guard      : AuthGuard;
  let router     : Router;
  
  const KEY   : string = 'auth'; 
  const USER  : any    = { tokenDeAcceso: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBRFBfU1BJVEVTVCIsImlhdCI6MTY0ODgzMjI2NCwiZXhwIjoxNjQ5NDM3MDY0fQ.-NkxaIgMCLJaFfwkXNPEfgO0EVnjPbGWjgj12tGqMu4RTSmuwprsAMddWzxz2k75OiLzGeZCnttcLWOiazXqaw', tipoDeToken: "Bearer", ssUsuario: { id: "ADP_SPITEST", claveAcceso: "CARACAS01"} };
  const routes: Routes = [ { path: 'home', component: HomeComponent}, { path: '', children: [ { path: 'login', component: LoginComponent } ] } ];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ]
    });

    guard  = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  afterEach( () => {
    localStorage.removeItem(KEY);
  });

  it('Debe crearse el AuthGuard correctamente', () => {
    expect(guard).toBeTruthy();
  });

  it('Comprobar el canActive (Caso éxitoso)', () => {
    localStorage.setItem(KEY, JSON.stringify(USER));
    expect(guard.canActivate()).toBeTrue();
  });

  it('Comprobar el canActive (Caso erróneo)', async() => {
    expect(guard.canActivate()).toBeFalse();
  });
  
  it('Comprobar el canActivateChild (Caso éxitoso)', () => {
    localStorage.setItem(KEY, JSON.stringify(USER));
    expect(guard.canActivateChild()).toBeTrue();
  });

  it('Comprobar el canActivateChild (Caso erróneo)', async() => {
    expect(guard.canActivateChild()).toBeFalse();
  });

});
