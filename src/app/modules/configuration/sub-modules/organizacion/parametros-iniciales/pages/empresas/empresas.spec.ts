import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { EmpresasComponent } from './empresas.component';
import { ParametrosInicialesService } from '../../services/parametros-iniciales.service';
import { CompaniaService } from '../../../../nomina/empresa/empresas/services/compania.service';
import { Company } from '../../../../nomina/empresa/empresas/interfaces/compania.interfaces';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParametrosIniciales } from '../../interfaces/parametros-iniciales.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

describe('ClasificacionOficialComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: ParametrosInicialesService;

  const URL = `${environment.api}/configuraciones/nominas/tiposvacacionesvencer`;
  const URLCOMPANY = `${environment.api}/configuraciones/nominas/empresas`;

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

    services = TestBed.inject(ParametrosInicialesService);

  }));

  it('Crear componente de Clasificacion Oficial correctamente', () => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.detectChanges()
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;
    expect(app.companias.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.companias.length).toBeGreaterThanOrEqual(0);
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    expect(app.companias.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.companias.length).toBeGreaterThanOrEqual(0);  
  })

  it('Abrir Modal de impresion', async () => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printModal).toBeFalse();
    fixture.detectChanges();  
  })

  it('Cerrar Modal de impresion', async () => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printModal).toBeFalse();
    fixture.detectChanges();
    
  })

  it('Abrir modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.createModal).toBeFalse();
    expect(app.titleForm).toBe('Agregar empresa');
    fixture.detectChanges()
  })

  it('Cerrar Modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;
    
    // Simulamos el proceso de abrir el modal de Crear
    expect(app.createModal).toBeFalse();
    fixture.detectChanges();
      
  })

  it('Abrir modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;

    // seteamos data simulate
    const data: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 12,
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
      "fax": "10105",
      "paginaWeb": "www.null.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": "hola@gmail.com",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
        {
            "rel": "datosadicionales",
            "href": "/configuraciones/nominas/empresas/93/datosadicionales"
        }
      ]
    }

    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.companiaSelect).toBe(undefined);
    app.companiaSelect = data;
    fixture.detectChanges();
    expect(app.companiaSelect).toBe(data);
    expect(app.titleForm).toBe('Agregar empresa');
  })

  it('Cerrar Modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;

    const data: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 12,
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
      "fax": "10105",
      "paginaWeb": "www.null.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": "hola@gmail.com",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
        {
            "rel": "datosadicionales",
            "href": "/configuraciones/nominas/empresas/93/datosadicionales"
        }
      ]
    }
    
    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.companiaSelect).toBe(undefined);
    app.companiaSelect = data;
    fixture.detectChanges();
    expect(app.companiaSelect).toBe(data);
    expect(app.titleForm).toBe('Agregar empresa');
    
    // Simulamos el proceso de cerrar el modal de Edicion
    expect(app.companiaSelect).toBe(data);
    fixture.detectChanges();
    expect(app.isEdit).toBeFalse();
    expect(app.createModal).toBeFalse(); 
  })

  it('Load Data (Caso verdadero)', ()=>{

    const data: Company[] = [
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "1",
        "capitalPag": 12,
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
        "fax": "10105",
        "paginaWeb": "www.null.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date,
        "feInicio": new Date,
        "filemail": "hola@gmail.com",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
        ]
      },
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.A",
        "clave": "F195J9FDN520AJ0SC953W",
        "nombreAbrev": "FEDEX CORPORATIONN",
        "sectorEmp": "11",
        "publica": "1",
        "capitalPag": 12,
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
        "fax": "10105",
        "paginaWeb": "www.null.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date,
        "feInicio": new Date,
        "filemail": "hola@gmail.com",
        "subprocesoRnet": 175993,
        "id": "94",
        "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
        ]
      }
    ]

    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()

    app.loadData()

    const fakeBackend = httpTestingController.match(`${URLCOMPANY}`);
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
    fixture.detectChanges()

    app.loadData()

    const fakeBackend = httpTestingController.match(`${URLCOMPANY}`);
    fakeBackend[0].error(error);
    expect(fakeBackend[0].request.method).toBe('GET');

  })

  it('Load Data (Caso verdadero)', ()=>{

    const data: Company[] = [
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "1",
        "capitalPag": 12,
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
        "fax": "10105",
        "paginaWeb": "www.null.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date,
        "feInicio": new Date,
        "filemail": "hola@gmail.com",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
        ]
      },
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.A",
        "clave": "F195J9FDN520AJ0SC953W",
        "nombreAbrev": "FEDEX CORPORATIONN",
        "sectorEmp": "11",
        "publica": "1",
        "capitalPag": 12,
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
        "fax": "10105",
        "paginaWeb": "www.null.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date,
        "feInicio": new Date,
        "filemail": "hola@gmail.com",
        "subprocesoRnet": 175993,
        "id": "94",
        "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
        ]
      }
    ]

    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()

    app.loadTiposVacaciones()

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
    fixture.detectChanges()

    app.loadTiposVacaciones()

    const fakeBackend = httpTestingController.match(`${URL}`);
    fakeBackend[0].error(error);
    expect(fakeBackend[0].request.method).toBe('GET');

  })

  it('ngOnInit row', inject([SelectRowService], (service: SelectRowService) => {
    const fixture = TestBed.createComponent(EmpresasComponent);
    const app = fixture.componentInstance;
    const log = {
      "originalEvent": {
          "isTrusted": true
      },
      "data": {
          "codmot": "1",
          "desmot": "prueba 1",
          "fecact": "2022-05-03T22:20:36.682Z",
          "feccre": "2022-05-03T22:20:36.682Z",
          "usract": "",
          "usrcre": ""
      },
      "type": "row"
    }

    spyOn(service.selectRow$, 'emit').and.callThrough();
    
    app.ngOnInit();
    
    service.selectRow$.emit(log.data);
    const response = service.selectRow$.subscribe(row => app.empresaRow = row);

    expect(service.selectRow$.emit).not.toHaveBeenCalledWith(null);
    
  }));
});
