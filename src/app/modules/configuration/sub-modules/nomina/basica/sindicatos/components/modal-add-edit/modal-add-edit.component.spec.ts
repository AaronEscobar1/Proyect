import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';

const event = {
  value: "VEN"
}

describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/sindicatos`;

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

    expect(app.form.value.codsin).toEqual('')
    expect(app.form.value.dessin).toEqual('')

    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.sindicatosSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.sindicatos = [
      {
        "dessin": "prueba jose",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": null,
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "666"
      },
      {
        "dessin": "Sindi opopo",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": "jojojojojoj",
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "51"
      }
    ];

    app.sindicatosSelect = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
  
    // Validacion
    expect(app.form.value.dessin).toEqual("prueba jose")
    expect(app.form.value.codsin).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    // Reset hecho por la funcion
    expect(app.form.value.codsin).toEqual(null)
    expect(app.form.value.dessin).toEqual(null)
    expect(app.sindicatosSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.sindicatos = [
      {
        "dessin": "prueba jose",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": null,
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "666"
      },
      {
        "dessin": "Sindi opopo",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": "jojojojojoj",
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "51"
      }
    ];

    // datos del formulario
    const data = {
      "dessin": "prueba josee",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "662"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.dessinMsgError
    

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
    app.sindicatos = [
      {
        "dessin": "prueba jose",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": null,
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "666"
      },
      {
        "dessin": "Sindi opopo",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": "jojojojojoj",
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "51"
      }
    ];

    // datos del formulario
    const data = {
      "dessin": "prueba joseee",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "664"
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
    app.sindicatos = [
      {
        "dessin": "prueba jose",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": null,
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "666"
      },
      {
        "dessin": "Sindi opopo",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": "jojojojojoj",
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "51"
      }
    ];

    // datos del formulario
    const data = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": '',
      "local": "0",
      "codsin": "666"
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsin'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)
    app.codsinMsgError
    app.eMailMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codsin}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funciom
    expect(app.form.value.dessin).toEqual(null)
    expect(app.form.value.codsin).toEqual(null)
    expect(app.sindicatosSelect).toEqual(undefined);

    app.clearCountrySelect();

  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.sindicatos = [
      {
        "dessin": "prueba jose",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": null,
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "666"
      },
      {
        "dessin": "Sindi opopo",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": "jojojojojoj",
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "51"
      }
    ];

    // datos del formulario
    const data = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });


    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsin'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codsin}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.dessin).toEqual("prueba jose")
    expect(app.form.value.codsin).toEqual(undefined)
    expect(app.sindicatosSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.sindicatos = [
      {
        "dessin": "prueba jose",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": null,
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "666"
      },
      {
        "dessin": "Sindi opopo",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": "jojojojojoj",
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "51"
      }
    ];

    // datos del formulario
    const data = {
      "dessin": "prueba jose",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codsin'].setValue("666")
    expect(app.form.valid).toEqual(false)
    app.codsinMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codsin'].setValue("01234444444444444444444444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.codsinMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codsin'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codsinMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codsin'].setValue("")
    app.form.controls['dessin'].setValue("prueba jose")
    expect(app.form.valid).toEqual(false)
    app.codsinMsgError

    // Reset hecho por la funcion
    expect(app.form.value.dessin).toEqual("prueba jose")
    expect(app.form.value.codsin).toEqual("")

    app.campoInvalid('codsin');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.sindicatos = [
      {
        "dessin": "prueba jose",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": null,
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "666"
      },
      {
        "dessin": "Sindi opopo",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": "jojojojojoj",
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "51"
      }
    ];

    // datos del formulario
    const data = {
      "dessin": "Sindi opopo",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": null,
      "local": "0",
      "codsin": "666"
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsin'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.dessinMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsin'].disable();
    app.form.reset(data)
    app.form.controls['dessin'].setValue("12345678912345678912345678912340000000000000000000000000000000000000000000000000000000000")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.dessinMsgError

    //Caso Vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsin'].disable();
    app.form.reset(data)
    app.form.controls['dessin'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.dessinMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.codsin).toEqual(undefined)
    expect(app.form.value.dessin).toEqual('')

    app.campoInvalid('dessin');
    
  });

  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.sindicatos = [
      {
        "dessin": "prueba jose",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": null,
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "666"
      },
      {
        "dessin": "Sindi opopo",
        "registro": null,
        "nroreg": null,
        "ntomo": null,
        "nfolio": null,
        "dirsi1": null,
        "dirsi2": null,
        "dirsi3": null,
        "cdadCodciu": "jojojojojoj",
        "edoCodedo": null,
        "paiCodpai": null,
        "tlfsi1": null,
        "tlfsi2": null,
        "faxsin": null,
        "tlxsin": null,
        "eMail": null,
        "local": "0",
        "codsin": "51"
      }
    ];

    // datos del formulario
    const data = {
      "dessin": "Sindi opopo",
      "registro": null,
      "nroreg": null,
      "ntomo": null,
      "nfolio": null,
      "dirsi1": null,
      "dirsi2": null,
      "dirsi3": null,
      "cdadCodciu": null,
      "edoCodedo": null,
      "paiCodpai": null,
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": '234567891234567891234567444444444444489123456789',
      "local": "0",
      "codsin": "646"
    };

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsin'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.eMailMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsin'].disable();
    app.form.reset(data)
    app.form.controls['eMail'].setValue("Holacomoestas")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.eMailMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.codsin).toEqual(undefined)
    expect(app.form.value.dessin).toEqual('Sindi opopo')

    app.campoInvalid('eMail');
    
  });
});
