import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { PreguntaService } from '../../services/pregunta.service';
import { PreguntaComponent } from './pregunta.component';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreguntaEntrevista, TipoPregunta } from '../../interfaces/pregunta.interfaces';

describe('ClasificacionOficialComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: PreguntaService;

  const URL = `${environment.api}/configuraciones/talentos/preguntas`;

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
        PreguntaComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(PreguntaService);

  }));

  it('Crear componente de Clasificacion Oficial correctamente', () => {
    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;
    expect(app.preguntas.length).toBe(0);
    app.loadPreguntas();
    fixture.detectChanges();
    app.entrevistaRow = {
      "nombre": "Entrevista funcional",
      "id": 0,
    }

    app.preguntas = []

    app.ngOnChanges()

    app.preguntas = [
      {
        "titulo": "pregunta 11",
        "cerrada": "1",
        "idEntrevista": 3,
        "id": 11
      },
      {
        "titulo": "prueba",
        "cerrada": "0",
        "idEntrevista": 3,
        "id": 12
      }
    ];

    app.ngOnChanges()

    expect(app.preguntas.length).toBeGreaterThanOrEqual(0);
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.preguntas.length).toBe(0);
    app.loadPreguntas();
    fixture.detectChanges();
    expect(app.preguntas.length).toBeGreaterThanOrEqual(0);  
  })

  it('Abrir modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;

    const data: PreguntaEntrevista = {
      "titulo": "pregunta 11",
      "cerrada": "1",
      "idEntrevista": 3,
      "id": 11
    }

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.titleForm).toBe('Agregar pregunta');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;
    
    const data: PreguntaEntrevista = {
      "titulo": "pregunta 11",
      "cerrada": "1",
      "idEntrevista": 3,
      "id": 11
    }

    // Simulamos el proceso de abrir el modal de Crear
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    expect(app.titleForm).toBe('Agregar pregunta');
    expect(app.createModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de Crear  
    expect(app.createModal).toBeTrue();    
    app.closeModal();
    expect(app.createModal).toBeFalse();  
  })

  it('Abrir modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;

    // seteamos data simulate
    const data: PreguntaEntrevista = {
      "titulo": "pregunta 11",
      "cerrada": "1",
      "idEntrevista": 3,
      "id": 11
    }

    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.preguntaSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.preguntaSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar pregunta');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;

    const data: PreguntaEntrevista = {
      "titulo": "pregunta 11",
      "cerrada": "1",
      "idEntrevista": 3,
      "id": 11
    }
    
    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.preguntaSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.preguntaSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar pregunta');
    expect(app.createModal).toBeTrue();  
    
    // Simulamos el proceso de cerrar el modal de Edicion
    expect(app.isEdit).toBeTrue();
    expect(app.preguntaSelect).toBe(data);
    app.closeModal();
    fixture.detectChanges();
    expect(app.preguntaSelect).toBe(undefined);
    expect(app.isEdit).toBeFalse();
    expect(app.createModal).toBeFalse(); 
  })

  it('Eliminar Niveles Educativos (caso fallido)', ()=>{

    const data: PreguntaEntrevista = {
      "titulo": "pregunta 11",
      "cerrada": "1",
      "idEntrevista": 3,
      "id": 11
    }

    const fixture = TestBed.createComponent(PreguntaComponent);
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

  it('Eliminar Niveles Educativos (caso fallido)', ()=>{

    const data: PreguntaEntrevista = {
      "titulo": "pregunta 11",
      "cerrada": "1",
      "idEntrevista": 3,
      "id": 11
    }

    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicituddd.",   
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

    const data: PreguntaEntrevista = {
      "titulo": "pregunta 11",
      "cerrada": "1",
      "idEntrevista": 3,
      "id": 11
    }

    const fixture = TestBed.createComponent(PreguntaComponent);
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

    const data: PreguntaEntrevista[] = [
      {
        "titulo": "pregunta 11",
        "cerrada": "1",
        "idEntrevista": 3,
        "id": 11
      },
      {
        "titulo": "prueba",
        "cerrada": "0",
        "idEntrevista": 3,
        "id": 12
      }
    ]

    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;
    
    app.entrevistaRow = {
      "nombre": "Entrevista funcional",
      "id": 2,
    }


    app.loadPreguntas()

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
    
    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;

    app.entrevistaRow = {
      "nombre": "Entrevista funcional",
      "id": 2,
    }

    app.loadPreguntas()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  })

  it('Load Data (Caso verdadero)', ()=>{

    const data: PreguntaEntrevista[] = [
      {
        "titulo": "pregunta 11",
        "cerrada": "1",
        "idEntrevista": 3,
        "id": 11
      },
      {
        "titulo": "prueba",
        "cerrada": "0",
        "idEntrevista": 3,
        "id": 12
      }
    ]

    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;
    
    app.entrevistaRow = {
      "nombre": "Entrevista funcional",
      "id": 2,
    }

    app.loadTipoPreguntas()

    const fakeBackend = httpTestingController.expectOne(`${environment.api}/configuraciones/talentos/tipospreguntas`);
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
    
    const fixture = TestBed.createComponent(PreguntaComponent);
    const app = fixture.componentInstance;

    app.entrevistaRow = {
      "nombre": "Entrevista funcional",
      "id": 2,
    }

    app.loadTipoPreguntas()

    const fakeBackend = httpTestingController.expectOne(`${environment.api}/configuraciones/talentos/tipospreguntas`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  })
});
