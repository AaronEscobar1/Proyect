import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/clasificacionesoficiales`;

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

    expect(app.form.value.codofi).toEqual('')
    expect(app.form.value.desofi).toEqual('')
    expect(app.form.value.tiprep).toEqual('')
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.officialClassificationSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.officialClassification = [
      {
        "desofi": "Con Discapacidad",
        "tiprep": "01",
        "codofi": "9"
      },
      {
          "desofi": "Trab. Familiares no remunerado",
          "tiprep": "01",
          "codofi": "2"
      },
      {
          "desofi": "Aprendices",
          "tiprep": "01",
          "codofi": "6"
      },
    ];
    app.officialClassificationSelect = {
      "desofi": "Aprendices",
      "tiprep": "01",
      "codofi": "6"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.desofi).toEqual("Aprendices")
    expect(app.form.value.tiprep).toEqual("01")
    expect(app.form.value.codofi).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    expect(app.form.value.codofi).toEqual(null)
    expect(app.form.value.desofi).toEqual(null)
    expect(app.form.value.tiprep).toEqual(null)
    expect(app.officialClassificationSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.officialClassification = [
      {
        "desofi": "Con Discapacidad",
        "tiprep": "01",
        "codofi": "9"
      },
      {
          "desofi": "Trab. Familiares no remunerado",
          "tiprep": "01",
          "codofi": "2"
      },
      {
          "desofi": "Aprendices",
          "tiprep": "01",
          "codofi": "6"
      },
    ];

    // datos del formulario
    const data = {
      "desofi": "Aprendicess",
      "tiprep": "01",
      "codofi": "8"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.codofiMsgError
    

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`http://localhost:8080/api/clasificacionesoficiales`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('POST');

  });

  it('Probando el Guardado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.officialClassification = [
      {
        "desofi": "Con Discapacidad",
        "tiprep": "01",
        "codofi": "9"
      },
      {
          "desofi": "Trab. Familiares no remunerado",
          "tiprep": "01",
          "codofi": "2"
      },
      {
          "desofi": "Aprendices",
          "tiprep": "01",
          "codofi": "6"
      },
    ];

    // datos del formulario
    const data = {
      "desofi": "Aprendicess",
      "tiprep": "01",
      "codofi": "8"
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
    app.officialClassification = [
      {
        "desofi": "Con Discapacidad",
        "tiprep": "01",
        "codofi": "9"
      },
      {
          "desofi": "Trab. Familiares no remunerado",
          "tiprep": "01",
          "codofi": "2"
      },
      {
          "desofi": "Aprendices",
          "tiprep": "01",
          "codofi": "6"
      },
    ];

    // datos del formulario
    const data = {
      "desofi": "Aprendicess",
      "tiprep": "21",
      "codofi": "9"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codofi'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.desofiMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codofi}/${data.tiprep}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.desofi).toEqual(null)
    expect(app.form.value.tiprep).toEqual(null)
    expect(app.form.value.codofi).toEqual(undefined)
    expect(app.officialClassificationSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.officialClassification = [
      {
        "desofi": "Con Discapacidad",
        "tiprep": "01",
        "codofi": "9"
      },
      {
          "desofi": "Trab. Familiares no remunerado",
          "tiprep": "01",
          "codofi": "2"
      },
      {
          "desofi": "Aprendices",
          "tiprep": "01",
          "codofi": "6"
      },
    ];

    // datos del formulario
    const data = {
      "desofi": "Aprendicess",
      "tiprep": "01",
      "codofi": "6"
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });


    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codofi'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codofi}/${data.tiprep}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.desofi).toEqual(data.desofi)
    expect(app.form.value.tiprep).toEqual(data.tiprep)
    expect(app.form.value.codofi).toEqual(undefined)
    expect(app.officialClassificationSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.officialClassification = [
      {
        "desofi": "Con Discapacidad",
        "tiprep": "01",
        "codofi": "9"
      },
      {
          "desofi": "Trab. Familiares no remunerado",
          "tiprep": "01",
          "codofi": "2"
      },
      {
          "desofi": "Aprendices",
          "tiprep": "01",
          "codofi": "6"
      },
    ];

    // datos del formulario
    const data = {
      "desofi": "Aprendicess",
      "tiprep": "21",
      "codofi": "6"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codofi'].setValue("6")
    expect(app.form.valid).toEqual(false)
    app.codofiMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codofi'].setValue("01234444444444444444444444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.codofiMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codofi'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codofiMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codofi'].setValue("")
    app.form.controls['desofi'].setValue("Aprendices")
    expect(app.form.valid).toEqual(false)
    app.codofiMsgError

    // Reset hecho por la funcion
    expect(app.form.value.desofi).toEqual("Aprendices")
    expect(app.form.value.tiprep).toEqual(data.tiprep)
    expect(app.form.value.codofi).toEqual('')

    app.campoInvalid('codofi');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.officialClassification = [
      {
        "desofi": "Con Discapacidad",
        "tiprep": "01",
        "codofi": "9"
      },
      {
        "desofi": "Trab. Familiares no remunerado",
        "tiprep": "01",
        "codofi": "2"
      },
      {
        "desofi": "Aprendices",
        "tiprep": "01",
        "codofi": "6"
      },
    ];

    // datos del formulario
    const data = {
      "desofi": "Aprendices",
      "tiprep": "01",
      "codofi": "9"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codofi'].disable();
    app.form.reset(data)
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desofiMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codofi'].disable();
    app.form.reset(data)
    app.form.controls['desofi'].setValue("1234567891234567891234567891234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desofiMsgError

    //Caso Vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codofi'].disable();
    app.form.reset(data)
    app.form.controls['desofi'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.desofiMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.desofi).toEqual('')
    expect(app.form.value.tiprep).toEqual(data.tiprep)
    expect(app.form.value.codofi).toEqual(undefined)

    app.campoInvalid('desofi');
    
  });
});
