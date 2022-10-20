import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { MotivosFiniquitoComponent } from './motivos-finiquito.component';
import { MotivosFiniquito } from '../../interfaces/motivos-finiquito.interfaces';
import { MotivosFiniquitoService } from '../../services/motivos-finiquito.service';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MotivosFiniquitoComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: MotivosFiniquitoService;

  const URL = `${environment.api}/configuraciones/nominas/motivosfiniquito`;

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
        MotivosFiniquitoComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(MotivosFiniquitoService);

  }));

  it('Crear componente de motivos finiquito correctamente', () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;
    expect(app.motivosFiniquito.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.motivosFiniquito.length).toBeGreaterThanOrEqual(0);
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.motivosFiniquito.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.motivosFiniquito.length).toBeGreaterThanOrEqual(0);  
  })

  it('Abrir Modal de impresion', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printModal).toBeFalse();
    app.openModalPrint();
    fixture.detectChanges();
    expect(app.printModal).toBeTrue();  
  })

  it('Cerrar Modal de impresion', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
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

  it('Abrir modal de Crear motivos finiquito', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.titleForm).toBe('Agregar motivo de finiquito');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Crear motivos finiquito', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;
    
    // Simulamos el proceso de abrir el modal de Crear
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    expect(app.titleForm).toBe('Agregar motivo de finiquito');
    expect(app.createModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de Crear  
    expect(app.createModal).toBeTrue();    
    app.closeModal();
    expect(app.createModal).toBeFalse();  
  })

  it('Abrir modal de Editar motivos finiquito', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    // seteamos data simulate
    const data: MotivosFiniquito = {
      "desde1": "motivo",
      "desde2": "CCC",
      "impliq": "0",
      "classo": "2",
      "coddes": "2"
    }

    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.motivoFiniquito).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.motivoFiniquito).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar motivo de finiquito');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Editar motivos finiquito', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    const data: MotivosFiniquito = {
      "desde1": "motivo",
      "desde2": "CCC",
      "impliq": "0",
      "classo": "2",
      "coddes": "2"
    }
    
    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.motivoFiniquito).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.motivoFiniquito).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar motivo de finiquito');
    expect(app.createModal).toBeTrue();  
    
    // Simulamos el proceso de cerrar el modal de Edicion
    expect(app.isEdit).toBeTrue();
    expect(app.motivoFiniquito).toBe(data);
    app.closeModal();
    fixture.detectChanges();
    expect(app.motivoFiniquito).toBe(undefined);
    expect(app.isEdit).toBeFalse();
    expect(app.createModal).toBeFalse(); 
  })

  it('Eliminar motivos finiquito (caso fallido)', ()=>{

    const data: MotivosFiniquito = {
      "desde1": "motivo",
      "desde2": "CCC",
      "impliq": "0",
      "classo": "2",
      "coddes": "2"
    }
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
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
    
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.coddes}`); 

    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('DELETE'); 

  })

  it('Eliminar motivos finiquito (caso verdadero)', ()=>{

    const data: MotivosFiniquito = {
      "desde1": "motivo",
      "desde2": "CCC",
      "impliq": "0",
      "classo": "2",
      "coddes": "2"
    }

    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    const resp = {
      "message": "motivos finiquito eliminado con éxito.",
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

    const fakeBackend = httpTestingController.match(`${URL}/${data.coddes}`);
    fakeBackend[0].flush(resp);
    expect(fakeBackend[0].request.method).toBe('DELETE');

  })

  it('Load Data (Caso verdadero)', ()=>{

    const data: MotivosFiniquito = {
      "desde1": "motivo",
      "desde2": "CCC",
      "impliq": "0",
      "classo": "2",
      "coddes": "2"
    }

    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
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
    
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    app.loadData()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  })
});
