import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';
import { Dropdown, ObjectEventChange } from 'src/app/shared/interfaces/country-entity.interfaces';
import { Evaluaciones } from '../../interfaces/evaluaciones.interfaces';

const event: ObjectEventChange  = {
  originalEvent: true,
  value: "VEN"
}
const dropdownElement: Dropdown = {
  selectedOption: {
    nombre: "VEN"
  }
}

describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/talentos/evaluaciones`;

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

    expect(app.form.value.id).toEqual(null)
    expect(app.form.value.nombre).toEqual(null)

    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.evaluacionSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.evaluaciones = [
      {
        "nombre": "prueba jose45",
        "descrip": "333333333333333",
        "tipo": "01",
        "id": 45
      },
      {
        "nombre": "eva 2",
        "descrip": "descripcion",
        "tipo": "03",
        "id": 4
      }
    ];

    const data: Evaluaciones = {
      "nombre": "ejemplo",
      "descrip": "null",
      "tipo": "null",
      "id": 10
    };

    app.evaluacionSelect = data
    // Se simula que hubo un cambio en los inputs

    app.ngOnChanges();

    app.save();
    // Validacion
    expect(app.form.value.nombre).toEqual("ejemplo")
    expect(app.form.value.id).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    // Reset hecho por la funcion
    expect(app.form.value.id).toEqual(null)
    expect(app.form.value.nombre).toEqual(null)
    expect(app.evaluacionSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.evaluaciones = [
      {
        "nombre": "prueba jose45",
        "descrip": "333333333333333",
        "tipo": "01",
        "id": 45
      },
      {
        "nombre": "eva 2",
        "descrip": "descripcion",
        "tipo": "03",
        "id": 4
      }
    ];

    const data: Evaluaciones = {
      "nombre": "ejemplo",
      "descrip": "null",
      "tipo": "null",
      "id": 10
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.nombreMsgError
    

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
    app.evaluaciones = [
      {
        "nombre": "prueba jose45",
        "descrip": "333333333333333",
        "tipo": "01",
        "id": 45
      },
      {
        "nombre": "eva 2",
        "descrip": "descripcion",
        "tipo": "03",
        "id": 4
      }
    ];

    const data: Evaluaciones = {
      "nombre": "ejemplo",
      "descrip": "null",
      "tipo": "null",
      "id": 10
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
    app.evaluaciones = [
      {
        "nombre": "prueba jose45",
        "descrip": "333333333333333",
        "tipo": "01",
        "id": 45
      },
      {
        "nombre": "eva 2",
        "descrip": "descripcion",
        "tipo": "03",
        "id": 4
      }
    ];

    const data: Evaluaciones = {
      "nombre": "ejemplo",
      "descrip": "hola",
      "tipo": "01",
      "id": 10
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)
    app.idMsgError
    app.nombreMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funciom
    expect(app.form.value.nombre).toEqual(null)
    expect(app.form.value.id).toEqual(undefined)
    expect(app.evaluacionSelect).toEqual(undefined);

  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.evaluaciones = [
      {
        "nombre": "prueba jose45",
        "descrip": "333333333333333",
        "tipo": "01",
        "id": 45
      },
      {
        "nombre": "eva 2",
        "descrip": "descripcion",
        "tipo": "03",
        "id": 4
      }
    ];

    const data: Evaluaciones = {
      "nombre": "ejemplo",
      "descrip": "hola",
      "tipo": "01",
      "id": 1
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
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.nombre).toEqual("ejemplo")
    expect(app.form.value.id).toEqual(undefined)
    expect(app.evaluacionSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.evaluaciones = [
      {
        "nombre": "prueba jose45",
        "descrip": "333333333333333",
        "tipo": "01",
        "id": 45
      },
      {
        "nombre": "eva 2",
        "descrip": "descripcion",
        "tipo": "03",
        "id": 4
      }
    ];

    const data: Evaluaciones = {
      "nombre": "ejemplo",
      "descrip": "",
      "tipo": "",
      "id": 1
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue(4)
    expect(app.form.valid).toEqual(false)
    app.idMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("123456789123")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    // Reset hecho por la funcion
    expect(app.form.value.nombre).toEqual("ejemplo")
    expect(app.form.value.id).toEqual("")

    app.campoInvalid('id');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.evaluaciones = [
      {
        "nombre": "prueba jose45",
        "descrip": "333333333333333",
        "tipo": "01",
        "id": 45
      },
      {
        "nombre": "eva 2",
        "descrip": "descripcion",
        "tipo": "03",
        "id": 4
      }
    ];

    const data: Evaluaciones = {
      "nombre": "eva 2",
      "descrip": "",
      "tipo": "",
      "id": 1
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['nombre'].setValue("1234567891234567891234567891234000000004444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444400000000000000000000000000000000000000000000000000")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreMsgError

    //Caso Vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['nombre'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.id).toEqual(undefined)
    expect(app.form.value.nombre).toEqual('')

    app.campoInvalid('nombre');
    
  });
});
