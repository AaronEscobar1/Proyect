import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { CompaniaComponent } from './compania.component';
import { CompaniaService } from '../../services/compania.service';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Company } from '../../interfaces/compania.interfaces';

describe('ClasificacionOficialComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: CompaniaService;

  const URL = `${environment.api}/empresas`;

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
        CompaniaComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(CompaniaService);

  }));

  it('Crear componente de Clasificacion Oficial correctamente', () => {
    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;
    expect(app.companias.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.companias.length).toBeGreaterThanOrEqual(0);
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.companias.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.companias.length).toBeGreaterThanOrEqual(0);  
  })

  it('Abrir Modal de impresion', async () => {
    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printModal).toBeFalse();
    app.openModalPrint();
    fixture.detectChanges();
    expect(app.printModal).toBeTrue();  
  })

  it('Cerrar Modal de impresion', async () => {
    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printModal).toBeFalse();
    app.openModalPrint();
    expect(app.printModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de impresion  
    expect(app.printModal).toBeTrue();
    app.closeModalPrintDialog();
    expect(app.printModal).toBeFalse();
    
  })

  it('Abrir modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.titleForm).toBe('Agregar compañia');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;
    
    // Simulamos el proceso de abrir el modal de Crear
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    expect(app.titleForm).toBe('Agregar compañia');
    expect(app.createModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de Crear  
    expect(app.createModal).toBeTrue();    
    app.closeModal();
    expect(app.createModal).toBeFalse();  
  })

  it('Abrir modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;

    // seteamos data simulate
    const data: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 1,
      "capitalSub": 1,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "04244561236",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.empresa.com",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/empresas/93/datosadicionales"
          }
      ]
  };

    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.companiaSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.companiaSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar compañia');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;

    const data: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 1,
      "capitalSub": 1,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "04244561236",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.empresa.com",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/empresas/93/datosadicionales"
          }
      ]
    };
    
    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.companiaSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.companiaSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar compañia');
    expect(app.createModal).toBeTrue();  
    
    // Simulamos el proceso de cerrar el modal de Edicion
    expect(app.isEdit).toBeTrue();
    expect(app.companiaSelect).toBe(data);
    app.closeModal();
    fixture.detectChanges();
    expect(app.companiaSelect).toBe(undefined);
    expect(app.isEdit).toBeFalse();
    expect(app.createModal).toBeFalse(); 
  })

  it('Eliminar Niveles Educativos (caso fallido)', ()=>{

    const data: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 1,
      "capitalSub": 1,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "04244561236",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.empresa.com",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/empresas/93/datosadicionales"
          }
      ]
    };

    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    let confirmDialog: ConfirmDialog;
    confirmDialog = fixture.debugElement.query(By.css('p-confirmdialog')).componentInstance; 
    
    let accept = spyOn(confirmDialog, "accept").and.callThrough();
    confirmDialog.visible = true;
    app.deleteRow(data);
    fixture.detectChanges(); 
    let acceptBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-accept');
    acceptBtn.click();
    expect(accept).toHaveBeenCalled();
    
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`); 

    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('DELETE'); 

  })

  it('Eliminar Niveles Educativos (caso verdadero)', ()=>{

    const data: Company = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 1,
      "capitalSub": 1,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "04244561236",
      "paginaWeb": "www.algo.com",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.empresa.com",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/empresas/93/datosadicionales"
          }
      ]
    };

    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;

    const resp = {
      "message": "Forma de pago eliminado con éxito.",
      "status": "success"
    }

    let confirmDialog: ConfirmDialog;
    confirmDialog = fixture.debugElement.query(By.css('p-confirmdialog')).componentInstance; 
    
    let accept = spyOn(confirmDialog, "accept").and.callThrough();
    confirmDialog.visible = true;
    app.deleteRow(data);
    fixture.detectChanges(); 
    let acceptBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-accept');
    acceptBtn.click();
    expect(accept).toHaveBeenCalled();

    const fakeBackend = httpTestingController.match(`${URL}/${data.id}`);
    fakeBackend[0].flush(resp);
    expect(fakeBackend[0].request.method).toBe('DELETE');

  })

  it('Load Data (Caso verdadero)', ()=>{

    const data: Company[] = [
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "1",
        "capitalPag": 1,
        "capitalSub": 1,
        "rif1": "J-00301656-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "1070",
        "telefono1": "582122053152",
        "telefono2": null,
        "fax": "04244561236",
        "paginaWeb": "www.algo.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date(),
        "feInicio": new Date(),
        "filemail": "www.empresa.com",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
            {
                "rel": "datosadicionales",
                "href": "/empresas/93/datosadicionales"
            }
        ]
      },
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "1",
        "capitalPag": 1,
        "capitalSub": 1,
        "rif1": "J-00301656-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "1070",
        "telefono1": "582122053152",
        "telefono2": null,
        "fax": "04244561236",
        "paginaWeb": "www.algo.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date(),
        "feInicio": new Date(),
        "filemail": "www.empresa.com",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
            {
                "rel": "datosadicionales",
                "href": "/empresas/93/datosadicionales"
            }
        ]
      }
    ]

    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;

    app.loadData()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.flush(data);
    expect(fakeBackend.request.method).toBe('GET');

   
  })

  it('Load Data (Caso Falso)', ()=>{

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "No message available",   
    });
    
    const fixture = TestBed.createComponent(CompaniaComponent);
    const app = fixture.componentInstance;

    app.loadData()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  })
});
