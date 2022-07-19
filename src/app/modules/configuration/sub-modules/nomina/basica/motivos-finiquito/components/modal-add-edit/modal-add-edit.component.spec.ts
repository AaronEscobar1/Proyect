import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/motivosfiniquito`;

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

    expect(app.form.value.desde1).toEqual(null)
    expect(app.form.value.desde2).toEqual(null)
    expect(app.form.value.impliq).toEqual(null)
    expect(app.form.value.classo).toEqual(null)
    expect(app.form.value.coddes).toEqual(null)
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.motivoSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.motivosFiniquito = [
      {
        "desde1": "motivo de finiquito",
        "desde2": "motivo de finiquito",
        "impliq": "1",
        "classo": "1",
        "coddes": "1"
      }
    ];
    app.motivoSelect = {
      "desde1": "motivo de finiquito",
      "desde2": "motivo de finiquito",
      "impliq": "1",
      "classo": "1",
      "coddes": "1"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.desde1).toEqual("motivo de finiquito")
    expect(app.form.value.desde2).toEqual("motivo de finiquito")
    expect(app.form.value.impliq).toEqual(true)
    expect(app.form.value.classo).toEqual("1")
    expect(app.form.value.coddes).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.motivosFiniquito = [
      {
        "desde1": "motivo de finiquito",
        "desde2": "motivo de finiquito",
        "impliq": "1",
        "classo": "1",
        "coddes": "1"
      }
    ];
    app.motivoSelect = {
      "desde1": "motivo de finiquito",
      "desde2": "motivo de finiquito",
      "impliq": "0",
      "classo": "1",
      "coddes": "1"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.desde1).toEqual("motivo de finiquito")
    expect(app.form.value.desde2).toEqual("motivo de finiquito")
    expect(app.form.value.impliq).toEqual(false)
    expect(app.form.value.classo).toEqual("1")
    expect(app.form.value.coddes).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    expect(app.form.value.desde1).toEqual(null)
    expect(app.form.value.desde2).toEqual(null)
    expect(app.form.value.impliq).toEqual(null)
    expect(app.form.value.classo).toEqual(null)
    expect(app.form.value.coddes).toEqual(null)
    expect(app.motivoSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.motivosFiniquito = [
      {
        "desde1": "motivo de finiquito",
        "desde2": "motivo de finiquito",
        "impliq": "1",
        "classo": "1",
        "coddes": "1"
      }
    ];

    // datos del formulario
    const data =  {
      "desde1": "motivo de finiquito1",
      "desde2": "motivo de finiquito1",
      "impliq": false,
      "classo": "2",
      "coddes": "2"
    };

    const resp = {"message":"Mitivo Finiquito creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.coddesMsgError

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
    app.motivosFiniquito = [
      {
        "desde1": "motivo de finiquito",
        "desde2": "motivo de finiquito",
        "impliq": "1",
        "classo": "1",
        "coddes": "1"
      }
    ];

    // datos del formulario
    const data =  {
      "desde1": "motivo de finiquito1",
      "desde2": "motivo de finiquito1",
      "impliq": "2",
      "classo": "2",
      "coddes": "2"
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
    app.motivosFiniquito = [
      {
        "desde1": "motivo de finiquito",
        "desde2": "motivo de finiquito",
        "impliq": "1",
        "classo": "1",
        "coddes": "1"
      }
    ];

    const resp = {"message":"Motivos Finiquito creado."}

    // datos del formulario
    const data =  {
      "desde1": "motivo de finiquito11",
      "desde2": "motivo de finiquito11",
      "impliq": "1",
      "classo": "1",
      "coddes": "1"
    };
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['coddes'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.desde1MsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.coddes}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.desde1).toEqual(null)
    expect(app.form.value.desde2).toEqual(null)
    expect(app.form.value.impliq).toEqual(null)
    expect(app.form.value.classo).toEqual(null)
    expect(app.form.value.coddes).toEqual(undefined)
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.motivosFiniquito = [
      {
        "desde1": "motivo de finiquito",
        "desde2": "motivo de finiquito",
        "impliq": "1",
        "classo": "1",
        "coddes": "1"
      }
    ];

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    // datos del formulario
    const data =  {
      "desde1": "motivo de finiquito11",
      "desde2": "motivo de finiquito11",
      "impliq": "1",
      "classo": "1",
      "coddes": "1"
    };

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['coddes'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.coddes}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.desde1).toEqual(data.desde1)
    expect(app.form.value.desde2).toEqual(data.desde2)
    expect(app.form.value.impliq).toEqual(data.impliq)
    expect(app.form.value.classo).toEqual(data.classo)
    expect(app.form.value.coddes).toEqual(undefined)
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.motivosFiniquito = [
      {
        "desde1": "motivo de finiquito",
        "desde2": "motivo de finiquito",
        "impliq": "1",
        "classo": "1",
        "coddes": "1"
      }
    ];

    // datos del formulario
    const data =  {
      "desde1": "motivo de finiquito",
      "desde2": "motivo de finiquito",
      "impliq": "1",
      "classo": "1",
      "coddes": "1"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['coddes'].setValue("1")
    expect(app.form.valid).toEqual(false)
    app.coddesMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['coddes'].setValue("01234")
    expect(app.form.valid).toEqual(false)
    app.coddesMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['coddes'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.coddesMsgError

    // Reset hecho por la funcion
    expect(app.form.value.desde1).toEqual(data.desde1)
    expect(app.form.value.desde2).toEqual(data.desde2)
    expect(app.form.value.impliq).toEqual(data.impliq)
    expect(app.form.value.classo).toEqual(data.classo)
    expect(app.form.value.coddes).toEqual('')

    app.campoInvalid('coddes');
  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.motivosFiniquito = [
      {
        "desde1": "motivo de finiquito",
        "desde2": "motivo de finiquito",
        "impliq": "1",
        "classo": "1",
        "coddes": "1"
      },
      {
        "desde1": "motivo de finiquito2",
        "desde2": "motivo de finiquito2",
        "impliq": "2",
        "classo": "2",
        "coddes": "2"
      }
    ];

    // datos del formulario
    const data =  {
      "desde1": "motivo de finiquito2",
      "desde2": "motivo de finiquito2",
      "impliq": "0",
      "classo": "1",
      "coddes": "1"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['coddes'].disable();
    app.form.reset(data)
    app.form.controls['desde1'].setValue("motivo de finiquito2")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desde1MsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['coddes'].disable();
    app.form.reset(data)
    app.form.controls['desde1'].setValue("1234567891234567891234567891234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desde1MsgError

    //Caso Vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['coddes'].disable();
    app.form.reset(data)
    app.form.controls['desde1'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desde1MsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.desde1).toEqual('')
    expect(app.form.value.desde2).toEqual(data.desde2)
    expect(app.form.value.impliq).toEqual(data.impliq)
    expect(app.form.value.classo).toEqual(data.classo)
    expect(app.form.value.coddes).toEqual(undefined)

    app.campoInvalid('desde1');
    
  });
});
