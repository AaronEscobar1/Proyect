import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Servicios y componentes requeridos
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

describe('HttpService', () => {
  
  let service : HttpService;
  let httpClientSpy : { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpService
      ]
    });

    service = TestBed.inject(HttpService);

    // Peticiones mock
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new HttpService(httpClientSpy as any);
  });

  it('Debe crearse el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia hacer petición GET correctamente', (done: DoneFn) => {

    const mockResult = { 
      data: [
        { codprf: '01', desprf: 'Ingeniero' },   
        { codprf: '02', desprf: 'Licenciado'}, 
        { codprf: '03', desprf: 'Doctor'    }
      ],
      status: 'success'
    };
    
    httpClientSpy.get.and.returnValue(of(mockResult));
    
    service.get(`${environment.api}/profesion`)
      .subscribe( (result: any) => {
        expect(result).toEqual(mockResult);
        expect(result.status).toEqual('success');
        done();
      })
  });

  it('Deberia hacer petición POST correctamente', (done: DoneFn) => {
    const mockData   = { codprf: '01', desprf: 'Profesion 1' };
    const mockResult = {
      data: { codprf: '01', desprf: 'Profesion 1' },
      message: 'La profesion se ha creado con exito.',
      status : 'success'
    };

    httpClientSpy.post.and.returnValue(of(mockResult));

    service.post(`${environment.api}/profesion`, mockData)
      .subscribe((result: any) => {
        expect(result).toEqual(mockResult);
        expect(result.message).toEqual(mockResult.message);
        expect(result.status).toEqual('success');
        done();
      });
  });

  it('Deberia hacer petición PUT correctamente', (done: DoneFn) => {
    const mockData   = { codprf: '01', desprf: 'TSU' };
    const mockResult = {
      data: { codprf: '01', desprf: 'TSU' },
      message: 'La profesión ha sido actualizado con éxito.',
      status : 'success'
    };

    httpClientSpy.put.and.returnValue(of(mockResult));

    service.put(`${environment.api}/profesion/${mockData.codprf}`, mockData)
      .subscribe((result: any) => {
        expect(result).toEqual(mockResult);
        expect(result.message).toEqual(mockResult.message);
        expect(result.status).toEqual('success');
        done();
      });
  });

  it('Deberia hacer petición DELETE correctamente', (done: DoneFn) => {
    const mockID = '01'
    const mockResult = {
      message: 'Profesion eliminado con éxito.',
      status: 'success'
    };

    httpClientSpy.delete.and.returnValue(of(mockResult));

    service.delete(`${environment.api}/profesion/${mockID}`)
      .subscribe((result: any) => {
        expect(result).toEqual(mockResult);
        expect(result.message).toEqual(mockResult.message);
        expect(result.status).toEqual('success');
        done();
      });
  });


});
