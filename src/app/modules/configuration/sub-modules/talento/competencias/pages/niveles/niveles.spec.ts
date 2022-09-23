import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { NivelesComponent } from './niveles.component';
import { NivelesEducativosService } from '../../../../nomina/basica/niveles-educativos/services/niveles-educativos.service';
import { Niveles } from '../../interfaces/nivel.interfaces';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Competencias } from '../../interfaces/competencias.interfaces';
import { NivelService } from '../../services/nivel.service';

describe('ClasificacionOficialComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: NivelService;

  const URL = `${environment.api}/configuraciones/talentos/nivelescompetencias`;

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
        NivelesComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(NivelService);

  }));

  it('Crear componente de Clasificacion Oficial correctamente', () => {
    const fixture = TestBed.createComponent(NivelesComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(NivelesComponent);
    const app = fixture.componentInstance;
    expect(app.niveles.length).toBe(0);
    app.loadNiveles();
    fixture.detectChanges();
    app.competenciaRow = {
      "nombre": "Competencia 46",
      "descrip": "competencia 46",
      "tipo": {
        "nombre": "competencia modifs",
        "id": "02"
      },
      "id": 0
    }
    app.niveles = []

    app.ngOnChanges()

    app.niveles = [
      {
        "nivel": "nivel 46",
        "descrip": "3333",
        "id": 46,
        "id_competencia": 46
      },
      {
        "nivel": "nivel dos",
        "descrip": "descrip 2",
        "id": 4226,
        "id_competencia": 1
      }
    ];

    app.ngOnChanges()
    
    app.niveles = [
      {
        "nivel": "nivel 46",
        "descrip": "3333",
        "id": 46,
        "id_competencia": 46
      },
      {
        "nivel": "nivel dos",
        "descrip": "descrip 2",
        "id": 4226,
        "id_competencia": 1
      }
    ];

    app.ngOnChanges()

    expect(app.niveles.length).toBeGreaterThanOrEqual(0);
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(NivelesComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.niveles.length).toBe(0);
    app.loadNiveles();
    fixture.detectChanges();
    expect(app.niveles.length).toBeGreaterThanOrEqual(0);  
  })

  it('Abrir modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(NivelesComponent);
    const app = fixture.componentInstance;

    const data: Competencias = {
      "nombre": "Competencia 46",
      "descrip": "1",
      "tipo": {
        "nombre": "competencia modifs",
        "id": "02"
      },
      "id": 46
    }

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.titleForm).toBe('Agregar nivel');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(NivelesComponent);
    const app = fixture.componentInstance;
    
    const data: Competencias = {
      "nombre": "Competencia 46",
      "descrip": "1",
      "tipo": {
        "nombre": "competencia modifs",
        "id": "02"
      },
      "id": 46
    }

    // Simulamos el proceso de abrir el modal de Crear
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    expect(app.titleForm).toBe('Agregar nivel');
    expect(app.createModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de Crear  
    expect(app.createModal).toBeTrue();    
    app.closeModal();
    expect(app.createModal).toBeFalse();  
  })

  it('Abrir modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(NivelesComponent);
    const app = fixture.componentInstance;

    // seteamos data simulate
    const data: Niveles = {
      "nivel": "nivel 46",
      "descrip": "1",
      "id_competencia": 46,
      "id": 46
    }

    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.nivelSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.nivelSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar nivel');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(NivelesComponent);
    const app = fixture.componentInstance;

    const data: Niveles = {
      "nivel": "nivel 46",
      "descrip": "1",
      "id_competencia": 46,
      "id": 46
    }
    
    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.nivelSelect).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.nivelSelect).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar nivel');
    expect(app.createModal).toBeTrue();  
    
    // Simulamos el proceso de cerrar el modal de Edicion
    expect(app.isEdit).toBeTrue();
    expect(app.nivelSelect).toBe(data);
    app.closeModal();
    fixture.detectChanges();
    expect(app.nivelSelect).toBe(undefined);
    expect(app.isEdit).toBeFalse();
    expect(app.createModal).toBeFalse(); 
  })

  it('Eliminar Niveles Educativos (caso fallido)', ()=>{

    const data: Niveles = {
      "nivel": "nivel 46",
      "descrip": "1",
      "id_competencia": 46,
      "id": 46
    }

    const fixture = TestBed.createComponent(NivelesComponent);
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

    const data: Niveles = {
      "nivel": "nivel 46",
      "descrip": "1",
      "id_competencia": 46,
      "id": 46
    }

    const fixture = TestBed.createComponent(NivelesComponent);
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

    const data: Niveles = {
      "nivel": "nivel 46",
      "descrip": "1",
      "id_competencia": 46,
      "id": 46
    }

    const fixture = TestBed.createComponent(NivelesComponent);
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

    const data: Competencias[] = [
      {
        "nombre": "Competencia 46",
        "descrip": "competencia 46",
        "tipo": {
          "nombre": "competencia modifs",
          "id": "02"
        },
        "id": 46
      },
      {
        "nombre": "eva 2",
        "descrip": "descripcion",
        "tipo": {
          "nombre": "competencia modifs",
          "id": "02"
        },
        "id": 4
      }
    ]

    const fixture = TestBed.createComponent(NivelesComponent);
    const app = fixture.componentInstance;
    
    app.competenciaRow = {
      "nombre": "Competencia 46",
      "descrip": "competencia 46",
      "tipo": {
        "nombre": "competencia modifs",
        "id": "02"
      },
      "id": 46
    }


    app.loadNiveles()

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
    
    const fixture = TestBed.createComponent(NivelesComponent);
    const app = fixture.componentInstance;

    app.competenciaRow = {
      "nombre": "Competencia 46",
      "descrip": "competencia 46",
      "tipo": {
        "nombre": "competencia modifs",
        "id": "02"
      },
      "id": 46
    }

    app.loadNiveles()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  })
});
