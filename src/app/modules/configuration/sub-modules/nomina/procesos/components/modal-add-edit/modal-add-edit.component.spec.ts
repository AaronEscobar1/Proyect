import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/procesos`;

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

    expect(app.form.value.nompro).toEqual('')
    expect(app.form.value.nodefi).toEqual(false)
    expect(app.form.value.nomadi).toEqual('')
    expect(app.form.value.tippro).toEqual('')

    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.procesoSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.procesos = [
      {
        "nompro": "BENEFICIO DE ALIMENTACION",
        "nodefi": "0",
        "nomadi": "BENEFICIO DE ALIMENTACION ADICIONAL",
        "tippro": 56
      },
      {
        "nompro": "RETROACT.  PREST. SOC. PMT",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 99
      },
      {
        "nompro": "AJUSTE DE UTILIDADES",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 53
      },
    ];

    app.procesoSelect = {
      "nompro": "AJUSTE DE UTILIDADES",
      "nodefi": "1",
      "nomadi": null,
      "tippro": 53
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    
    app.procesoSelect = {
      "nompro": "AJUSTE DE UTILIDADES",
      "nodefi": "0",
      "nomadi": null,
      "tippro": 53
    };

    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.nompro).toEqual("AJUSTE DE UTILIDADES")
    expect(app.form.value.nodefi).toEqual(false)
    expect(app.form.value.nomadi).toEqual(null)
    expect(app.form.value.tippro).toEqual(undefined)
    expect(app.form.valid).toEqual(true)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    // Reset hecho por la funcion
    expect(app.form.value.nompro).toEqual(null)
    expect(app.form.value.nodefi).toEqual(null)
    expect(app.form.value.nomadi).toEqual(null)
    expect(app.form.value.tippro).toEqual(null)
    expect(app.procesoSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.procesos = [
      {
        "nompro": "BENEFICIO DE ALIMENTACION",
        "nodefi": "0",
        "nomadi": "BENEFICIO DE ALIMENTACION ADICIONAL",
        "tippro": 56
      },
      {
        "nompro": "RETROACT.  PREST. SOC. PMT",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 99
      },
      {
        "nompro": "AJUSTE DE UTILIDADES",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 53
      },
    ];
    
    // datos del formulario
    const data = {
      "nompro": "AJUSTE DE UTILIDADESs",
      "nodefi": "0",
      "nomadi": null,
      "tippro": 54
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.tipproMsgError
    

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
    app.procesos = [
      {
        "nompro": "BENEFICIO DE ALIMENTACION",
        "nodefi": "0",
        "nomadi": "BENEFICIO DE ALIMENTACION ADICIONAL",
        "tippro": 56
      },
      {
        "nompro": "RETROACT.  PREST. SOC. PMT",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 99
      },
      {
        "nompro": "AJUSTE DE UTILIDADES",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 53
      },
    ];
    
    // datos del formulario
    const data = {
      "nompro": "AJUSTE DE UTILIDADESs",
      "nodefi": "0",
      "nomadi": null,
      "tippro": 54
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
    app.procesos = [
      {
        "nompro": "BENEFICIO DE ALIMENTACION",
        "nodefi": "0",
        "nomadi": "BENEFICIO DE ALIMENTACION ADICIONAL",
        "tippro": 56
      },
      {
        "nompro": "RETROACT.  PREST. SOC. PMT",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 99
      },
      {
        "nompro": "AJUSTE DE UTILIDADES",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 53
      },
    ];
    
    // datos del formulario
    const data = {
      "nompro": "AJUSTE DE UTILIDADES",
      "nodefi": "0",
      "nomadi": null,
      "tippro": 53
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['tippro'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.nomproMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.tippro}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.nompro).toEqual(null)
    expect(app.form.value.nodefi).toEqual(null)
    expect(app.form.value.nomadi).toEqual(data.nomadi)
    expect(app.form.value.tippro).toEqual(undefined)
    expect(app.procesoSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.procesos = [
      {
        "nompro": "BENEFICIO DE ALIMENTACION",
        "nodefi": "0",
        "nomadi": "BENEFICIO DE ALIMENTACION ADICIONAL",
        "tippro": 56
      },
      {
        "nompro": "RETROACT.  PREST. SOC. PMT",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 99
      },
      {
        "nompro": "AJUSTE DE UTILIDADES",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 53
      },
    ];
    
    // datos del formulario
    const data = {
      "nompro": "AJUSTE DE UTILIDADES",
      "nodefi": "0",
      "nomadi": null,
      "tippro": 53
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });


    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['tippro'].disable();
    app.form.reset(data)
    app.form.controls['nodefi'].setValue(false)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.tippro}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.nompro).toEqual(data.nompro)
    expect(app.form.value.nodefi).toEqual(false)
    expect(app.form.value.nomadi).toEqual(data.nomadi)
    expect(app.form.value.tippro).toEqual(undefined)
    expect(app.procesoSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.procesos = [
      {
        "nompro": "BENEFICIO DE ALIMENTACION",
        "nodefi": "0",
        "nomadi": "BENEFICIO DE ALIMENTACION ADICIONAL",
        "tippro": 56
      },
      {
        "nompro": "RETROACT.  PREST. SOC. PMT",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 99
      },
      {
        "nompro": "AJUSTE DE UTILIDADES",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 53
      },
    ];
    
    // datos del formulario
    const data = {
      "nompro": "AJUSTE DE UTILIDADES",
      "nodefi": "0",
      "nomadi": null,
      "tippro": 53
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['tippro'].setValue(53)
    expect(app.form.valid).toEqual(false)
    app.tipproMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['tippro'].setValue("01234444444444444444444444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.tipproMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['tippro'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.tipproMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['tippro'].setValue("")
    app.form.controls['nompro'].setValue("AJUSTE DE UTILIDADES")
    expect(app.form.valid).toEqual(false)
    app.tipproMsgError

    // Reset hecho por la funcion
    expect(app.form.value.nompro).toEqual("AJUSTE DE UTILIDADES")
    expect(app.form.value.nodefi).toEqual(data.nodefi)
    expect(app.form.value.nomadi).toEqual(data.nomadi)
    expect(app.form.value.tippro).toEqual("")

    app.campoInvalid('tippro');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.procesos = [
      {
        "nompro": "BENEFICIO DE ALIMENTACION",
        "nodefi": "0",
        "nomadi": "BENEFICIO DE ALIMENTACION ADICIONAL",
        "tippro": 56
      },
      {
        "nompro": "RETROACT.  PREST. SOC. PMT",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 99
      },
      {
        "nompro": "AJUSTE DE UTILIDADES",
        "nodefi": "0",
        "nomadi": null,
        "tippro": 53
      },
    ];
    
    // datos del formulario
    const data = {
      "nompro": "RETROACT.  PREST. SOC. PMT",
      "nodefi": "1",
      "nomadi": null,
      "tippro": 53
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['tippro'].disable();
    app.form.reset(data)
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nomproMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['tippro'].disable();
    app.form.reset(data)
    app.form.controls['nompro'].setValue("1234567891234567891234567891234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nomproMsgError

    //Caso Vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['tippro'].disable();
    app.form.reset(data)
    app.form.controls['nompro'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nomproMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.nompro).toEqual("")
    expect(app.form.value.nodefi).toEqual(data.nodefi)
    expect(app.form.value.nomadi).toEqual(data.nomadi)
    expect(app.form.value.tippro).toEqual(undefined)

    app.campoInvalid('nompro');
    
  });
});
