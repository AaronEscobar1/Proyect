import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { By } from '@angular/platform-browser';

// Servicios y componentes requeridos
import { LoginComponent } from './login.component';
import { environment } from 'src/environments/environment';

describe('LoginComponen', () => {

  let httpTestingController: HttpTestingController;

  const KEY   : string = 'auth';
  const URL = `${environment.api}/auth/iniciarSesion`;
  const USER  : any    = { tokenDeAcceso: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBRFBfU1BJVEVTVCIsImlhdCI6MTY0ODgzMjI2NCwiZXhwIjoxNjQ5NDM3MDY0fQ.-NkxaIgMCLJaFfwkXNPEfgO0EVnjPbGWjgj12tGqMu4RTSmuwprsAMddWzxz2k75OiLzGeZCnttcLWOiazXqaw', tipoDeToken: "Bearer", ssUsuario: { id: "ADP_SPITEST", claveAcceso: "CARACAS01"} };
  const routes: Routes = [{ path: '', children: [ { path: 'login', component: LoginComponent }, { path: '**', redirectTo: 'login' }]} ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        LoginComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach( () => {
    localStorage.removeItem(KEY);
    httpTestingController.verify();
  });

  it('Crear componente de Login correctamente', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', (() => {
    localStorage.setItem(KEY, JSON.stringify(USER));
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    fixture.detectChanges();
    expect(app.loginSuccess()).toBeTrue();
  }));

  it('Validar formulario invalido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.login();
    expect(app.loginForm.invalid).toBeTrue();
  });

  it('Validar login correctamente', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    // Setear usuario al formulario
    const usernameOrEmail = app.loginForm.controls['usernameOrEmail'];
    usernameOrEmail.setValue('jramirez');
    const password = app.loginForm.controls['password'];
    password.setValue('jramirez1515');

    // Simular click al boton ingresar
    const btnElement = fixture.debugElement.query(By.css('button.btn-infocent'));
    btnElement.nativeElement.click();

    // validar que el formulario sea verdadero
    expect(app.loginForm.valid).toBeTrue();

    // Simular la petición hacia el backend
    const mockResult: any = {
      tokenDeAcceso: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBRFBfU1BJVEVTVCIsI…tGqMu4RTSmuwprsAMddWzxz2k75OiLzGeZCnttcLWOiazXqaw",
      tipoDeToken: "Bearer",
      ssUsuario: {
        id: "jramirez",
        claveAcceso: "jramirez1515",
      }
    };

    // Invocar un suscribe desde la función
    const fakeBackend = httpTestingController.expectOne(URL);
    // Emitir un suscribe en la petición al backend authenticateUser()
    fakeBackend.flush(mockResult);
    // Verificar si la petición se hizo correcta
    expect(fakeBackend.request.method).toBe('POST');
  });

  it('Validar login con error de credenciales, (error 401)', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    // Setear usuario al formulario con credenciales incorrectas
    const usernameOrEmail = app.loginForm.controls['usernameOrEmail'];
    usernameOrEmail.setValue('jramirez');
    const password = app.loginForm.controls['password'];
    password.setValue('144477');

    // Simular click al boton ingresar
    const btnElement = fixture.debugElement.query(By.css('button.btn-infocent'));
    btnElement.nativeElement.click();

    // validar que el formulario sea verdadero
    expect(app.loginForm.valid).toBeTrue();

    // Simular error en la petición hacia el backend
    const error = new ErrorEvent('', {
      error : new Error('Error'),
      message : 'Bad credentials',
      lineno : 500,
      filename : ''   
    });

    // Invocar un suscribe desde la función
    const fakeBackend = httpTestingController.expectOne(URL);
    // Emitir un suscribe en la petición al backend authenticateUser() con errores
    fakeBackend.error(error);
    // Verificar si la petición se hizo correcta
    expect(fakeBackend.request.method).toBe('POST');
  });

  
  it('Validar login sin conexión al servidor, (error 500)', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    // Setear usuario al formulario con credenciales correctas
    const usernameOrEmail = app.loginForm.controls['usernameOrEmail'];
    usernameOrEmail.setValue('jramirez');
    const password = app.loginForm.controls['password'];
    password.setValue('123456');

    // Simular click al boton ingresar
    const btnElement = fixture.debugElement.query(By.css('button.btn-infocent'));
    btnElement.nativeElement.click();

    // Validar que el formulario sea verdadero
    expect(app.loginForm.valid).toBeTrue();

    // Simular error en la petición hacia el backend
    const error = new ErrorEvent('', {
      message : 'Unknown.',
      lineno : 500,
      filename : ''
    });

    // Invocar un suscribe desde la función
    const fakeBackend = httpTestingController.expectOne(URL);
    // Emitir un suscribe en la petición al backend authenticateUser() con errores
    fakeBackend.error(error);
    // Verificar si la petición se hizo correcta
    expect(fakeBackend.request.method).toBe('POST');
  
    app.getDetectPrivateMode()
  });

  it('Validar login sin conexión al servidor, (error 500)', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.getDetectPrivateMode()
  });

});
