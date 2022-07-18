import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/talentos/datosadicionales`;

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

    expect(app.form.value.nombre).toEqual(null)
    expect(app.form.value.descrip).toEqual(null)
    expect(app.form.value.tipoInfo).toEqual(null)
    expect(app.form.value.idEmpresa).toEqual(null)
    expect(app.form.value.id).toEqual(null)

    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.informacionAdicionalSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.informacionesAdicionales = [
      {
        "nombre": "Prueba 3",
        "descrip": "ca",
        "tipoInfo": "1",
        "idEmpresa": "97",
        "id": "3"
      },
      {
        "nombre": "info adicional",
        "descrip": "descripcion",
        "tipoInfo": "1",
        "idEmpresa": "95",
        "id": "1"
      },
    ];

    app.informacionAdicionalSelect = {
      "nombre": "info adicional",
      "descrip": "descripcion",
      "tipoInfo": "1",
      "idEmpresa": "95",
      "id": "1"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    
    app.informacionAdicionalSelect = {
      "nombre": "info adicional",
      "descrip": "descripcion",
      "tipoInfo": "1",
      "idEmpresa": "95",
      "id": "1"
    };

    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.nombre).toEqual("info adicional")
    expect(app.form.value.descrip).toEqual("descripcion")
    expect(app.form.value.tipoInfo).toEqual("1")
    expect(app.form.value.idEmpresa).toEqual(undefined)
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
    expect(app.form.value.nombre).toEqual(null)
    expect(app.form.value.descrip).toEqual(null)
    expect(app.form.value.tipoInfo).toEqual(null)
    expect(app.form.value.idEmpresa).toEqual(null)
    expect(app.form.value.id).toEqual(null)
    expect(app.informacionAdicionalSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.informacionesAdicionales = [
      {
        "nombre": "Prueba 3",
        "descrip": "ca",
        "tipoInfo": "1",
        "idEmpresa": "97",
        "id": "3"
      },
      {
        "nombre": "info adicional",
        "descrip": "descripcion",
        "tipoInfo": "1",
        "idEmpresa": "95",
        "id": "1"
      },
    ];
    
    // datos del formulario
    const data = {
      "nombre": "info adicional",
      "descrip": "descripcion",
      "tipoInfo": "1",
      "idEmpresa": "95",
      "id": "10"
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
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.informacionesAdicionales = [
      {
        "nombre": "Prueba 3",
        "descrip": "ca",
        "tipoInfo": "1",
        "idEmpresa": "97",
        "id": "3"
      },
      {
        "nombre": "info adicional",
        "descrip": "descripcion",
        "tipoInfo": "1",
        "idEmpresa": "95",
        "id": "1"
      },
    ];
    
    // datos del formulario
    const data = {
      "nombre": "info adicional",
      "descrip": "descripcion",
      "tipoInfo": "1",
      "idEmpresa": "95",
      "id": "10"
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
    app.informacionesAdicionales = [
      {
        "nombre": "Prueba 3",
        "descrip": "ca",
        "tipoInfo": "1",
        "idEmpresa": "97",
        "id": "3"
      },
      {
        "nombre": "info adicional",
        "descrip": "descripcion",
        "tipoInfo": "1",
        "idEmpresa": "95",
        "id": "1"
      },
    ];
    
    // datos del formulario
    const data = {
      "nombre": "info adicional",
      "descrip": "descripcion",
      "tipoInfo": "1",
      "idEmpresa": "95",
      "id": "1"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.nombreMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.idEmpresa).toEqual(null)
    expect(app.form.value.descrip).toEqual(null)
    expect(app.form.value.nombre).toEqual(null)
    expect(app.form.value.tipoInfo).toEqual(null)
    expect(app.form.value.id).toEqual(undefined)
    expect(app.informacionAdicionalSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.informacionesAdicionales = [
      {
        "nombre": "Prueba 3",
        "descrip": "ca",
        "tipoInfo": "1",
        "idEmpresa": "97",
        "id": "3"
      },
      {
        "nombre": "info adicional",
        "descrip": "descripcion",
        "tipoInfo": "1",
        "idEmpresa": "95",
        "id": "1"
      },
    ];
    
    // datos del formulario
    const data = {
      "nombre": "info adicional",
      "descrip": "descripcion",
      "tipoInfo": "1",
      "idEmpresa": "95",
      "id": "1"
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
    app.form.controls['descrip'].setValue('descripcion')
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.idEmpresa).toEqual(data.idEmpresa)
    expect(app.form.value.id).toEqual(undefined)
    expect(app.form.value.nombre).toEqual(data.nombre)
    expect(app.form.value.tipoInfo).toEqual(data.tipoInfo)
    expect(app.form.value.descrip).toEqual('descripcion')
    expect(app.informacionAdicionalSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.informacionesAdicionales = [
      {
        "nombre": "Prueba 3",
        "descrip": "ca",
        "tipoInfo": "1",
        "idEmpresa": "97",
        "id": "3"
      },
      {
        "nombre": "info adicional",
        "descrip": "descripcion",
        "tipoInfo": "1",
        "idEmpresa": "95",
        "id": "1"
      },
    ];
    
    // datos del formulario
    const data = {
      "nombre": "info adicionalw",
      "descrip": "descripcio2n",
      "tipoInfo": "1",
      "idEmpresa": "955",
      "id": "2"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("1")
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

    // Reset hecho por la funcion
    expect(app.form.value.idEmpresa).toEqual("955")
    expect(app.form.value.id).toEqual("")
    expect(app.form.value.nombre).toEqual("info adicionalw")
    expect(app.form.value.tipoInfo).toEqual("1")
    expect(app.form.value.descrip).toEqual("descripcio2n")

    app.campoInvalid('id');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.informacionesAdicionales = [
      {
        "nombre": "Prueba 3",
        "descrip": "ca",
        "tipoInfo": "1",
        "idEmpresa": "97",
        "id": "3"
      },
      {
        "nombre": "info adicional",
        "descrip": "descripcion",
        "tipoInfo": "1",
        "idEmpresa": "95",
        "id": "1"
      },
    ];
    
    // datos del formulario
    const data = {
      "nombre": "",
      "descrip": "Hola como estas",
      "tipoInfo": "1",
      "idEmpresa": "95",
      "id": "1"
    };

    //Caso Vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['nombre'].setValue("123456789123456789123jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj4jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj567891234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.idEmpresa).toEqual("95")
    expect(app.form.value.id).toEqual(undefined)
    expect(app.form.value.nombre).toEqual("123456789123456789123jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj4jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj567891234")
    expect(app.form.value.tipoInfo).toEqual("1")
    expect(app.form.value.descrip).toEqual("Hola como estas")

    app.campoInvalid('descrip');
    
  });
});
