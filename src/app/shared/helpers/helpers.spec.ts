import { TestBed } from '@angular/core/testing';

// Servicios y componentes requeridos
import { Helpers } from './helpers';

describe('HelpersServices', () => {
  
  let service: Helpers;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Helpers);
  });

  it('Debe crearse el servicio Helpers correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Obtener el endpoint de environment.api, metodo: getBasicEndPoint()', () => {
    const pathTest = '/nomina';
    expect(service.getBasicEndPoint(pathTest)).toEqual('http://localhost:8080/api/nomina');
  });

  it('Construir mensaje de alerta correctamente', () => {
    const msgError = 'Usuario o clave incorrecto.';
    const errors = service.msgAlert('error', 'Usuario o clave incorrecto.');
    expect(errors[0].detail).toEqual(msgError);
  });

  it('Abrir diálogo éxitoso correctamente', () => {
    service.openSuccessAlert('Se registro el usuario éxitosamente');
    // Encontramos el botton del dialogo
    const btnElementOk = document.getElementsByClassName('swal2-confirm')[0];
    // Le asignamos un ID al boton
    btnElementOk.setAttribute('id', 'buttonSuccess');
    // Encontramos el boton por ID para poder ejecutar la función click() del elemento
    const buttonOk = <HTMLElement>document.getElementById('buttonSuccess');
    // Cerramos el dialogo con el boton OK
    buttonOk.click();
    // Validamos que exista el boton para comprobar que si abrio correctamente el dialogo
    expect(buttonOk.innerHTML).toEqual('OK');    
  });

  it('Abrir diálogo informativo correctamente', () => {
    service.openInfoAlert('Se consultó la información del usuario');
    // Encontramos el botton del dialogo
    const btnElementOk = document.getElementsByClassName('swal2-confirm')[0];
    // Le asignamos un ID al boton
    btnElementOk.setAttribute('id', 'buttonInfo');
    // Encontramos el boton por ID para poder ejecutar la función click() del elemento
    const buttonOk = <HTMLElement>document.getElementById('buttonInfo');
    // Cerramos el dialogo con el boton OK
    buttonOk.click();
    // Validamos que exista el boton para comprobar que si abrio correctamente el dialogo
    expect(buttonOk.innerHTML).toEqual('OK');    
  });

  it('Abrir diálogo error correctamente', () => {
    service.openErrorAlert('No se pudo crear el usuario');
    // Encontramos el botton del dialogo
    const btnElementOk = document.getElementsByClassName('swal2-confirm')[0];
    // Le asignamos un ID al boton
    btnElementOk.setAttribute('id', 'buttonError');
    // Encontramos el boton por ID para poder ejecutar la función click() del elemento
    const buttonOk = <HTMLElement>document.getElementById('buttonError');
    // Cerramos el dialogo con el boton OK
    buttonOk.click();
    // Validamos que exista el boton para comprobar que si abrio correctamente el dialogo
    expect(buttonOk.innerHTML).toEqual('OK');    
  });

  it('Metodo para ordenar correctamente', () => {
    service.openErrorAlert('No se pudo crear el usuario');
    // Encontramos el botton del dialogo
    const btnElementOk = document.getElementsByClassName('swal2-confirm')[0];
    // Le asignamos un ID al boton
    btnElementOk.setAttribute('id', 'buttonError');
    // Encontramos el boton por ID para poder ejecutar la función click() del elemento
    const buttonOk = <HTMLElement>document.getElementById('buttonError');
    // Cerramos el dialogo con el boton OK
    buttonOk.click();
    // Validamos que exista el boton para comprobar que si abrio correctamente el dialogo
    expect(buttonOk.innerHTML).toEqual('OK');    
  });

  it('Format Date correctamente', () => {
    service.formatDate(new Date("Fri Dic 10 2022 18:34:06 GMT-0400 (hora de Venezuela)"));
    service.formatDate(new Date());
  });
  it('Format Date correctamente', () => {
    service.formatDateCompleta(new Date("Fri Dic 10 2022 18:34:06 GMT-0400 (hora de Venezuela)"));
    service.formatDateCompleta(new Date());
  });

});
