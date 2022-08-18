import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { GrupoTrabajoService } from '../../services/grupo-trabajo.service';
import { GrupoTrabajo } from '../../interfaces/grupo-trabajo.interfaces';
import { GrupoTrabajoComponent } from './grupo-trabajo.component';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NivelesEducativosComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: GrupoTrabajoService;

  const URL = `${environment.api}/configuraciones/nominas/empresas/93/nominas/0001/grupos`;

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
        GrupoTrabajoComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(GrupoTrabajoService);

  }));

  it('Crear componente de Niveles Educativos correctamente', () => {
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
    const app = fixture.componentInstance;
    expect(app.gruposTrabajo.length).toBe(0);
    fixture.detectChanges();
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.gruposTrabajo.length).toBe(0);  
  })

  it('Abrir Modal de impresion', async () => {
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printModal).toBeFalse();
    app.openModalPrint();
    fixture.detectChanges();
    expect(app.printModal).toBeTrue();  
  })

  it('Cerrar Modal de impresion', async () => {
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
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
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.titleForm).toBe('Agregar grupo de trabajo');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
    const app = fixture.componentInstance;
    
    // Simulamos el proceso de abrir el modal de Crear
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    expect(app.titleForm).toBe('Agregar grupo de trabajo');
    expect(app.createModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de Crear  
    expect(app.createModal).toBeTrue();    
    app.closeModal();
    expect(app.createModal).toBeFalse();  
  })

  it('Abrir modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
    const app = fixture.componentInstance;

    // seteamos data simulate
    const data: GrupoTrabajo = {
      "desgru": "descripción",
      "labdom": "1",
      "tipoJornada": {
          "id": "D",
          "descripcion": "Diurna"
      },
      "codgru": "D"
    }

    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.grupoTrabajoSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.grupoTrabajoSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar grupo de trabajo');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
    const app = fixture.componentInstance;

    const data: GrupoTrabajo = {
      "desgru": "descripción",
      "labdom": "1",
      "tipoJornada": {
          "id": "D",
          "descripcion": "Diurna"
      },
      "codgru": "D"
    }
    
    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.grupoTrabajoSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.grupoTrabajoSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar grupo de trabajo');
    expect(app.createModal).toBeTrue();  
    
    // Simulamos el proceso de cerrar el modal de Edicion
    expect(app.isEdit).toBeTrue();
    expect(app.grupoTrabajoSelect).toBe(data);
    app.closeModal();
    fixture.detectChanges();
    expect(app.grupoTrabajoSelect).toBe(undefined);
    expect(app.isEdit).toBeFalse();
    expect(app.createModal).toBeFalse(); 
  })

  it('Eliminar Niveles Educativos (caso fallido)', ()=>{
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
    const app = fixture.componentInstance;

    app.empresaRow = {
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.nominaRow = {
      "tipnom": "0001",
      "desnom": "Empleados Directos",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": null,
      "fecto2": null,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 21,
      "canmin": 12,
      "facgua": 21,
      "asifon": 12,
      "dedfon": 21,
      "valfon": 0.5,
      "fecabo": null,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "1",
      "anocom": "0",
      "pgmrec": "21",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    const data: GrupoTrabajo = {
      "desgru": "descripción",
      "labdom": "1",
      "tipoJornada": {
          "id": "D",
          "descripcion": "Diurna"
      },
      "codgru": "D"
    }

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
    
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codgru}`); 
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('DELETE'); 

  })

  it('Eliminar Niveles Educativos Otro Mensaje (caso fallido)', ()=>{
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
    const app = fixture.componentInstance;

    app.empresaRow = {
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.nominaRow = {
      "tipnom": "0001",
      "desnom": "Empleados Directos",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": null,
      "fecto2": null,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 21,
      "canmin": 12,
      "facgua": 21,
      "asifon": 12,
      "dedfon": 21,
      "valfon": 0.5,
      "fecabo": null,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "1",
      "anocom": "0",
      "pgmrec": "21",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    const data: GrupoTrabajo = {
      "desgru": "descripción",
      "labdom": "1",
      "tipoJornada": {
          "id": "D",
          "descripcion": "Diurna"
      },
      "codgru": "D"
    }

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error",   
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
    
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codgru}`); 
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('DELETE'); 

  })

  it('Eliminar Niveles Educativos (caso verdadero)', ()=>{
    const fixture = TestBed.createComponent(GrupoTrabajoComponent);
    const app = fixture.componentInstance;

    app.empresaRow = {
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.nominaRow = {
      "tipnom": "0001",
      "desnom": "Empleados Directos",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": null,
      "fecto2": null,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 21,
      "canmin": 12,
      "facgua": 21,
      "asifon": 12,
      "dedfon": 21,
      "valfon": 0.5,
      "fecabo": null,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "1",
      "anocom": "0",
      "pgmrec": "21",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    const data: GrupoTrabajo = {
      "desgru": "descripción",
      "labdom": "1",
      "tipoJornada": {
          "id": "D",
          "descripcion": "Diurna"
      },
      "codgru": "D"
    }

    
    const resp = {
      "message": "Nivel eliminado con éxito.",
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

    const fakeBackend = httpTestingController.match(`${URL}/${data.codgru}`);
    fakeBackend[0].flush(resp);
    expect(fakeBackend[0].request.method).toBe('DELETE');

  })

});
