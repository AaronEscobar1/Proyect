import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';
import { By } from '@angular/platform-browser';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/organismospublicos`;

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
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.organismoPublicoSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.organismosPublicos = [
      {
        "codorg": "1", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "2", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "3", 
        "nomorg": "Hola", 
        "siglas": "string"
      }
    ];
    app.organismoPublicoSelect = {
      "codorg": "1", 
      "nomorg": "Hola", 
      "siglas": "string"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.valid).toEqual(true)
  });

  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    expect(app.form.valid).toEqual(false)
    expect(app.organismoPublicoSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.organismosPublicos = [
      {
        "codorg": "1", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "2", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "3", 
        "nomorg": "Hola", 
        "siglas": "string"
      }
    ];
    const data = {
      "codorg": "4", 
      "nomorg": "Hola", 
      "siglas": "string"
    };

    const resp = {"message":"Nivel Educativo creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.codorgMsgError;
    
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
    app.organismosPublicos = [
      {
        "codorg": "1", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "2", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "3", 
        "nomorg": "Hola", 
        "siglas": "string"
      }
    ];
    const data = {
      "codorg": "4", 
      "nomorg": "Hola", 
      "siglas": "string"
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
    app.organismosPublicos = [
      {
        "codorg": "1", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "2", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "3", 
        "nomorg": "Hola", 
        "siglas": "string"
      }
    ];
    
    const resp = {"message":"Nivel Educativo creado."}
    
    // datos del formulario
    const data = {
      "codorg": "4", 
      "nomorg": "Hola", 
      "siglas": "string"
    };
    
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codorg'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.codorgMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codorg}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.organismosPublicos = [
      {
        "codorg": "1", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "2", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "3", 
        "nomorg": "Hola", 
        "siglas": "string"
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
      "codorg": "4", 
      "nomorg": "Hola", 
      "siglas": "string"
    };

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codorg'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)
    app.nomorgMsgError;
    app.siglasMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codorg}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.organismosPublicos = [
      {
        "codorg": "1", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "2", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "3", 
        "nomorg": "Hola", 
        "siglas": "string"
      }
    ];
    
    // datos del formulario
    const data = {
      "codorg": "4", 
      "nomorg": "Hola", 
      "siglas": "string"
    };

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codorg'].setValue("3")
    expect(app.form.valid).toEqual(false)
    app.codorgMsgError;

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codorg'].setValue("12000000000000000000000000000")
    expect(app.form.valid).toEqual(false)
    app.codorgMsgError;
    
    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codorg'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codorgMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    app.campoInvalid('codorg');

  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.organismosPublicos = [
      {
        "codorg": "1", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "2", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "3", 
        "nomorg": "Hola", 
        "siglas": "string"
      }
    ];
    
    // datos del formulario
    const data = {
      "codorg": "4", 
      "nomorg": "Hola", 
      "siglas": "string"
    };

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codorg'].disable();
    app.form.reset(data)
    app.form.controls['nomorg'].setValue("12345678912300000000000000000000000000000000000000000000000000004567891234567891234")
    expect(app.form.valid).toEqual(false)
    app.nomorgMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codorg'].disable();
    app.form.reset(data)
    app.form.controls['nomorg'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.nomorgMsgError

    app.save();

    app.campoInvalid('nomorg');
  });

  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.organismosPublicos = [
      {
        "codorg": "1", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "2", 
        "nomorg": "Hola", 
        "siglas": "string"
      },
      {
        "codorg": "3", 
        "nomorg": "Hola", 
        "siglas": "string"
      }
    ];
    
    // datos del formulario
    const data = {
      "codorg": "4", 
      "nomorg": "Hola", 
      "siglas": "string"
    };

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codorg'].disable();
    app.form.reset(data)
    app.form.controls['siglas'].setValue("12345678912300000000000000000000000000000000000000000000000000004567891234567891234")
    expect(app.form.valid).toEqual(false)
    app.siglasMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codorg'].disable();
    app.form.reset(data)
    app.form.controls['siglas'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.siglasMsgError

    app.save();

    app.campoInvalid('siglas');
  });
});
