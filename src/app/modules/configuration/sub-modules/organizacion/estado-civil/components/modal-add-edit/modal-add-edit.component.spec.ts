import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';
import { Dropdown, ObjectEventChange } from 'src/app/shared/interfaces/country-entity.interfaces';

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

  const URL = `${environment.api}/estadosciviles`;

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

    expect(app.estadoCivilSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.estadosCiviles = [
      {
        "nombre": "Divorciado",
        "codigoLey": "D",
        "id": "D"
    },
    {
        "nombre": "Concubino",
        "codigoLey": "C",
        "id": "U"
    },
    ];
    app.estadoCivilSelect = {
      "nombre": "Sin definir",
      "codigoLey": "s",
      "id": "O"
    };

    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.estadosCiviles = [
      {
        "nombre": "Divorciado",
        "codigoLey": "D",
        "id": "D"
      },
      {
        "nombre": "Concubino",
        "codigoLey": "C",
        "id": "U"
      },
    ];

    // datos del formulario
    const data = {
      "nombre": "Sin definir",
      "codigoLey": "S",
      "id": "O"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.idMsgError
    app.nombreMsgError
    app.codigoLeyMsgError
    

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
    app.estadosCiviles = [
      {
        "nombre": "Divorciado",
        "codigoLey": "D",
        "id": "D"
      },
      {
        "nombre": "Concubino",
        "codigoLey": "C",
        "id": "U"
      },
    ];

    // datos del formulario
    const data = {
      "nombre": "Sin definir",
      "codigoLey": "S",
      "id": "O"
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
    app.estadosCiviles = [
      {
        "nombre": "Divorciado",
        "codigoLey": "D",
        "id": "D"
      },
      {
        "nombre": "Concubino",
        "codigoLey": "C",
        "id": "U"
      },
    ];

    // datos del formulario
    const data = {
      "nombre": "Sin definir",
      "codigoLey": "S",
      "id": "O"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.codigoLeyMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.estadosCiviles = [
      {
        "nombre": "Divorciado",
        "codigoLey": "D",
        "id": "D"
      },
      {
        "nombre": "Concubino",
        "codigoLey": "C",
        "id": "U"
      },
    ];

    // datos del formulario
    const data = {
      "nombre": "Sin definir",
      "codigoLey": "S",
      "id": "O"
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

  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.estadosCiviles = [
      {
        "nombre": "Divorciado",
        "codigoLey": "D",
        "id": "D"
      },
      {
        "nombre": "Concubino",
        "codigoLey": "C",
        "id": "U"
      },
    ];

    // datos del formulario
    const data = {
      "nombre": "Sin definir",
      "codigoLey": "S",
      "id": "O"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("D")
    expect(app.form.valid).toEqual(false)
    app.idMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("01234444444444444444444444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    app.campoInvalid('id');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.estadosCiviles = [
      {
        "nombre": "Divorciado",
        "codigoLey": "D",
        "id": "D"
      },
      {
        "nombre": "Concubino",
        "codigoLey": "C",
        "id": "U"
      },
    ];

    // datos del formulario
    const data = {
      "nombre": "Sin definir",
      "codigoLey": "S",
      "id": "O"
    };

    // caso required nombre
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['nombre'].setValue("")
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreMsgError

    // caso repite nombre
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['nombre'].setValue("Concubino")
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreMsgError
    
    // caso maxlength nombre
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['nombre'].setValue("1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111")
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreMsgError

    // caso required nombre Abreviado
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['codigoLey'].setValue("CC")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.codigoLeyMsgError

    app.save();

    app.campoInvalid('nombre');
    app.campoInvalid('codigoLey');
    app.campoInvalid('id');
    
  });

});
