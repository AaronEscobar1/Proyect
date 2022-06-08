import { TestBed } from '@angular/core/testing';

// Servicios y componentes requeridos
import { StorageService } from './storage.service';

describe('StorageService', () => {

  let service: StorageService;
  const KEY : string = 'auth';
  const USER: any = { tokenDeAcceso: 'eyJhbGci.IiOiJ.xilhe-TNW', tipoDeToken: "Bearer", ssUsuario: { id: "ADP_SPITEST", claveAcceso: "CARACAS01"} };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  afterEach(() => {
    localStorage.clear();
  })

  it('Debe crearse el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });
  
  it('Obtener variable de localStorage (Caso éxitoso)', () => {
    localStorage.setItem(KEY, JSON.stringify(USER));
    expect(service.get(KEY).tipoDeToken).toBe('Bearer');
    expect(service.get(KEY).ssUsuario.id).toBe('ADP_SPITEST');
  });

  it('Obtener variable de localStorage', () => {
    localStorage.clear();
    expect(service.get('test')).toBeNull();
  });

  it('Setear variable a localStorage', () => {
    service.set(KEY, USER);
    const authTest = service.get(KEY);
    expect(authTest.tipoDeToken).toEqual('Bearer');
    expect(authTest.ssUsuario.id).toEqual('ADP_SPITEST');
  });

  it('Remover variable del localStorage', () => {
    service.set(KEY, USER);
    const authTest = service.remove(KEY);
    expect(authTest).toBeUndefined();
  });

  it('Limpiar el localStorage', () => {
    const clear = service.clear();
    expect(clear).toBeUndefined();
  });


});
