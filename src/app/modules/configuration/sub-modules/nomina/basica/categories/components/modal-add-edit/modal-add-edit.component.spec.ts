import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/categorias`;

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

    expect(app.form.value.descat).toEqual('')
    expect(app.form.value.codcat).toEqual('')
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.categoriesSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.categories = [
      {
          "descat": "Categoría",
          "codcat": "1234"
      },
      {
          "descat": "Descripción",
          "codcat": "ABCD"
      }
    ];
    app.categoriesSelect = {
      "descat": "Categoría",
      "codcat": "1234"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.descat).toEqual("Categoría")
    expect(app.form.value.codcat).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    expect(app.form.value.descat).toEqual(null)
    expect(app.form.value.codcat).toEqual(null)
    expect(app.categoriesSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.categories = [
      {
        "descat": "Categoría",
        "codcat": "1234"
      },
      {
          "descat": "Descripción",
          "codcat": "ABCD"
      }
    ];

    // datos del formulario
    const data = {
      "descat": "Categoríaa",
      "codcat": "1235"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.codcatMsgError
    

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
    app.categories = [
      {
        "descat": "Categoría",
        "codcat": "1234"
      },
      {
          "descat": "Descripción",
          "codcat": "ABCD"
      }
    ];

    // datos del formulario
    const data = {
      "descat": "Categoríaa",
      "codcat": "1235"
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
    app.categories = [
      {
        "descat": "Categoría",
        "codcat": "1234"
      },
      {
          "descat": "Descripción",
          "codcat": "ABCD"
      }
    ];

    // datos del formulario
    const data = {
      "descat": "Categoría",
      "codcat": "1234"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcat'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.descatMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codcat}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.descat).toEqual(null)
    expect(app.form.value.codcat).toEqual(undefined)
    expect(app.categoriesSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.categories = [
      {
        "descat": "Categoría",
        "codcat": "1234"
      },
      {
          "descat": "Descripción",
          "codcat": "ABCD"
      }
    ];

    // datos del formulario
    const data = {
      "descat": "Categoría",
      "codcat": "1234"
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });


    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcat'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codcat}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.descat).toEqual(data.descat)
    expect(app.form.value.codcat).toEqual(undefined)
    expect(app.categoriesSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.categories = [
      {
        "descat": "Categoría",
        "codcat": "1234"
      },
      {
          "descat": "Descripción",
          "codcat": "ABCD"
      }
    ];

    // datos del formulario
    const data = {
      "descat": "Categoría",
      "codcat": "1235"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcat'].setValue("1234")
    expect(app.form.valid).toEqual(false)
    app.codcatMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcat'].setValue("01234444444444444444444444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.codcatMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcat'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codcatMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcat'].setValue("")
    app.form.controls['descat'].setValue("Categoría")
    expect(app.form.valid).toEqual(false)
    app.codcatMsgError

    // Reset hecho por la funcion
    expect(app.form.value.descat).toEqual("Categoría")
    expect(app.form.value.codcat).toEqual("")

    app.campoInvalid('codcat');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.categories = [
      {
        "descat": "Categoría",
        "codcat": "1234"
      },
      {
          "descat": "Descripción",
          "codcat": "ABCD"
      }
    ];

    // datos del formulario
    const data = {
      "descat": "Categoría",
      "codcat": "1235"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcat'].disable();
    app.form.reset(data)
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.descatMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcat'].disable();
    app.form.reset(data)
    app.form.controls['descat'].setValue("1234567891234567891234567891234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.descatMsgError

    //Caso Vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcat'].disable();
    app.form.reset(data)
    app.form.controls['descat'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.descatMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.codcat).toEqual(undefined)
    expect(app.form.value.descat).toEqual("")

    app.campoInvalid('descat');
    
  });
});
