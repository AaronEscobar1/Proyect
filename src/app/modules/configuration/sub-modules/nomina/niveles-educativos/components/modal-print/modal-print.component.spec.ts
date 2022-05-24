import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { By } from '@angular/platform-browser';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { ModalPrintComponent } from './modal-print.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ModalPrintComponent', () => {

  let httpTestingController: HttpTestingController;

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        ModalPrintComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  it('Crear componente de Niveles Educativos Print Component correctamente', () => {
    const fixture = TestBed.createComponent(ModalPrintComponent);
    const app = fixture.componentInstance; 
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', () => {
    const fixture = TestBed.createComponent(ModalPrintComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.typesFile.length).toBeGreaterThanOrEqual(0);
  });

  it('Comprobando el formulario. (caso invalido)', async () => {
    const fixture = TestBed.createComponent(ModalPrintComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.form.setValue({
      "codniv": '33',
      "desniv": '123456789123456789123456789123456789',
      "type": 'CCCC'
    })

    expect(app.form.valid).toEqual(false);    
  })

  it('Comprobando el formulario. (caso valido)', async () => {
    const fixture = TestBed.createComponent(ModalPrintComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.form.setValue({
      "codniv": '3',
      "desniv": '123456789123456789123456789',
      "type": 'CCC'
    })

    expect(app.form.valid).toEqual(true);    
  })
});
