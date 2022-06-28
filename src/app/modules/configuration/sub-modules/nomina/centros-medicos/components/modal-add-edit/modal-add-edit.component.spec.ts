import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/centrosmedicos`;

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

    expect(app.form.value.desmed).toEqual('')
    expect(app.form.value.codmed).toEqual('')
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.centrosMedicosSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.centrosMedicos = [
      {
          "desmed": "Infocent CCI.",
          "codmed": "1"
      },
      {
        "desmed": "Infocent CCII",
        "codmed": "2"
      }
    ];
    app.centrosMedicosSelect = {
      "desmed": "Infocent CCIII",
      "codmed": "3"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.desmed).toEqual("Infocent CCIII")
    expect(app.form.value.codmed).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    expect(app.form.value.desmed).toEqual(null)
    expect(app.form.value.codmed).toEqual(null)
    expect(app.centrosMedicosSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.centrosMedicos = [
      {
          "desmed": "Infocent CCI.",
          "codmed": "1"
      },
      {
        "desmed": "Infocent CCII",
        "codmed": "2"
      }
    ];

    // datos del formulario
    const data = {
      "desmed": "Infocent CCIII",
      "codmed": "3"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.codmedMsgError
    

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
    app.centrosMedicos = [
      {
          "desmed": "Infocent CCI.",
          "codmed": "1"
      },
      {
        "desmed": "Infocent CCII",
        "codmed": "2"
      }
    ];

    // datos del formulario
    const data = {
      "desmed": "Infocent CCIII",
      "codmed": "3"
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
    app.centrosMedicos = [
      {
          "desmed": "Infocent CCI.",
          "codmed": "1"
      },
      {
        "desmed": "Infocent CCII",
        "codmed": "2"
      }
    ];

    // datos del formulario
    const data = {
      "desmed": "Infocent CCIII",
      "codmed": "3"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codmed'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.desmedMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codmed}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.desmed).toEqual(null)
    expect(app.form.value.codmed).toEqual(undefined)
    expect(app.centrosMedicosSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.centrosMedicos = [
      {
          "desmed": "Infocent CCI.",
          "codmed": "1"
      },
      {
        "desmed": "Infocent CCII",
        "codmed": "2"
      }
    ];

    // datos del formulario
    const data = {
      "desmed": "Infocent CCIII",
      "codmed": "3"
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });


    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codmed'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codmed}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.desmed).toEqual(data.desmed)
    expect(app.form.value.codmed).toEqual(undefined)
    expect(app.centrosMedicosSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.centrosMedicos = [
      {
          "desmed": "Infocent CCI.",
          "codmed": "1"
      },
      {
        "desmed": "Infocent CCII",
        "codmed": "2"
      }
    ];

    // datos del formulario
    const data = {
      "desmed": "Infocent CCIII",
      "codmed": "3"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codmed'].setValue("2")
    expect(app.form.valid).toEqual(false)
    app.codmedMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codmed'].setValue("01234444444444444444444444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.codmedMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codmed'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codmedMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codmed'].setValue("")
    app.form.controls['desmed'].setValue("Infocent CCII")
    expect(app.form.valid).toEqual(false)
    app.codmedMsgError

    // Reset hecho por la funcion
    expect(app.form.value.desmed).toEqual("Infocent CCII")
    expect(app.form.value.codmed).toEqual("")

    app.campoInvalid('codmed');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.centrosMedicos = [
      {
          "desmed": "Infocent CCI.",
          "codmed": "1"
      },
      {
        "desmed": "Infocent CCII",
        "codmed": "2"
      }
    ];

    // datos del formulario
    const data = {
      "desmed": "Infocent CCII",
      "codmed": "3"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codmed'].disable();
    app.form.reset(data)
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desmedMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codmed'].disable();
    app.form.reset(data)
    app.form.controls['desmed'].setValue("1234567891234567891234567891234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desmedMsgError

    //Caso Vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codmed'].disable();
    app.form.reset(data)
    app.form.controls['desmed'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desmedMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.codmed).toEqual(undefined)
    expect(app.form.value.desmed).toEqual("")

    app.campoInvalid('desmed');
    
  });
});
