import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { EmpresasComponent } from './empresas.component';
import { Company } from '../../interfaces/empresa.interfaces';
import { CompanyNominaService } from '../../services/company-nomina.service';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NivelesEducativosComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: CompanyNominaService;

  const URL = `${environment.api}/configuraciones/nominas/empresas`;

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        ConfirmDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [
        EmpresasComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(CompanyNominaService);

  }));

  it('Crear componente de Niveles Educativos correctamente', () => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;
    expect(app.companias.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.companias.length).toBeGreaterThanOrEqual(0);
  });

  it('Load Data (Caso verdadero)', ()=>{

    const data: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 21,
      "capitalSub": 12,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "0412121211",
      "paginaWeb": "null",
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": "hola",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;

    app.loadData()

    const fakeBackend = httpTestingController.match(`${URL}`);
    fakeBackend[0].flush(data);
    expect(fakeBackend[0].request.method).toBe('GET');

  })

  it('Load Data (Caso Falso)', ()=>{

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "No message available",   
    });
    
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;

    app.loadData()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  })
});
