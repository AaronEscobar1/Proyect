import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { By } from '@angular/platform-browser';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { MotivosFiniquitoComponent } from './motivos-finiquito.component';
import { MotivosFiniquito } from '../../interfaces/motivos-finiquito.interfaces';
import { Inject } from '@angular/core';
import { MotivosFiniquitoService } from '../../services/motivos-finiquito.service';

describe('MotivoFiniquitoComponent', () => {

  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/motivosfiniquito`;

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        MotivosFiniquitoComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  it('Crear componente de Niveles Educativos correctamente', () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;
    expect(app.motivosFiniquito.length).toBe(0);
    app.loadData();
    setTimeout(()=>{
      fixture.detectChanges();
      expect(app.motivosFiniquito.length).toBeGreaterThanOrEqual(1);
    }, 2000)
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.motivosFiniquito.length).toBe(0);
    app.loadData();
    setTimeout(()=>{
      fixture.detectChanges();
      expect(app.motivosFiniquito.length).toBeGreaterThanOrEqual(0);
    }, 2000)
  
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
    app.printModal = false;
    expect(app.printModal).toBeFalse();
    
  })

  it('Abrir modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.titleForm).toBe('Agregar motivos de finiquito');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;
    
    // Simulamos el proceso de abrir el modal de Crear
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    expect(app.titleForm).toBe('Agregar motivos de finiquito');
    expect(app.createModal).toBeTrue();
    fixture.detectChanges();
    
    // Simulamos el proceso de cerrar modal de Crear  
    expect(app.createModal).toBeTrue();    
    app.closeModal();
    expect(app.createModal).toBeFalse();  
  })

  it('Abrir modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    // seteamos data simulate
    const data: MotivosFiniquito = {
      desde1: "motivo de finiquito",
      desde2: "motivo de finiquito",
      impliq: "1",
      classo: "1",
      coddes: "1"
  }

    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.motivoFiniquito).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.motivoFiniquito).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar motivos de finiquito');
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal de Editar Nivel', async () => {
    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    const data: MotivosFiniquito = {
      desde1: "motivo de finiquito",
      desde2: "motivo de finiquito",
      impliq: "1",
      classo: "1",
      coddes: "1"
    }
    
    // Simulamos el proceso de abrir el modal de Edicion
    expect(app.isEdit).toBeFalse();
    expect(app.motivoFiniquito).toBe(undefined);
    app.editRow(data);
    fixture.detectChanges();
    expect(app.motivoFiniquito).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar motivos de finiquito');
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

  it('Eliminar Niveles Educativos (caso fallido)', inject([MotivosFiniquitoService], (service: MotivosFiniquitoService)=>{

    const data: MotivosFiniquito = {
      desde1: "motivo de finiquito",
      desde2: "motivo de finiquito",
      impliq: "1",
      classo: "1",
      coddes: "1"
    }

    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    const error = {
      "error": "00",
      "message": `Recurso no encontrado.`,
      "detail": "Motivo de Finiquito no existente.",
    }

    const response = service.delete(data.coddes).subscribe();
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.coddes}`);
    fakeBackend.flush(error);
    expect(fakeBackend.request.method).toBe('DELETE');

  }))

  it('Eliminar Niveles Educativos (caso verdadero)', inject([MotivosFiniquitoService], (service: MotivosFiniquitoService)=>{

    const data: MotivosFiniquito = {
      desde1: "motivo de finiquito",
      desde2: "motivo de finiquito",
      impliq: "1",
      classo: "1",
      coddes: "1"
    }

    const fixture = TestBed.createComponent(MotivosFiniquitoComponent);
    const app = fixture.componentInstance;

    const resp = {
      "message": "Motivo eliminado con éxito.",
      "status": "success"
    }

    const response = service.delete(data.coddes).subscribe();
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.coddes}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('DELETE');

  }))

});
