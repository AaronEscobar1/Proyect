import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/profesiones`;

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

    expect(app.form.value.desprf).toEqual('')
    expect(app.form.value.codprf).toEqual('')

    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.profesionSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.profesiones = [
      {
          "desprf": "Medico",
          "codprf": "01"
      },
      {
          "desprf": "Licenciado",
          "codprf": "02"
      },
      {
          "desprf": "Ingeniero",
          "codprf": "03"
      }
  ];

    app.profesionSelect = {
      "desprf": "Ingeniero",
      "codprf": "03"
  };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
  
    // Validacion
    expect(app.form.value.desprf).toEqual("Ingeniero")
    expect(app.form.value.codprf).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    // Reset hecho por la funcion
    expect(app.form.value.desprf).toEqual(null)
    expect(app.form.value.codprf).toEqual(null)
    expect(app.profesionSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.profesiones = [
      {
          "desprf": "Medico",
          "codprf": "01"
      },
      {
          "desprf": "Licenciado",
          "codprf": "02"
      },
      {
          "desprf": "Ingeniero",
          "codprf": "03"
      }
    ];

    // datos del formulario
    const data = {
      "desprf": "Ingenieroo",
      "codprf": "04"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.desprfMsgError
    

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
    app.profesiones = [
      {
          "desprf": "Medico",
          "codprf": "01"
      },
      {
          "desprf": "Licenciado",
          "codprf": "02"
      },
      {
          "desprf": "Ingeniero",
          "codprf": "03"
      }
    ];

    // datos del formulario
    const data = {
      "desprf": "Ingenieroo",
      "codprf": "04"
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
    app.profesiones = [
      {
          "desprf": "Medico",
          "codprf": "01"
      },
      {
          "desprf": "Licenciado",
          "codprf": "02"
      },
      {
          "desprf": "Ingeniero",
          "codprf": "03"
      }
    ];

    // datos del formulario
    const data = {
      "desprf": "Ingeniero",
      "codprf": "03"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codprf'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.codprfMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codprf}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funciom
    expect(app.form.value.desprf).toEqual(null)
    expect(app.form.value.codprf).toEqual(undefined)
    expect(app.profesionSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.profesiones = [
      {
          "desprf": "Medico",
          "codprf": "01"
      },
      {
          "desprf": "Licenciado",
          "codprf": "02"
      },
      {
          "desprf": "Ingeniero",
          "codprf": "03"
      }
    ];

    // datos del formulario
    const data = {
      "desprf": "Ingeniero",
      "codprf": "03"
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });


    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codprf'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codprf}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.desprf).toEqual("Ingeniero")
    expect(app.form.value.codprf).toEqual(undefined)
    expect(app.profesionSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.profesiones = [
      {
          "desprf": "Medico",
          "codprf": "01"
      },
      {
          "desprf": "Licenciado",
          "codprf": "02"
      },
      {
          "desprf": "Ingeniero",
          "codprf": "03"
      }
    ];

    // datos del formulario
    const data = {
      "desprf": "Ingeniero",
      "codprf": "03"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codprf'].setValue("02")
    expect(app.form.valid).toEqual(false)
    app.codprfMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codprf'].setValue("01234444444444444444444444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.codprfMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codprf'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codprfMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codprf'].setValue("")
    app.form.controls['desprf'].setValue("Ingeniero")
    expect(app.form.valid).toEqual(false)
    app.codprfMsgError

    // Reset hecho por la funcion
    expect(app.form.value.desprf).toEqual("Ingeniero")
    expect(app.form.value.codprf).toEqual('')

    app.campoInvalid('codprf');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.profesiones = [
      {
          "desprf": "Medico",
          "codprf": "01"
      },
      {
          "desprf": "Licenciado",
          "codprf": "02"
      },
      {
          "desprf": "Ingeniero",
          "codprf": "03"
      }
    ];

    // datos del formulario
    const data = {
      "desprf": "Licenciado",
      "codprf": "03"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codprf'].disable();
    app.form.reset(data)
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desprfMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codprf'].disable();
    app.form.reset(data)
    app.form.controls['desprf'].setValue("1234567891234567891234567891234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desprfMsgError

    //Caso Vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codprf'].disable();
    app.form.reset(data)
    app.form.controls['desprf'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desprfMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.desprf).toEqual('')
    expect(app.form.value.codprf).toEqual(undefined)

    app.campoInvalid('desprf');
    
  });
});
