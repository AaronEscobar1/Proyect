import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditPreguntaComponent } from './modal-add-edit-pregunta.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/talentos/preguntas`;

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
        ModalAddEditPreguntaComponent
      ]
    }).compileComponents()
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
  }));


  it('Crear componente de Niveles Educativos Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditPreguntaComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente Forma de Crear', () => {
    const fixture = TestBed.createComponent(ModalAddEditPreguntaComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    // Se valida que no haya cambios en el input isEdit

    app.ngOnChanges()
    
    // Validamos los datos del formulario vacio

    expect(app.form.value.titulo).toEqual(null)
    expect(app.form.value.cerrada).toEqual(null)
    expect(app.form.value.id).toEqual (null)

    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.preguntaSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditPreguntaComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.preguntas = [
      {
        "titulo": "pregunta 11",
        "cerrada": "1",
        "idEntrevista": 3,
        "id": 11
      },
      {
        "titulo": "prueba",
        "cerrada": "0",
        "idEntrevista": 3,
        "id": 12
      }
    ];

    app.preguntaSelect = {
      "titulo": "prueba",
      "cerrada": "0",
      "idEntrevista": 3,
      "id": 12
    }

    
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    
    app.isEdit = false
    
    app.entrevistaRow = {
      "nombre": "Entrevista abierta",
      "id": 3
    }

    
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();

    // Validacion
    expect(app.form.value.id).toEqual(null)
    expect(app.form.value.titulo).toEqual(null)
    expect(app.form.value.cerrada).toEqual(null)
    expect(app.form.valid).toEqual(false)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditPreguntaComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    // Reset hecho por la funcion
    expect(app.form.value.id).toEqual(null)
    expect(app.form.value.titulo).toEqual(null)
    expect(app.form.value.cerrada).toEqual(null)
    expect(app.preguntaSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditPreguntaComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.preguntas = [
      {
        "titulo": "pregunta 11",
        "cerrada": "1",
        "idEntrevista": 3,
        "id": 11
      },
      {
        "titulo": "prueba",
        "cerrada": "0",
        "idEntrevista": 3,
        "id": 12
      }
    ];
    
    // datos del formulario
    const data = {
      "titulo": "pruebaa",
      "cerrada": "0",
      "id": 13
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.idMsgError
    
    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('POST');

  });

  it('Probando el Guardado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditPreguntaComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.preguntas = [
      {
        "titulo": "pregunta 11",
        "cerrada": "1",
        "idEntrevista": 3,
        "id": 11
      },
      {
        "titulo": "prueba",
        "cerrada": "0",
        "idEntrevista": 3,
        "id": 12
      }
    ];
    
    // datos del formulario
    const data = {
      "titulo": "pruebaa",
      "cerrada": "0",
      "id": 16
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
    const fixture = TestBed.createComponent(ModalAddEditPreguntaComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.preguntas = [
      {
        "titulo": "pregunta 11",
        "cerrada": "1",
        "idEntrevista": 3,
        "id": 11
      },
      {
        "titulo": "prueba",
        "cerrada": "0",
        "idEntrevista": 3,
        "id": 12
      }
    ];
    
    // datos del formulario
    const data = {
      "titulo": "pruebaa",
      "cerrada": "0",
      "idEntrevista": 3,
      "id": 13
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.tituloMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.id).toEqual(undefined)
    expect(app.form.value.titulo).toEqual(null)
    expect(app.form.value.cerrada).toEqual(null)
    expect(app.preguntaSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditPreguntaComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.preguntas = [
      {
        "titulo": "pregunta 11",
        "cerrada": "1",
        "idEntrevista": 3,
        "id": 11
      },
      {
        "titulo": "prueba",
        "cerrada": "0",
        "idEntrevista": 3,
        "id": 12
      }
    ];
    
    // datos del formulario
    const data = {
      "titulo": "prueba",
      "cerrada": "0",
      "idEntrevista": 3,
      "id": 12
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });


    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['titulo'].setValue("hola")
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.titulo).toEqual("hola")
    expect(app.form.value.cerrada).toEqual(data.cerrada)
    expect(app.form.value.id).toEqual(undefined)
    expect(app.preguntaSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditPreguntaComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.preguntas = [
      {
        "titulo": "pregunta 11",
        "cerrada": "1",
        "idEntrevista": 3,
        "id": 11
      },
      {
        "titulo": "prueba",
        "cerrada": "0",
        "idEntrevista": 3,
        "id": 12
      }
    ];
    
    // datos del formulario
    const data =  {
      "titulo": "pruebaa",
      "cerrada": "0",
      "idEntrevista": 3,
      "id": 12
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue(12)
    expect(app.form.valid).toEqual(false)
    app.idMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("01234444444444444444444555555555555555444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("")
    app.form.controls['titulo'].setValue("nivel dos")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    // Reset hecho por la funcion
    expect(app.form.value.titulo).toEqual("nivel dos")
    expect(app.form.value.cerrada).toEqual(data.cerrada)
    expect(app.form.value.id).toEqual("")

    app.campoInvalid('id');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditPreguntaComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.preguntas = [
      {
        "titulo": "pregunta 11",
        "cerrada": "1",
        "idEntrevista": 3,
        "id": 11
      },
      {
        "titulo": "prueba",
        "cerrada": "0",
        "idEntrevista": 3,
        "id": 12
      }
    ];
    
    // datos del formulario
    const data = {
      "titulo": "pregunta 11",
      "cerrada": "0",
      "idEntrevista": 3,
      "id": 12
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['titulo'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.tituloMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['titulo'].setValue("1234567891tttfffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt2345678912345678915555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.tituloMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.titulo).toEqual("1234567891tttfffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt2345678912345678915555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555234")
    expect(app.form.value.cerrada).toEqual(data.cerrada)
    expect(app.form.value.id).toEqual(undefined)

    app.campoInvalid('titulo');
    
  });
});
