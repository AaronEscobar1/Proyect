import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { By } from '@angular/platform-browser';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { NivelesEducativosComponent } from './niveles-educativos.component';
import { NivelesEducativos } from '../../interfaces/niveles-educativos.interfaces';
import { Inject } from '@angular/core';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';

describe('NivelesEducativosComponent', () => {

  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/niveleseducativos`;

  const routes: Routes = [{ path: '', children: [ { path: 'login', component: NivelesEducativosComponent }, { path: '**', redirectTo: 'login' }]} ];

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        NivelesEducativosComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
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
    setTimeout(()=>{
      fixture.detectChanges();
      expect(app.niveles.length).toBeGreaterThanOrEqual(1);
    }, 2000)
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.niveles.length).toBe(0);
    app.loadData();
    setTimeout(()=>{
      fixture.detectChanges();
      expect(app.niveles.length).toBeGreaterThanOrEqual(0);
    }, 2000)
  
  })

  it('Abrir Modal de impresion', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printNivelModal).toBeFalse();
    app.showModalPrintDialog();
    fixture.detectChanges();
    expect(app.printNivelModal).toBeTrue();  
  })

  it('Cerrar Modal de impresion', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printNivelModal).toBeFalse();
    app.showModalPrintDialog();
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
    app.showModalAddDialog();
    fixture.detectChanges();
    expect(app.titleForm).toBe('Agregar niveles educativos');
    expect(app.addNivelModal).toBeTrue();  
  })

  it('Cerrar Modal de Crear Nivel', async () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;
    
    // Simulamos el proceso de abrir el modal de Crear
    expect(app.addNivelModal).toBeFalse();
    app.showModalAddDialog();
    expect(app.titleForm).toBe('Agregar niveles educativos');
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
    app.editSelectNivel(data);
    fixture.detectChanges();
    expect(app.nivel).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar niveles educativos');
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
    app.editSelectNivel(data);
    fixture.detectChanges();
    expect(app.nivel).toBe(data);
    expect(app.isEdit).toBeTrue();
    expect(app.titleForm).toBe('Editar niveles educativos');
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

  it('Eliminar Niveles Educativos (caso fallido)', inject([NivelesEducativosService], (service: NivelesEducativosService)=>{

    const data: NivelesEducativos = {
      codley: "CC",
      codniv: "99",
      desniv: "hola 1",
    }
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;

    const error = {
      "message": `No se pudo eliminar el nivel con ID: ${data.codniv}, no existe en la BD.`,
      "status": "error"
    }

    const response = service.deleteNivel(data.codniv).subscribe();
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codniv}`);
    fakeBackend.flush(error);
    expect(fakeBackend.request.method).toBe('DELETE');

  }))

  it('Eliminar Niveles Educativos (caso verdadero)', inject([NivelesEducativosService], (service: NivelesEducativosService)=>{

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

    const response = service.deleteNivel(data.codniv).subscribe();
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codniv}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('DELETE');

  }))

});
