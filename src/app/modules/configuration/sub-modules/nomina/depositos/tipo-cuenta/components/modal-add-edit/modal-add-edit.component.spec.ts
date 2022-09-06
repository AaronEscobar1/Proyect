import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/equivalencias/tiposcuentasdepositos`;

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

    expect(app.tipoCuentaSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.tiposCuentas = [
      {
        "descta": "CUENTA CORRIENTE",
        "tipcta": "1"
      },
      {
        "descta": "CUENTA AHORRO",
        "tipcta": "2"
      },
      {
        "descta": "FONDO ACTIVO LIQUIDO",
        "tipcta": "3"
      }
    ];

    app.tipoCuentaSelect = {
      "descta": "FONDO ACTIVO LIQUIDO",
      "tipcta": "3"
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
    // Reset hecho por la funcion
    expect(app.tipoCuentaSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.tiposCuentas = [
      {
        "descta": "CUENTA CORRIENTE",
        "tipcta": "1"
      },
      {
        "descta": "CUENTA AHORRO",
        "tipcta": "2"
      },
      {
        "descta": "FONDO ACTIVO LIQUIDO",
        "tipcta": "3"
      }
    ];

    //Data del formulario

    const data = {
      "descta": "FONDO ACTIVO LIQUIDO",
      "tipcta": "4"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.tipctaMsgError
    app.desctaMsgError
    

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
    app.tiposCuentas = [
      {
        "descta": "CUENTA CORRIENTE",
        "tipcta": "1"
      },
      {
        "descta": "CUENTA AHORRO",
        "tipcta": "2"
      },
      {
        "descta": "FONDO ACTIVO LIQUIDO",
        "tipcta": "3"
      }
    ];

    //Data del formulario

    const data = {
      "descta": "FONDO ACTIVO LIQUIDO",
      "tipcta": "4"
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
    app.tiposCuentas = [
      {
        "descta": "CUENTA CORRIENTE",
        "tipcta": "1"
      },
      {
        "descta": "CUENTA AHORRO",
        "tipcta": "2"
      },
      {
        "descta": "FONDO ACTIVO LIQUIDO",
        "tipcta": "3"
      }
    ];

    //Data del formulario

    const data = {
      "descta": "FONDO ACTIVO LIQUIDO",
      "tipcta": "3"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['tipcta'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.tipctaMsgError
    app.desctaMsgError


    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.tipcta}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funciom
    expect(app.tipoCuentaSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;

    app.tiposCuentas = [
      {
        "descta": "CUENTA CORRIENTE",
        "tipcta": "1"
      },
      {
        "descta": "CUENTA AHORRO",
        "tipcta": "2"
      },
      {
        "descta": "FONDO ACTIVO LIQUIDO",
        "tipcta": "3"
      }
    ];

    //Data del formulario

    const data = {
      "descta": "FONDO ACTIVO LIQUIDO",
      "tipcta": "3"
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });


    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['tipcta'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.tipcta}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.tipoCuentaSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.tiposCuentas = [
      {
        "descta": "CUENTA CORRIENTE",
        "tipcta": "1"
      },
      {
        "descta": "CUENTA AHORRO",
        "tipcta": "2"
      },
      {
        "descta": "FONDO ACTIVO LIQUIDO",
        "tipcta": "3"
      }
    ];

    //Data del formulario

    const data = {
      "descta": "FONDO ACTIVO LIQUIDO",
      "tipcta": "3"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['tipcta'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.tipctaMsgError
    app.campoInvalid('tipcta');
    app.save();
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['tipcta'].setValue("3")
    expect(app.form.valid).toEqual(false)
    app.tipctaMsgError
    app.campoInvalid('tipcta');

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['tipcta'].setValue("444444")
    expect(app.form.valid).toEqual(false)
    app.tipctaMsgError
    app.campoInvalid('tipcta');

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['descta'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.desctaMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['descta'].setValue("12345sdgsdghdfhsfhsdfhsdfhsfghsghsgfhsdfhfsghsdfhsghgfhsdfg6789123")
    expect(app.form.valid).toEqual(false)
    app.desctaMsgError

    app.campoInvalid('descta');


  });
  
});
