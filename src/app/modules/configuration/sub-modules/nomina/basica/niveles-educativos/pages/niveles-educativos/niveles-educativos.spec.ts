import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { NivelesEducativosComponent } from './niveles-educativos.component';
import { NivelesEducativos } from '../../interfaces/niveles-educativos.interfaces';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NivelesEducativosComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: NivelesEducativosService;

  const URL = `${environment.api}/configuraciones/nominas/niveleseducativos`;

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
        NivelesEducativosComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(NivelesEducativosService);

  }));

  it('Crear componente de Niveles Educativos correctamente', () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;
    expect(app.niveles.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.niveles.length).toBeGreaterThanOrEqual(0);
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.niveles.length).toBe(0);
    app.loadData();
    fixture.detectChanges();
    expect(app.niveles.length).toBeGreaterThanOrEqual(0);  
  })

  it('Abrir Modal de impresion', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printNivelModal).toBeFalse();
    app.openModalPrint();
    fixture.detectChanges();
    expect(app.printNivelModal).toBeTrue();  
  })

  it('Cerrar Modal de impresion', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printNivelModal).toBeFalse();
    app.openModalPrint();
    expect(app.printNivelModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de impresion  
    expect(app.printNivelModal).toBeTrue();
    app.closeModalPrintDialog();
    expect(app.printNivelModal).toBeFalse();
    
  })

  it('Abrir modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.addNivelModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.titleForm).toBe('Agregar nivel educativo');
    expect(app.addNivelModal).toBeTrue();  
  })

  it('Cerrar Modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;
    
    // Simulamos el proceso de abrir el modal de Crear
    expect(app.addNivelModal).toBeFalse();
    app.openModalCreate();
    expect(app.titleForm).toBe('Agregar nivel educativo');
    expect(app.addNivelModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de Crear  
    expect(app.addNivelModal).toBeTrue();    
    app.closeModal();
    expect(app.addNivelModal).toBeFalse();  
  })

  it('Abrir modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

    // seteamos data simulate
    const data: NivelesEducativos = {
      codley: "CC",
      codniv: "3",
      desniv: "hola 1",
      usract: "USR",
      usrcre: "USR"
    }

    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.nivel).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.nivel).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar nivel educativo');
    expect(app.addNivelModal).toBeTrue();  
  })

  it('Cerrar Modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

    const data: NivelesEducativos = {
      codley: "CC",
      codniv: "3",
      desniv: "hola 1",
      usract: "USR",
      usrcre: "USR"
    }
    
    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.nivel).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.nivel).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar nivel educativo');
    expect(app.addNivelModal).toBeTrue();  
    
    // Simulamos el proceso de cerrar el modal de Edicion
    expect(app.isEdit).toBeTrue();
    expect(app.nivel).toBe(data);
    app.closeModal();
    fixture.detectChanges();
    expect(app.nivel).toBe(undefined);
    expect(app.isEdit).toBeFalse();
    expect(app.addNivelModal).toBeFalse(); 
  })

  it('Eliminar Niveles Educativos (caso fallido)', ()=>{

    const data: NivelesEducativos = {
      codley: "CC",
      codniv: "99",
      desniv: "hola 1",
    }
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
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
    
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codniv}`); 

    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('DELETE'); 

  })

  it('Eliminar Niveles Educativos (caso verdadero)', ()=>{

    const data: NivelesEducativos = {
      codley: "CC",
      codniv: "3",
      desniv: "hola 1",
    }
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

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

    const fakeBackend = httpTestingController.match(`${URL}/${data.codniv}`);
    fakeBackend[0].flush(resp);
    expect(fakeBackend[0].request.method).toBe('DELETE');

  })

  it('Load Data (Caso verdadero)', ()=>{

    const data: NivelesEducativos = {
      codley: "CC",
      codniv: "3",
      desniv: "hola 1",
    }
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
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
    
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

    app.loadData()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  })
});
