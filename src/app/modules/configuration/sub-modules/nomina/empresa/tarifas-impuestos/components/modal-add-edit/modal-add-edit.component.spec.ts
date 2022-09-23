import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';
import { By } from '@angular/platform-browser';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/tarifasimpuestos`;

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

    expect(app.tarifaImpuestoSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 

    app.tarifasImpuestos = [
      {
        "tasim1": 444,
        "tasim2": 4,
        "valsus": 44,
        "idEmpresa": "93",
        "anomes": new Date("2022-01-01T00:00:00"),
        "remdes": 12,
        "remhas": 33,
        "frecue": 0,
        "tipreg": "0"
      },
      {
        "tasim1": 14,
        "tasim2": 14,
        "valsus": 14,
        "idEmpresa": "93",
        "anomes": new Date("2022-02-01T00:00:00"),
        "remdes": 669,
        "remhas": 6600,
        "frecue": 360,
        "tipreg": "2"
      }
    ]

    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 21,
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.tarifaImpuestoSelect = {
      "tasim1": 14,
      "tasim2": 14,
      "valsus": 14,
      "idEmpresa": "93",
      "anomes": new Date("2022-02-01T00:00:00"),
      "remdes": 669,
      "remhas": 6600,
      "frecue": 360,
      "tipreg": "2"
    }
    
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
  });

  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 21,
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.tarifasImpuestos = [
      {
        "tasim1": 444,
        "tasim2": 4,
        "valsus": 44,
        "idEmpresa": "93",
        "anomes": new Date("2022-01-01T00:00:00"),
        "remdes": 12,
        "remhas": 33,
        "frecue": 0,
        "tipreg": "0"
      },
      {
        "tasim1": 14,
        "tasim2": 14,
        "valsus": 14,
        "idEmpresa": "93",
        "anomes": new Date("2022-02-01T00:00:00"),
        "remdes": 669,
        "remhas": 6600,
        "frecue": 360,
        "tipreg": "2"
      }
    ];

    // datos del formulario
    const data = {
      "tasim1": 14,
      "tasim2": 14,
      "valsus": 14,
      "idEmpresa": "93",
      "anomes": new Date("2022-04-01T00:00:00"),
      "remdes": 669,
      "remhas": 6600,
      "frecue": 360,
      "tipreg": "2"
    };

    const resp = {"message":"Nivel Educativo creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.anomesMsgError;
    app.remhasMsgError;
    app.remdesMsgError;
    
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

    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 21,
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.tarifasImpuestos = [
      {
        "tasim1": 444,
        "tasim2": 4,
        "valsus": 44,
        "idEmpresa": "93",
        "anomes": new Date("2022-01-01T00:00:00"),
        "remdes": 12,
        "remhas": 33,
        "frecue": 0,
        "tipreg": "0"
      },
      {
        "tasim1": 14,
        "tasim2": 14,
        "valsus": 14,
        "idEmpresa": "93",
        "anomes": new Date("2022-02-01T00:00:00"),
        "remdes": 669,
        "remhas": 6600,
        "frecue": 360,
        "tipreg": "2"
      }
    ];

    // datos del formulario
    const data = {
      "tasim1": 14,
      "tasim2": 14,
      "valsus": 14,
      "idEmpresa": "93",
      "anomes": new Date("2022-04-01T00:00:00"),
      "remdes": 669,
      "remhas": 6600,
      "frecue": 360,
      "tipreg": "2"
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

    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 21,
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.tarifasImpuestos = [
      {
        "tasim1": 444,
        "tasim2": 4,
        "valsus": 44,
        "idEmpresa": "93",
        "anomes": new Date("2022-01-01T00:00:00"),
        "remdes": 12,
        "remhas": 33,
        "frecue": 0,
        "tipreg": "0"
      },
      {
        "tasim1": 14,
        "tasim2": 14,
        "valsus": 14,
        "idEmpresa": "93",
        "anomes": new Date("2022-02-01T00:00:00"),
        "remdes": 669,
        "remhas": 6600,
        "frecue": 360,
        "tipreg": "2"
      }
    ];

    // datos del formulario
    const data = {
      "tasim1": 14,
      "tasim2": 14,
      "valsus": 14,
      "idEmpresa": "93",
      "anomes": new Date("2022-04-01T00:00:00"),
      "remdes": 669,
      "remhas": 6600,
      "frecue": 360,
      "tipreg": "2"
    };

    const resp = {"message":"Nivel Educativo creado."}
    
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['anomes'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.anomesMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.idEmpresa}/${data.remdes}/${data.remhas}/${data.frecue}/${data.tipreg}?anomes=2022-04-01T00:00:00`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');
  });
  
  it('Probando el Editado de Datos (caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;

    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 21,
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.tarifasImpuestos = [
      {
        "tasim1": 444,
        "tasim2": 4,
        "valsus": 44,
        "idEmpresa": "93",
        "anomes": new Date("2022-01-01T00:00:00"),
        "remdes": 12,
        "remhas": 33,
        "frecue": 0,
        "tipreg": "0"
      },
      {
        "tasim1": 14,
        "tasim2": 14,
        "valsus": 14,
        "idEmpresa": "93",
        "anomes": new Date("2022-02-01T00:00:00"),
        "remdes": 669,
        "remhas": 6600,
        "frecue": 360,
        "tipreg": "2"
      }
    ];

    const data = {
      "tasim1": 14,
      "tasim2": 14,
      "valsus": 14,
      "idEmpresa": "93",
      "anomes": new Date("2022-04-01T00:00:00"),
      "remdes": 669000,
      "remhas": 6600,
      "frecue": 360,
      "tipreg": "2"
    };

    const resp = {"message":"Nivel Educativo creado."}
    
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['anomes'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;

    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 21,
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.tarifasImpuestos = [
      {
        "tasim1": 444,
        "tasim2": 4,
        "valsus": 44,
        "idEmpresa": "93",
        "anomes": new Date("2022-01-01T00:00:00"),
        "remdes": 12,
        "remhas": 33,
        "frecue": 0,
        "tipreg": "0"
      },
      {
        "tasim1": 14,
        "tasim2": 14,
        "valsus": 14,
        "idEmpresa": "93",
        "anomes": new Date("2022-02-01T00:00:00"),
        "remdes": 669,
        "remhas": 6600,
        "frecue": 360,
        "tipreg": "2"
      }
    ];

    const data = {
      "tasim1": 14,
      "tasim2": 14,
      "valsus": 14,
      "idEmpresa": "93",
      "anomes": new Date("2022-04-01T00:00:00"),
      "remdes": 669,
      "remhas": 6600,
      "frecue": 360,
      "tipreg": "2"
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['anomes'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.idEmpresa}/${data.remdes}/${data.remhas}/${data.frecue}/${data.tipreg}?anomes=2022-04-01T00:00:00`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 21,
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.tarifasImpuestos = [
      {
        "tasim1": 444,
        "tasim2": 4,
        "valsus": 44,
        "idEmpresa": "93",
        "anomes": new Date("2022-01-01T00:00:00"),
        "remdes": 12,
        "remhas": 33,
        "frecue": 0,
        "tipreg": "0"
      },
      {
        "tasim1": 14,
        "tasim2": 14,
        "valsus": 14,
        "idEmpresa": "93",
        "anomes": new Date("2022-02-01T00:00:00"),
        "remdes": 669,
        "remhas": 6600,
        "frecue": 360,
        "tipreg": "2"
      }
    ];

    const data = {
      "tasim1": 14,
      "tasim2": 14,
      "valsus": 14,
      "idEmpresa": "93",
      "anomes": new Date("2022-04-01T00:00:00"),
      "remdes": 669,
      "remhas": 6600,
      "frecue": 360,
      "tipreg": "2"
    };

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['anomes'].setValue(new Date("2022-02-01T00:00:00"))
    expect(app.form.valid).toEqual(false)
    app.anomesMsgError;

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['anomes'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.anomesMsgError;
    
    // Llamamos a la funcion de Guardado
    app.save()

    app.campoInvalid('anomes');

  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;

    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 21,
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.tarifasImpuestos = [
      {
        "tasim1": 444,
        "tasim2": 4,
        "valsus": 44,
        "idEmpresa": "93",
        "anomes": new Date("2022-01-01T00:00:00"),
        "remdes": 12,
        "remhas": 33,
        "frecue": 0,
        "tipreg": "0"
      },
      {
        "tasim1": 14,
        "tasim2": 14,
        "valsus": 14,
        "idEmpresa": "93",
        "anomes": new Date("2022-02-01T00:00:00"),
        "remdes": 669,
        "remhas": 6600,
        "frecue": 360,
        "tipreg": "2"
      }
    ];

    const data = {
      "tasim1": 14,
      "tasim2": 14,
      "valsus": 14,
      "idEmpresa": "93",
      "anomes": new Date("2022-04-01T00:00:00"),
      "remdes": 669,
      "remhas": 6600,
      "frecue": 360,
      "tipreg": "2"
    };

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['remdes'].setValue("444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.remdesMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['remdes'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.remdesMsgError

    app.save();

    app.campoInvalid('remdes');
  });
  
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;

    app.empresaRow = {
      "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
      "clave": "F195J9FDN520AJ0SC953",
      "nombreAbrev": "FEDEX CORPORATION",
      "sectorEmp": "11",
      "publica": "1",
      "capitalPag": 21,
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
      "fax": 'null',
      "paginaWeb": 'null',
      "eMail": "correo@gmail.com",
      "feFunda": new Date,
      "feInicio": new Date,
      "filemail": 'null',
      "subprocesoRnet": 175993,
      "id": "93",
      "links": [
          {
              "rel": "datosadicionales",
              "href": "/configuraciones/nominas/empresas/93/datosadicionales"
          }
      ]
    }

    app.tarifasImpuestos = [
      {
        "tasim1": 444,
        "tasim2": 4,
        "valsus": 44,
        "idEmpresa": "93",
        "anomes": new Date("2022-01-01T00:00:00"),
        "remdes": 12,
        "remhas": 33,
        "frecue": 0,
        "tipreg": "0"
      },
      {
        "tasim1": 14,
        "tasim2": 14,
        "valsus": 14,
        "idEmpresa": "93",
        "anomes": new Date("2022-02-01T00:00:00"),
        "remdes": 669,
        "remhas": 6600,
        "frecue": 360,
        "tipreg": "2"
      }
    ];

    const data = {
      "tasim1": 14,
      "tasim2": 14,
      "valsus": 14,
      "idEmpresa": "93",
      "anomes": new Date("2022-04-01T00:00:00"),
      "remdes": 669,
      "remhas": 6600,
      "frecue": 360,
      "tipreg": "2"
    };

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['remhas'].setValue("444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.remhasMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['remhas'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.remhasMsgError

    app.save();

    app.campoInvalid('remhas');
  });

});
