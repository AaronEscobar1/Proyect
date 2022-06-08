import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';
import { By } from '@angular/platform-browser';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/niveleseducativos`;

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

    expect(app.form.value.codley).toEqual('')
    expect(app.form.value.codniv).toEqual('')
    expect(app.form.value.desniv).toEqual('')
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.nivelSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.niveles = [
      {
        "codniv": "3",
        "desniv": "NuevoNivelEducativo",
        "codley": "CCC"
      },
      {
        "codniv": "1",
        "desniv": "Primaria",
        "codley": "CC"
      },
      {
        "codniv": "2",
        "desniv": "Secundaria",
        "codley": "SES"
      }
    ];
    app.nivelSelect = {
      "codniv": '3',
      "desniv": '123456789123456789123456789',
      "codley": 'CCC'
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.codley).toEqual(app.nivelSelect.codley)
    expect(app.form.value.desniv).toEqual(app.nivelSelect.desniv)
    expect(app.form.valid).toEqual(true)
  });

  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModalAdd()
    expect(app.form.value.codley).toEqual(null)
    expect(app.form.value.codniv).toEqual(null)
    expect(app.form.value.desniv).toEqual(null)
    expect(app.form.valid).toEqual(false)
    expect(app.nivelSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.niveles = [
      {
        "codniv": "3",
        "desniv": "NuevoNivelEducativo",
        "codley": "CCC"
      },
      {
        "codniv": "1",
        "desniv": "Primaria",
        "codley": "CC"
      },
      {
        "codniv": "2",
        "desniv": "Secundaria",
        "codley": "SES"
      }
    ];
    // datos del formulario
    const data = {
      "codniv": '4',
      "desniv": '123456789123456789123456789',
      "codley": 'CCC'
    };

    const resp = {"message":"Nivel Educativo creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.codnivMsgError;
    
    // Llamamos a la funcion de Guardado
    app.saveNivel()

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
    app.niveles = [
      {
        "codniv": "3",
        "desniv": "NuevoNivelEducativo",
        "codley": "CCC"
      },
      {
        "codniv": "1",
        "desniv": "Primaria",
        "codley": "CC"
      },
      {
        "codniv": "2",
        "desniv": "Secundaria",
        "codley": "SES"
      }
    ];
    // datos del formulario
    const data = {
      "codniv": '4',
      "desniv": '123456789123456789123456789',
      "codley": 'CCC'
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
    app.saveNivel()

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
    app.niveles = [
      {
        "codniv": "3",
        "desniv": "NuevoNivelEducativo",
        "codley": "CCC"
      },
      {
        "codniv": "1",
        "desniv": "Primaria",
        "codley": "CC"
      },
      {
        "codniv": "2",
        "desniv": "Secundaria",
        "codley": "SES"
      }
    ];

    const resp = {"message":"Nivel Educativo creado."}

    // datos del formulario
    const data = {
      "codniv": '3',
      "desniv": "NuevoNivelEducativo2",
      "codley": "CCt"
    };
    
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codniv'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.codnivMsgError;

    // Llamamos a la funcion de Guardado
    app.saveNivel()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codniv}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.codley).toEqual(null)
    expect(app.form.value.codniv).toEqual(undefined)
    expect(app.form.value.desniv).toEqual(null)
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.niveles = [
      {
        "codniv": "3",
        "desniv": "NuevoNivelEducativo",
        "codley": "CCC"
      },
      {
        "codniv": "1",
        "desniv": "Primaria",
        "codley": "CC"
      },
      {
        "codniv": "2",
        "desniv": "Secundaria",
        "codley": "SES"
      }
    ];

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    // datos del formulario
    const data = {
      "codniv": '3',
      "desniv": "1NuevoNivelEducativo",
      "codley": "CCC"
    };

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codniv'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)
    app.desnivMsgError;

    // Llamamos a la funcion de Guardado
    app.saveNivel()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codniv}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.codley).toEqual(data.codley)
    expect(app.form.value.codniv).toEqual(undefined)
    expect(app.form.value.desniv).toEqual(data.desniv)
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.niveles = [
      {
        "codniv": "3",
        "desniv": "NuevoNivelEducativo",
        "codley": "CCC"
      },
      {
        "codniv": "1",
        "desniv": "Primaria",
        "codley": "CC"
      },
      {
        "codniv": "2",
        "desniv": "Secundaria",
        "codley": "SES"
      }
    ];

    // datos del formulario
    const data = {
      "codniv": '3',
      "desniv": "NuevoNivelEducativo",
      "codley": "CCC"
    };

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codniv'].setValue("3")
    expect(app.form.valid).toEqual(false)
    app.codnivMsgError;

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codniv'].setValue("12")
    expect(app.form.valid).toEqual(false)
    app.codnivMsgError;
    
    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codniv'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codnivMsgError;

    // Llamamos a la funcion de Guardado
    app.saveNivel()

    // Reset hecho por la funcion
    expect(app.form.value.codley).toEqual(data.codley)
    expect(app.form.value.codniv).toEqual('')
    expect(app.form.value.desniv).toEqual(data.desniv)

    app.campoInvalid('codniv');

  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.niveles = [
      {
        "codniv": "3",
        "desniv": "NuevoNivelEducativo",
        "codley": "CCC"
      },
      {
        "codniv": "1",
        "desniv": "Primaria",
        "codley": "CC"
      },
      {
        "codniv": "2",
        "desniv": "Secundaria",
        "codley": "SES"
      }
    ];

    // datos del formulario
    const data = {
      "codniv": '3',
      "desniv": "NuevoNivelEducativo",
      "codley": "CCC"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codniv'].disable();
    app.form.reset(data)
    app.form.controls['desniv'].setValue("Secundaria")
    expect(app.form.valid).toEqual(false)
    app.desnivMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codniv'].disable();
    app.form.reset(data)
    app.form.controls['desniv'].setValue("1234567891234567891234567891234")
    expect(app.form.valid).toEqual(false)
    app.desnivMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codniv'].disable();
    app.form.reset(data)
    app.form.controls['desniv'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.desnivMsgError

    app.saveNivel();

    // Reset hecho por la funcion
    expect(app.form.value.codley).toEqual(data.codley)
    expect(app.form.value.codniv).toEqual(undefined)
    expect(app.form.value.desniv).toEqual(app.form.value.desniv)

    app.campoInvalid('desniv');
  });
});
