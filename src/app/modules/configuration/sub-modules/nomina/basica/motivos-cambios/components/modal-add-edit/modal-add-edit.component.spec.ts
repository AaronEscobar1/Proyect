import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/motivoscambios`;

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

    expect(app.form.value.descam).toEqual(null)
    expect(app.form.value.codcam).toEqual(null)
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.motivoCambioSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.motivosCambios = [
      {
        "descam": "CREACION DE PUESTO",
        "codcam": "CRE"
      },
      {
        "descam": "INCREMENTO DE LA ACTIVDAD",
        "codcam": "INC"
      }
    ];
    app.motivoCambioSelect = {
      "descam": "REEMPLAZO",
      "codcam": "REM"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.descam).toEqual("REEMPLAZO")
    expect(app.form.value.codcam).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });

  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    expect(app.form.value.descam).toEqual(null)
    expect(app.form.value.codcam).toEqual(null)
    expect(app.motivoCambioSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.motivosCambios = [
      {
        "descam": "CREACION DE PUESTO",
        "codcam": "CRE"
      },
      {
        "descam": "INCREMENTO DE LA ACTIVDAD",
        "codcam": "INC"
      }
    ];

    // datos del formulario
    const data = {
      "descam": "REEMPLAZO",
      "codcam": "REM"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.codcamMsgError

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
    app.motivosCambios = [
      {
        "descam": "CREACION DE PUESTO",
        "codcam": "CRE"
      },
      {
        "descam": "INCREMENTO DE LA ACTIVDAD",
        "codcam": "INC"
      }
    ];

    // datos del formulario
    const data = {
      "descam": "REEMPLAZO",
      "codcam": "REM"
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
    app.motivosCambios = [
      {
        "descam": "CREACION DE PUESTO",
        "codcam": "CRE"
      },
      {
        "descam": "INCREMENTO DE LA ACTIVDAD",
        "codcam": "INC"
      }
    ];

    // datos del formulario
    const data = {
      "descam": "REEMPLAZO",
      "codcam": "REM"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcam'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.descamMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codcam}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.descam).toEqual(null)
    expect(app.form.value.codcam).toEqual(undefined)
    expect(app.motivoCambioSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.motivosCambios = [
      {
        "descam": "CREACION DE PUESTO",
        "codcam": "CRE"
      },
      {
        "descam": "INCREMENTO DE LA ACTIVDAD",
        "codcam": "INC"
      }
    ];

    // datos del formulario
    const data = {
      "descam": "REEMPLAZO",
      "codcam": "REM"
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcam'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codcam}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.descam).toEqual(data.descam)
    expect(app.form.value.codcam).toEqual(undefined)
    expect(app.motivoCambioSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.motivosCambios = [
      {
        "descam": "CREACION DE PUESTO",
        "codcam": "CRE"
      },
      {
        "descam": "INCREMENTO DE LA ACTIVDAD",
        "codcam": "INC"
      }
    ];

    // datos del formulario
    const data = {
      "descam": "REEMPLAZO",
      "codcam": "REM"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcam'].setValue("INC")
    expect(app.form.valid).toEqual(false)
    app.codcamMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcam'].setValue("123456789123")
    expect(app.form.valid).toEqual(false)
    app.codcamMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcam'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codcamMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcam'].setValue("")
    app.form.controls['descam'].setValue("CREACION DE PUESTO")
    expect(app.form.valid).toEqual(false)
    app.codcamMsgError

    // Reset hecho por la funcion
    expect(app.form.value.descam).toEqual("CREACION DE PUESTO")
    expect(app.form.value.codcam).toEqual("")

    app.campoInvalid('codcam');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.motivosCambios = [
      {
        "descam": "CREACION DE PUESTO",
        "codcam": "CRE"
      },
      {
        "descam": "INCREMENTO DE LA ACTIVDAD",
        "codcam": "INC"
      }
    ];

    // datos del formulario
    const data = {
      "descam": "REEMPLAZO",
      "codcam": "Hola"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcam'].disable();
    app.form.reset(data)
    app.form.controls['descam'].setValue("INCREMENTO DE LA ACTIVDAD")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.descamMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcam'].disable();
    app.form.reset(data)
    app.form.controls['descam'].setValue("123456789123456785555555555555555555555555555555555555555555555555555555555555591234567891234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.descamMsgError

    //Caso Vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcam'].disable();
    app.form.reset(data)
    app.form.controls['descam'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.descamMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.descam).toEqual('')
    expect(app.form.value.codcam).toEqual(undefined)

    app.campoInvalid('descam');
    
  });
});
