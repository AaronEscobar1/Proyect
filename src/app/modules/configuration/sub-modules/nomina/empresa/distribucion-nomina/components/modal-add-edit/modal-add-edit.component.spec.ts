import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/empresas/93/distribucionesnomina`;

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

    expect(app.form.value.dessuc).toEqual(null)
    expect(app.form.value.codctb).toEqual(null)
    expect(app.form.value.codubi).toEqual(null)
    expect(app.form.value.codsuc).toEqual(null)

    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.distribucionNominaSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.distribucionesNomina = [
      {
        "dessuc": "4444",
        "codctb": "12",
        "codubi": "444",
        "codsuc": "1234",
        "idEmpresa": "93"
      },
      {
        "dessuc": "prueba jose",
        "codctb": "12",
        "codubi": "CCS012",
        "codsuc": "1515",
        "idEmpresa": "93"
      }
    ];

    app.distribucionNominaSelect = {
      "dessuc": "prueba jose",
      "codctb": "12",
      "codubi": "CCS012",
      "codsuc": "1515",
    }

    
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    
    app.isEdit = false
    
    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 12,
      "capitalSub": 12,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "null",
      "paginaWeb": "null",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "null",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.dessuc).toEqual(null)
    expect(app.form.value.codctb).toEqual(null)
    expect(app.form.value.codubi).toEqual(null)
    expect(app.form.value.codsuc).toEqual(null)
    expect(app.form.valid).toEqual(false)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    // Reset hecho por la funcion
    expect(app.form.value.dessuc).toEqual(null)
    expect(app.form.value.codctb).toEqual(null)
    expect(app.form.value.codubi).toEqual(null)
    expect(app.form.value.codsuc).toEqual(null)
    expect(app.distribucionNominaSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.distribucionesNomina = [
      {
        "dessuc": "4444",
        "codctb": "12",
        "codubi": "444",
        "codsuc": "1234",
        "idEmpresa": "93"
      },
      {
        "dessuc": "prueba jose",
        "codctb": "12",
        "codubi": "CCS012",
        "codsuc": "1515",
        "idEmpresa": "93"
      }
    ];
    
    // datos del formulario
    const data = {
      "dessuc": "prueba1",
      "codctb": "",
      "codubi": "CCS012",
      "codsuc": "1516",
    }

    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 12,
      "capitalSub": 12,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "null",
      "paginaWeb": "null",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "null",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.codsucMsgError
    app.dessucMsgError
    
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
    app.distribucionesNomina = [
      {
        "dessuc": "4444",
        "codctb": "12",
        "codubi": "444",
        "codsuc": "1234",
        "idEmpresa": "93"
      },
      {
        "dessuc": "prueba jose",
        "codctb": "12",
        "codubi": "CCS012",
        "codsuc": "1515",
        "idEmpresa": "93"
      }
    ];
    
    // datos del formulario
    const data = {
      "dessuc": "prueba joseee",
      "codctb": "12",
      "codubi": "CCS012",
      "codsuc": "1516",
    }

    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 12,
      "capitalSub": 12,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "null",
      "paginaWeb": "null",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "null",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

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
    app.distribucionesNomina = [
      {
        "dessuc": "4444",
        "codctb": "12",
        "codubi": "444",
        "codsuc": "1234",
        "idEmpresa": "93"
      },
      {
        "dessuc": "prueba jose",
        "codctb": "12",
        "codubi": "CCS012",
        "codsuc": "1515",
        "idEmpresa": "93"
      }
    ];
    
    // datos del formulario
    const data = {
      "dessuc": "prueba jose",
      "codctb": "12",
      "codubi": "CCS012",
      "codsuc": "1515",
    }

    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 12,
      "capitalSub": 12,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "null",
      "paginaWeb": "null",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "null",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsuc'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codsuc}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.dessuc).toEqual(null)
    expect(app.form.value.codctb).toEqual(null)
    expect(app.form.value.codubi).toEqual(null)
    expect(app.form.value.codsuc).toEqual(undefined)
    expect(app.distribucionNominaSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.distribucionesNomina = [
      {
        "dessuc": "4444",
        "codctb": "12",
        "codubi": "444",
        "codsuc": "1234",
        "idEmpresa": "93"
      },
      {
        "dessuc": "prueba jose",
        "codctb": "12",
        "codubi": "CCS012",
        "codsuc": "1515",
        "idEmpresa": "93"
      }
    ];
    
    // datos del formulario
    const data = {
      "dessuc": "prueba jose",
      "codctb": "12",
      "codubi": "CCS012",
      "codsuc": "1515",
    }

    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 12,
      "capitalSub": 12,
      "rif1": "J-00301656-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "1070",
      "telefono1": "582122053152",
      "telefono2": null,
      "fax": "null",
      "paginaWeb": "null",
      "eMail": "correo@gmail.com",
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "null",
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });


    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsuc'].disable();
    app.form.reset(data)
    app.form.controls['dessuc'].setValue("hola")
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codsuc}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.dessuc).toEqual('hola')
    expect(app.form.value.codctb).toEqual(data.codctb)
    expect(app.form.value.codubi).toEqual(data.codubi)
    expect(app.form.value.codsuc).toEqual(undefined)
    expect(app.distribucionNominaSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.distribucionesNomina = [
      {
        "dessuc": "4444",
        "codctb": "12",
        "codubi": "444",
        "codsuc": "1234",
        "idEmpresa": "93"
      },
      {
        "dessuc": "prueba jose",
        "codctb": "12",
        "codubi": "CCS012",
        "codsuc": "1515",
        "idEmpresa": "93"
      }
    ];
    
    // datos del formulario
    const data = {
      "dessuc": "prueba jose",
      "codctb": "12",
      "codubi": "CCS012",
      "codsuc": "1515",
    }

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    expect(app.form.valid).toEqual(false)
    app.codsucMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codsuc'].setValue("01234444444444444444444555555555555555444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.codsucMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codsuc'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codsucMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codsuc'].setValue("")
    app.form.controls['dessuc'].setValue("nivel dos")
    expect(app.form.valid).toEqual(false)
    app.codsucMsgError

    // Reset hecho por la funcion
    expect(app.form.value.dessuc).toEqual("nivel dos")
    expect(app.form.value.codctb).toEqual("12")
    expect(app.form.value.codubi).toEqual("CCS012")
    expect(app.form.value.codsuc).toEqual("")

    app.campoInvalid('codsuc');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.distribucionesNomina = [
      {
        "dessuc": "4444",
        "codctb": "12",
        "codubi": "444",
        "codsuc": "1234",
        "idEmpresa": "93"
      },
      {
        "dessuc": "prueba jose",
        "codctb": "12",
        "codubi": "CCS012",
        "codsuc": "1515",
        "idEmpresa": "93"
      }
    ];
    
    // datos del formulario
    const data = {
      "dessuc": "",
      "codctb": "12",
      "codubi": "CCS012",
      "codsuc": "1515",
    }

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsuc'].disable();
    app.form.reset(data)
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.dessucMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsuc'].disable();
    app.form.reset(data)
    app.form.controls['dessuc'].setValue("12345678912345678912345678915555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.dessucMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.dessuc).toEqual("12345678912345678912345678915555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555234")
    expect(app.form.value.codctb).toEqual(data.codctb)
    expect(app.form.value.codubi).toEqual(data.codubi)
    expect(app.form.value.codsuc).toEqual(undefined)

    app.campoInvalid('dessuc');
    
  });
});
