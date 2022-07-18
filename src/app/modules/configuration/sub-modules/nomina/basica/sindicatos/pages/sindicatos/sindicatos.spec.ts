import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { SindicatosComponent } from './sindicatos.component';
import { SindicatosService } from '../../services/sindicatos.service';
import { Sindicatos } from '../../interfaces/sindicatos.interfaces';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValorOficial } from '../../../valores-oficiales/interfaces/valor-oficial.interfaces';

describe('ClasificacionOficialComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: SindicatosService;

  const URL = `${environment.api}/configuraciones/nominas/sindicatos`;

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
        SindicatosComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(SindicatosService);

  }));

  it('Crear componente de Clasificacion Oficial correctamente', () => {
    const fixture = TestBed.createComponent(SindicatosComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(SindicatosComponent);
    const app = fixture.componentInstance;
    expect(app.sindicatos.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.sindicatos.length).toBeGreaterThanOrEqual(0);
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(SindicatosComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.sindicatos.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.sindicatos.length).toBeGreaterThanOrEqual(0);  
  })

  it('Abrir Modal de impresion', async () => {
    const fixture = TestBed.createComponent(SindicatosComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printModal).toBeFalse();
    app.openModalPrint();
    fixture.detectChanges();
    expect(app.printModal).toBeTrue();  
  })

  it('Cerrar Modal de impresion', async () => {
    const fixture = TestBed.createComponent(SindicatosComponent);
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
    const fixture = TestBed.createComponent(SindicatosComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.titleForm).toBe('Agregar sindicato');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(SindicatosComponent);
    const app = fixture.componentInstance;
    
    // Simulamos el proceso de abrir el modal de Crear
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    expect(app.titleForm).toBe('Agregar sindicato');
    expect(app.createModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de Crear  
    expect(app.createModal).toBeTrue();    
    app.closeModal();
    expect(app.createModal).toBeFalse();  
  })

  it('Abrir modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(SindicatosComponent);
    const app = fixture.componentInstance;

    // seteamos data simulate
    const data: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": '',
      "local": "0",
      "codsin": "666"
    };

    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.sindicatosSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.sindicatosSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar sindicato');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(SindicatosComponent);
    const app = fixture.componentInstance;

    const data: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": '',
      "local": "0",
      "codsin": "666"
    };
    
    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.sindicatosSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.sindicatosSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar sindicato');
    expect(app.createModal).toBeTrue();  
    
    // Simulamos el proceso de cerrar el modal de Edicion
    expect(app.isEdit).toBeTrue();
    expect(app.sindicatosSelect).toBe(data);
    app.closeModal();
    fixture.detectChanges();
    expect(app.sindicatosSelect).toBe(undefined);
    expect(app.isEdit).toBeFalse();
    expect(app.createModal).toBeFalse(); 
  })

  it('Eliminar Niveles Educativos (caso fallido)', ()=>{

    const data: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": '',
      "local": "0",
      "codsin": "666"
    };

    const fixture = TestBed.createComponent(SindicatosComponent);
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
    
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codsin}`); 

    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('DELETE'); 

  })

  it('Eliminar Niveles Educativos (caso verdadero)', ()=>{

    const data: Sindicatos = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": '',
      "local": "0",
      "codsin": "666"
    };

    const fixture = TestBed.createComponent(SindicatosComponent);
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

    const fakeBackend = httpTestingController.match(`${URL}/${data.codsin}`);
    fakeBackend[0].flush(resp);
    expect(fakeBackend[0].request.method).toBe('DELETE');

  })

  it('Load Data (Caso verdadero)', ()=>{

    const data: Sindicatos[] = [
      {
        "dessin": "prueba jose",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": null,
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": '',
        "local": "0",
        "codsin": "666"
      },
      {
        "dessin": "prueba jose",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": null,
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": '',
        "local": "0",
        "codsin": "666"
      }
    ]

    const fixture = TestBed.createComponent(SindicatosComponent);
    const app = fixture.componentInstance;

    app.loadData()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.flush(data);
    expect(fakeBackend.request.method).toBe('GET');

    const countryTrue = [
      {
        "nombre": "Venezuela",
        "codigo": "VEN",
        "links": [
            {
                "rel": "entidadesFederales",
                "href": "/entidadesfederales/VEN"
            }
        ]
      },
      {
        "nombre": "ARGENTINA",
        "codigo": "ARG",
        "links": [
            {
                "rel": "entidadesFederales",
                "href": "/entidadesfederales/ARG"
            }
        ]
      }
    ] 

    app.loadCountrysData()

    const fakeBackendCountry = httpTestingController.expectOne(`http://localhost:8080/api/configuraciones/organizaciones/paises`);
    fakeBackendCountry.flush(countryTrue);
    expect(fakeBackend.request.method).toBe('GET');
    
    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    app.loadCountrysData()

    const fakeBackendCountryFalse = httpTestingController.expectOne(`http://localhost:8080/api/configuraciones/organizaciones/paises`);
    fakeBackendCountryFalse.error(error);
    expect(fakeBackend.request.method).toBe('GET');




  })

  it('Load Data (Caso Falso)', ()=>{

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "No message available",   
    });
    
    const fixture = TestBed.createComponent(SindicatosComponent);
    const app = fixture.componentInstance;

    app.loadData()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  })
});
