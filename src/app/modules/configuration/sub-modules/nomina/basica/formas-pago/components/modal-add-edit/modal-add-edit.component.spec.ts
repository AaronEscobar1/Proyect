import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/pagoformas`;

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        ModalAddEditComponent
      ]
    }).compileComponents()
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
  }));


  it('Crear componente de Niveles Educativos Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente Forma de Crear', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Se valida que no haya cambios en el input isEdit

    app.ngOnChanges()
    
    // Validamos los datos del formulario vacio

    expect(app.form.value.despag).toEqual(null)
    expect(app.form.value.codpag).toEqual(null)
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.formaPagoSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.formasPagos = [
      {
        "despag": "EFECTIVO",
        "codpag": "1"
      },
      {
          "despag": "DEPOSITO",
          "codpag": "2"
      }
    ];
    app.formaPagoSelect = {
      "despag": "CHEQUE CONTINUO",
      "codpag": "3"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.despag).toEqual("CHEQUE CONTINUO")
    expect(app.form.value.codpag).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.formasPagos = [
      {
        "despag": "EFECTIVO",
        "codpag": "1"
      },
      {
          "despag": "DEPOSITO",
          "codpag": "2"
      }
    ];
    app.formaPagoSelect = {
      "despag": "CHEQUE CONTINUO",
      "codpag": "3"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.despag).toEqual("CHEQUE CONTINUO")
    expect(app.form.value.codpag).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    expect(app.form.value.despag).toEqual(null)
    expect(app.form.value.codpag).toEqual(null)
    expect(app.formaPagoSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.formasPagos = [
      {
        "despag": "EFECTIVO",
        "codpag": "1"
      },
      {
          "despag": "DEPOSITO",
          "codpag": "2"
      }
    ];

    // datos del formulario
    const data = {
      "despag": "CHEQUE CONTINUO",
      "codpag": "3"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.codpagMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('POST');

  });

  it('Probando el Guardado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.formasPagos = [
      {
        "despag": "EFECTIVO",
        "codpag": "1"
      },
      {
        "despag": "DEPOSITO",
        "codpag": "2"
      }
    ];

    // datos del formulario
    const data = {
      "despag": "CHEQUE CONTINUO",
      "codpag": "3"
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    
    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('POST');

  });

  it('Probando el Editado de Datos (caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.formasPagos = [
      {
        "despag": "EFECTIVO",
        "codpag": "1"
      },
      {
        "despag": "DEPOSITO",
        "codpag": "2"
      }
    ];

    const resp = {"message":"Forma de pago creado."}

    // datos del formulario
    const data = {
      "despag": "CHEQUE CONTINUO",
      "codpag": "3"
    };

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codpag'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.despagMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codpag}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.despag).toEqual(null)
    expect(app.form.value.codpag).toEqual(undefined)
    expect(app.formaPagoSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.formasPagos = [
      {
        "despag": "EFECTIVO",
        "codpag": "1"
      },
      {
        "despag": "DEPOSITO",
        "codpag": "2"
      }
    ];

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    // datos del formulario
    const data = {
      "despag": "CHEQUE CONTINUO",
      "codpag": "3"
    };

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codpag'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codpag}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.despag).toEqual(data.despag)
    expect(app.form.value.codpag).toEqual(undefined)
    expect(app.formaPagoSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.formasPagos = [
      {
        "despag": "EFECTIVO",
        "codpag": "1"
      },
      {
        "despag": "DEPOSITO",
        "codpag": "2"
      }
    ];

    // datos del formulario
    const data = {
      "despag": "CHEQUE CONTINUO",
      "codpag": "3"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codpag'].setValue("1")
    expect(app.form.valid).toEqual(false)
    app.codpagMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codpag'].setValue("01234")
    expect(app.form.valid).toEqual(false)
    app.codpagMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codpag'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codpagMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codpag'].setValue("")
    app.form.controls['despag'].setValue("DEPOSITO")
    expect(app.form.valid).toEqual(false)
    app.codpagMsgError

    // Reset hecho por la funcion
    expect(app.form.value.despag).toEqual("DEPOSITO")
    expect(app.form.value.codpag).toEqual('')

    app.campoInvalid('codpag');
  });

  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.formasPagos = [
      {
        "despag": "EFECTIVO",
        "codpag": "1"
      },
      {
        "despag": "DEPOSITO",
        "codpag": "2"
      }
    ];

    // datos del formulario
    const data = {
      "despag": "CHEQUE CONTINUO",
      "codpag": "1"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codpag'].disable();
    app.form.reset(data)
    app.form.controls['despag'].setValue("DEPOSITO")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.despagMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codpag'].disable();
    app.form.reset(data)
    app.form.controls['despag'].setValue("1234567891234567891234567891234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.despagMsgError

    //Caso Vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codpag'].disable();
    app.form.reset(data)
    app.form.controls['despag'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.despagMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.despag).toEqual('')
    expect(app.form.value.coddes).toEqual(undefined)

    app.campoInvalid('despag');
    
  });
});
