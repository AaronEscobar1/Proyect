import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Categories } from '../../interfaces/categories.interfaces';

// Servicios y componentes requeridos
import { ModalPrintComponent } from './modal-print.component';

describe('ModalPrintComponent Motivos Finiquito', () => {

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

  it('Crear componente de Motivos Finiquito Print Component correctamente', () => {
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
      "id": '33',
      "des": '123456789123456789123456789123456789',
      "type": 'CCCC'
    })

    expect(app.form.valid).toEqual(true);    
  })

  it('Comprobando el formulario. (caso valido)', async () => {
    const fixture = TestBed.createComponent(ModalPrintComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.form.setValue({
      "id": '33',
      "des": '123456789123456789123456789123456789',
      "type": 'CCCC'
    })

    expect(app.form.valid).toEqual(true);    
  })

  it('Exportando PDF', async () => {
    const fixture = TestBed.createComponent(ModalPrintComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const data = {
      "id": '33',
      "des": '123456789123456789123456789123456789',
      "type": 'CCCC'
    }
    const dataReset = {
      "id": null,
      "des": null,
      "type": null
    }

    app.form.setValue(data)
    expect(app.form.valid).toEqual(true);    

    app.export()

    expect(app.form.getRawValue()).toEqual(data);    
  })

  it('Reset Form PDF', async () => {
    const fixture = TestBed.createComponent(ModalPrintComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const data = {
      "id": '33',
      "des": '123456789123456789123456789123456789',
      "type": 'CCCC'
    }
    const dataReset = {
      "id": null,
      "des": null,
      "type": null
    }

    app.form.reset(data)
    expect(app.form.valid).toEqual(true);    

    app.resetForm()

    expect(app.form.getRawValue()).toEqual(dataReset);    
  })

  it('Cerrar modal desde componente', async () => {
    const fixture = TestBed.createComponent(ModalPrintComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const data = {
      "id": '33',
      "des": '123456789123456789123456789123456789',
      "type": 'CCCC'
    }
    const dataReset = {
      "id": null,
      "des": null,
      "type": null
    }

    app.form.setValue(data)
    expect(app.form.valid).toEqual(true);    

    app.closeModalPrint()

    expect(app.form.getRawValue()).toEqual(dataReset);    
  })
});
