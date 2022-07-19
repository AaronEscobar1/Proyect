import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { EvaluacionesComponent } from './evaluaciones.component';
import { EvaluacionesService } from '../../services/evaluaciones.service';
import { Evaluaciones, TiposEvaluaciones } from '../../interfaces/evaluaciones.interfaces';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClasificacionOficialComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: EvaluacionesService;

  const URL = `${environment.api}/configuraciones/talentos/evaluaciones`;

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
        EvaluacionesComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(EvaluacionesService);

  }));

  it('Crear componente de Clasificacion Oficial correctamente', () => {
    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;
    expect(app.evaluaciones.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.evaluaciones.length).toBeGreaterThanOrEqual(0);
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.evaluaciones.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.evaluaciones.length).toBeGreaterThanOrEqual(0);  
  })

  it('Abrir Modal de impresion', async () => {
    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printModal).toBeFalse();
    app.openModalPrint();
    fixture.detectChanges();
    expect(app.printModal).toBeTrue();  
  })

  it('Cerrar Modal de impresion', async () => {
    const fixture = TestBed.createComponent(EvaluacionesComponent);
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
    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.titleForm).toBe('Agregar evaluación');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;
    
    // Simulamos el proceso de abrir el modal de Crear
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    expect(app.titleForm).toBe('Agregar evaluación');
    expect(app.createModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de Crear  
    expect(app.createModal).toBeTrue();    
    app.closeModal();
    expect(app.createModal).toBeFalse();  
  })

  it('Abrir modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;

    // seteamos data simulate
    const data: Evaluaciones = {
      "nombre": "eva 2",
      "descrip": "descripcion",
      "tipo": "03",
      "id": 4
    }

    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.evaluacionSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.evaluacionSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar evaluación');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;

    const data: Evaluaciones = {
      "nombre": "eva 2",
      "descrip": "descripcion",
      "tipo": "03",
      "id": 4
    }
    
    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.evaluacionSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.evaluacionSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar evaluación');
    expect(app.createModal).toBeTrue();  
    
    // Simulamos el proceso de cerrar el modal de Edicion
    expect(app.isEdit).toBeTrue();
    expect(app.evaluacionSelect).toBe(data);
    app.closeModal();
    fixture.detectChanges();
    expect(app.evaluacionSelect).toBe(undefined);
    expect(app.isEdit).toBeFalse();
    expect(app.createModal).toBeFalse(); 
  })

  it('Eliminar Niveles Educativos (caso fallido)', ()=>{

    const data: Evaluaciones = {
      "nombre": "eva 2",
      "descrip": "descripcion",
      "tipo": "03",
      "id": 4
    }

    const fixture = TestBed.createComponent(EvaluacionesComponent);
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

    const data: Evaluaciones = {
      "nombre": "eva 2",
      "descrip": "descripcion",
      "tipo": "03",
      "id": 4
    }

    const fixture = TestBed.createComponent(EvaluacionesComponent);
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

    const data: Evaluaciones[] = [
      {
        "nombre": "prueba jose45",
        "descrip": "333333333333333",
        "tipo": "01",
        "id": 45
      },
      {
        "nombre": "eva 2",
        "descrip": "descripcion",
        "tipo": "03",
        "id": 4
      }
    ]

    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;

    app.loadData()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.flush(data);
    expect(fakeBackend.request.method).toBe('GET');
  })

  it('Load types (Caso verdadero)', ()=>{

    const data: TiposEvaluaciones[] = [
      {
        "nombre": "Medica",
        "tipo": "01"
      },
      {
          "nombre": "Psicologica",
          "tipo": "02"
      },
      {
          "nombre": "Tecnica",
          "tipo": "03"
      }
    ]

    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;

    app.loadTiposEvaluaciones()

    const fakeBackend = httpTestingController.expectOne(`http://localhost:8080/api/configuraciones/talentos/tiposevaluaciones`);
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
    
    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;

    app.loadTiposEvaluaciones()

    const fakeBackend = httpTestingController.expectOne(`http://localhost:8080/api/configuraciones/talentos/tiposevaluaciones`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  })

  it('Load Data (Caso Falso)', ()=>{

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "No message available",   
    });
    
    const fixture = TestBed.createComponent(EvaluacionesComponent);
    const app = fixture.componentInstance;

    app.loadData()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  })
});
