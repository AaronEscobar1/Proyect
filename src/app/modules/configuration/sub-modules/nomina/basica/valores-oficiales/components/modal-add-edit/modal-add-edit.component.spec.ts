import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/valoresoficiales`;

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

    expect(app.valoresSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.valoresOficiales = [
      {
        "valor": 0.16352,
        "id": "06",
        "paisId": "VEN",
        "fecefe": "2014-01-06T00:00:00"
      },
      {
        "valor": 0.0009,
        "id": "08",
        "paisId": "VEN",
        "fecefe": "2013-09-01T00:00:00"
      },
    ];

    app.valoresSelect =       {
      "valor": 0.0009,
      "id": "08",
      "paisId": "VEN",
      "fecefe": "2013-09-01T00:00:00"
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
    expect(app.valoresSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.valoresOficiales = [
      {
        "valor": 0.16352,
        "id": "06",
        "paisId": "VEN",
        "fecefe": "2014-01-06T00:00:00"
      },
      {
        "valor": 0.0009,
        "id": "08",
        "paisId": "VEN",
        "fecefe": "2013-09-01T00:00:00"
      },
    ];

    //Data del formulario

    const data = {
      "valor": 0.0009,
      "id": "08",
      "paisId": "VEN",
      "fecefe": "2013-09-01T00:00:00"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.tipevloMsgError
    

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
    app.valoresOficiales = [
      {
        "valor": 0.16352,
        "id": "06",
        "paisId": "VEN",
        "fecefe": "2014-01-06T00:00:00"
      },
      {
        "valor": 0.0009,
        "id": "08",
        "paisId": "VEN",
        "fecefe": "2013-09-01T00:00:00"
      },
    ];

    //Data del formulario

    const data = {
      "valor": 0.0009,
      "id": "08",
      "paisId": "VEN",
      "fecefe": "2013-09-01T00:00:00"
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
    app.valoresOficiales = [
      {
        "valor": 0.16352,
        "id": "06",
        "paisId": "VEN",
        "fecefe": "2014-01-06T00:00:00"
      },
      {
        "valor": 0.0009,
        "id": "08",
        "paisId": "VEN",
        "fecefe": "2013-09-01T00:00:00"
      },
    ];

    //Data del formulario

    const data = {
      "valor": 0.0009,
      "id": "08",
      "paisId": "VEN",
      "fecefe": "2013-09-01T00:00:00"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.idvloMsgError
    app.datevloMsgError
    app.valorMsgError


    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.paisId}/${data.id}?fecefe=${data.fecefe}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funciom
    expect(app.valoresSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;

    app.valoresOficiales = [
      {
        "valor": 0.16352,
        "id": "06",
        "paisId": "VEN",
        "fecefe": "2014-01-06T00:00:00"
      },
      {
        "valor": 0.0009,
        "id": "08",
        "paisId": "VEN",
        "fecefe": "2013-09-01T00:00:00"
      },
    ];

    //Data del formulario

    const data = {
      "valor": 0.0009,
      "id": "08",
      "paisId": "VEN",
      "fecefe": "2013-09-01T00:00:00"
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

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.paisId}/${data.id}?fecefe=${data.fecefe}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.valoresSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.valoresOficiales = [
      {
        "valor": 0.16352,
        "id": "06",
        "paisId": "VEN",
        "fecefe": "2014-01-06T00:00:00"
      },
      {
        "valor": 0.0009,
        "id": "08",
        "paisId": "VEN",
        "fecefe": "2013-09-01T00:00:00"
      },
    ];

    //Data del formulario

    const data = {
      "valor": 0.0009,
      "id": "08",
      "paisId": "VEN",
      "fecefe": "2013-09-01T00:00:00"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.idvloMsgError
    app.campoInvalid('id');
    app.save();
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['paisId'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.tipevloMsgError
    app.campoInvalid('paisId');

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['fecefe'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.datevloMsgError
    app.campoInvalid('fecefe');

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['valor'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.valorMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['valor'].setValue("123456789123")
    expect(app.form.valid).toEqual(false)
    app.valorMsgError

    app.campoInvalid('valor');


  });
  
});
