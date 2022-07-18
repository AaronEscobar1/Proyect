import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { ClasificacionOficialComponent } from './clasificacion-oficial.component';
import { ClasificacionOficialService } from '../../services/clasificacion-oficial.service';
import { OfficialClassification } from '../../interfaces/clasificacion-oficial.interfaces';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClasificacionOficialComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: ClasificacionOficialService;

  const URL = `${environment.api}/configuraciones/nominas/clasificacionesoficiales`;

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
        ClasificacionOficialComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(ClasificacionOficialService);

  }));

  it('Crear componente de Clasificacion Oficial correctamente', () => {
    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
    const app = fixture.componentInstance;
    expect(app.officialClassification.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.officialClassification.length).toBeGreaterThanOrEqual(0);
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.officialClassification.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.officialClassification.length).toBeGreaterThanOrEqual(0);  
  })

  it('Abrir Modal de impresion', async () => {
    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printModal).toBeFalse();
    app.openModalPrint();
    fixture.detectChanges();
    expect(app.printModal).toBeTrue();  
  })

  it('Cerrar Modal de impresion', async () => {
    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
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
    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.titleForm).toBe('Agregar clasificación oficial');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
    const app = fixture.componentInstance;
    
    // Simulamos el proceso de abrir el modal de Crear
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    expect(app.titleForm).toBe('Agregar clasificación oficial');
    expect(app.createModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de Crear  
    expect(app.createModal).toBeTrue();    
    app.closeModal();
    expect(app.createModal).toBeFalse();  
  })

  it('Abrir modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
    const app = fixture.componentInstance;

    // seteamos data simulate
    const data: OfficialClassification = {
      "desofi": "De Dirección",
      "tiprep": "06",
      "codofi": "1"
    }

    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.officialClassificationSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.officialClassificationSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar clasificación oficial');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
    const app = fixture.componentInstance;

    const data: OfficialClassification = {
      "desofi": "De Dirección",
      "tiprep": "06",
      "codofi": "1"
    }
    
    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.officialClassificationSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.officialClassificationSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar clasificación oficial');
    expect(app.createModal).toBeTrue();  
    
    // Simulamos el proceso de cerrar el modal de Edicion
    expect(app.isEdit).toBeTrue();
    expect(app.officialClassificationSelect).toBe(data);
    app.closeModal();
    fixture.detectChanges();
    expect(app.officialClassificationSelect).toBe(undefined);
    expect(app.isEdit).toBeFalse();
    expect(app.createModal).toBeFalse(); 
  })

  it('Eliminar Niveles Educativos (caso fallido)', ()=>{

    const data: OfficialClassification = {
      "desofi": "De Dirección",
      "tiprep": "06",
      "codofi": "1"
    }

    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
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
    
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codofi}/${data.tiprep}`); 

    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('DELETE'); 

  })

  it('Eliminar Niveles Educativos (caso verdadero)', ()=>{

    const data: OfficialClassification = {
      "desofi": "De Dirección",
      "tiprep": "06",
      "codofi": "1"
    }

    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
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

    const fakeBackend = httpTestingController.match(`${URL}/${data.codofi}/${data.tiprep}`);
    fakeBackend[0].flush(resp);
    expect(fakeBackend[0].request.method).toBe('DELETE');

  })

  it('Load Data (Caso verdadero)', ()=>{

    const data: OfficialClassification[] = [
      {
        "desofi": "De Dirección",
        "tiprep": "06",
        "codofi": "1"
      },
      {
          "desofi": "De Inspeccion o Vigilancia",
          "tiprep": "06",
          "codofi": "2"
      },
      {
          "desofi": "Aprendiz Ince",
          "tiprep": "06",
          "codofi": "3"
      },
      {
          "desofi": "Pasante",
          "tiprep": "06",
          "codofi": "4"
      },
      {
          "desofi": "Trabajador Calificado",
          "tiprep": "06",
          "codofi": "5"
      },
      {
          "desofi": "Trabajador no Calificado",
          "tiprep": "06",
          "codofi": "8"
      },
    ]

    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
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
    
    const fixture = TestBed.createComponent(ClasificacionOficialComponent);
    const app = fixture.componentInstance;

    app.loadData()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  })
});
