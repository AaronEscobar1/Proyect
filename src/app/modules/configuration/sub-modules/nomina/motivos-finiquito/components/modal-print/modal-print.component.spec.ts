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

    app.formPrint.setValue({
      "desde1": "motivo de finiquito",
      "desde2": "motivo de finiquito",
      "impliq": "1",
      "classo": "1",
      "coddes": "1"
  })

    expect(app.formPrint.valid).toEqual(true);    
  })

  it('Comprobando el formulario. (caso valido)', async () => {
    const fixture = TestBed.createComponent(ModalPrintComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.formPrint.setValue({
      "desde1": "motivo de finiquito new",
      "desde2": "motivo de finiquito new",
      "impliq": "4",
      "classo": "4",
      "coddes": "4"
    })

    expect(app.formPrint.valid).toEqual(true);    
  })
});
