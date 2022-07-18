import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditNivelComponent } from './modal-add-edit-nivel.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/talentos/nivelescompetencias`;

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
        ModalAddEditNivelComponent
      ]
    }).compileComponents()
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
  }));


  it('Crear componente de Niveles Educativos Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditNivelComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente Forma de Crear', () => {
    const fixture = TestBed.createComponent(ModalAddEditNivelComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Se valida que no haya cambios en el input isEdit

    app.ngOnChanges()
    
    // Validamos los datos del formulario vacio

    expect(app.form.value.id).toEqual(null)
    expect(app.form.value.nivel).toEqual(null)
    expect(app.form.value.descrip).toEqual(null)

    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.nivelSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditNivelComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.niveles = [
      {
        "nivel": "nivel 46",
        "descrip": "1",
        "id_competencia": 46,
        "id": 46
      },
      {
        "nivel": "nivel dos",
        "descrip": "descrip 2",
        "id_competencia": 1,
        "id": 4226
      }
    ];

    app.nivelSelect = {
      "nivel": "nivel dos",
      "descrip": "descrip 2",
      "id_competencia": 1,
      "id": 4226
    }

    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    
    app.isEdit = false

    app.competenciaSelect = {
      "nombre": "competencia modif",
      "descrip": "informaciones",
      "tipo": "02",
      "id": 1,
    };

    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.id).toEqual(null)
    expect(app.form.value.nivel).toEqual(null)
    expect(app.form.value.descrip).toEqual(null)
    expect(app.form.valid).toEqual(false)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditNivelComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    // Reset hecho por la funcion
    expect(app.form.value.id).toEqual(null)
    expect(app.form.value.nivel).toEqual(null)
    expect(app.form.value.descrip).toEqual(null)
    expect(app.nivelSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditNivelComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.niveles = [
      {
        "nivel": "nivel 46",
        "descrip": "1",
        "id_competencia": 46,
        "id": 46
      },
      {
        "nivel": "nivel dos",
        "descrip": "descrip 2",
        "id_competencia": 1,
        "id": 4226
      }
    ];
    
    // datos del formulario
    const data = {
      "nivel": "nivel dos",
      "descrip": "descrip 2",
      "id": 4227
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
    const fixture = TestBed.createComponent(ModalAddEditNivelComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.niveles = [
      {
        "nivel": "nivel 46",
        "descrip": "1",
        "id_competencia": 46,
        "id": 46
      },
      {
        "nivel": "nivel dos",
        "descrip": "descrip 2",
        "id_competencia": 1,
        "id": 4226
      }
    ];
    
    // datos del formulario
    const data = {
      "nivel": "nivel dos",
      "descrip": "descrip 2",
      "id": 4227
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
    const fixture = TestBed.createComponent(ModalAddEditNivelComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.niveles = [
      {
        "nivel": "nivel 46",
        "descrip": "1",
        "id_competencia": 46,
        "id": 46
      },
      {
        "nivel": "nivel dos",
        "descrip": "descrip 2",
        "id_competencia": 1,
        "id": 4226
      }
    ];
    
    // datos del formulario
    const data = {
      "nivel": "nivel dos",
      "descrip": "descrip 2",
      "id_competencia": 1,
      "id": 4226
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.nivelMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.id).toEqual(undefined)
    expect(app.form.value.nivel).toEqual(null)
    expect(app.form.value.descrip).toEqual(null)
    expect(app.nivelSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditNivelComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.niveles = [
      {
        "nivel": "nivel 46",
        "descrip": "1",
        "id_competencia": 46,
        "id": 46
      },
      {
        "nivel": "nivel dos",
        "descrip": "descrip 2",
        "id_competencia": 1,
        "id": 4226
      }
    ];
    
    // datos del formulario
    const data = {
      "nivel": "nivel dos",
      "descrip": "descrip 2",
      "id": 4226
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
    app.form.controls['nivel'].setValue("hola")
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.nivel).toEqual("hola")
    expect(app.form.value.descrip).toEqual(data.descrip)
    expect(app.form.value.id).toEqual(undefined)
    expect(app.nivelSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditNivelComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.niveles = [
      {
        "nivel": "nivel 46",
        "descrip": "1",
        "id_competencia": 46,
        "id": 46
      },
      {
        "nivel": "nivel dos",
        "descrip": "descrip 2",
        "id_competencia": 1,
        "id": 4226
      }
    ];
    
    // datos del formulario
    const data = {
      "nivel": "nivel dos",
      "descrip": "descrip 2",
      "id_competencia": 1,
      "id": 4226
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue(46)
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
    app.form.controls['nivel'].setValue("nivel dos")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    // Reset hecho por la funcion
    expect(app.form.value.nivel).toEqual("nivel dos")
    expect(app.form.value.descrip).toEqual(data.descrip)
    expect(app.form.value.id).toEqual("")

    app.campoInvalid('id');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditNivelComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.niveles = [
      {
        "nivel": "nivel 46",
        "descrip": "1",
        "id_competencia": 46,
        "id": 46
      },
      {
        "nivel": "nivel dos",
        "descrip": "descrip 2",
        "id_competencia": 1,
        "id": 4226
      }
    ];
    
    // datos del formulario
    const data = {
      "nivel": "",
      "descrip": "descrip 2",
      "id_competencia": 1,
      "id": 4226
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nivelMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['nivel'].setValue("12345678912345678912345678915555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nivelMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.nivel).toEqual("12345678912345678912345678915555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555234")
    expect(app.form.value.descrip).toEqual(data.descrip)
    expect(app.form.value.id).toEqual(undefined)

    app.campoInvalid('nivel');
    
  });
});
