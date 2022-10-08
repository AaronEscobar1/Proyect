import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';
import { By } from '@angular/platform-browser';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/puntajesevaluaciones`;

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

    expect(app.puntajeEvaluacionSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 

    app.puntajesEvaluacion = [
      {
        "despun": "descripcion 01",
        "aumpun": "0",
        "codpun": "01",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "despun": "descripcion",
        "aumpun": "1",
        "codpun": "03",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ]

    app.nominaRow = {
      "tipnom": "0002",
      "desnom": "EMPLEADOS INDIRECTOS",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": new Date,
      "fecto2": new Date,
      "fecto3": new Date,
      "fecto4": new Date,
      "fecto5": new Date,
      "topgua": 0.00027,
      "canmin": 12,
      "facgua": 12,
      "asifon": 12,
      "dedfon": 12,
      "valfon": 0.5,
      "fecabo": new Date,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "0",
      "anocom": "0",
      "pgmrec": "US0633",
      "fresue": "0",
      "codcon": null,
      "fecto6": new Date,
      "fecto7": new Date,
      "fecto8": new Date,
      "fecto9": new Date,
      "fecto10": new Date,
      "idEmpresa": "93"
    };

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

    app.puntajeEvaluacionSelect = {
      "despun": "descripcion",
      "aumpun": "1",
      "codpun": "03",
      "idEmpresa": "93",
      "idNomina": "0001"
    }
    
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();

    app.puntajeEvaluacionSelect = {
      "despun": "descripcion",
      "aumpun": "0",
      "codpun": "03",
      "idEmpresa": "93",
      "idNomina": "0001"
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

    app.nominaRow = {
      "tipnom": "0005",
      "desnom": "EMPLEADOS DISCAPACITADOS",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": new Date,
      "fecto2": new Date,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 12,
      "canmin": 12,
      "facgua": 12,
      "asifon": 12,
      "dedfon": 12,
      "valfon": 12,
      "fecabo": new Date,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "0",
      "anocom": "0",
      "pgmrec": "US0633",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    app.puntajesEvaluacion = [
      {
        "despun": "descripcion 01",
        "aumpun": "0",
        "codpun": "01",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "despun": "descripcion",
        "aumpun": "1",
        "codpun": "03",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ];

    // datos del formulario
    const data = {
      "despun": "descripcion",
      "aumpun": "1",
      "codpun": "02",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    const resp = {"message":"Nivel Educativo creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.codpunMsgError;
    
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

    app.nominaRow = {
      "tipnom": "0005",
      "desnom": "EMPLEADOS DISCAPACITADOS",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": new Date,
      "fecto2": new Date,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 12,
      "canmin": 12,
      "facgua": 12,
      "asifon": 12,
      "dedfon": 12,
      "valfon": 12,
      "fecabo": new Date,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "0",
      "anocom": "0",
      "pgmrec": "US0633",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    app.puntajesEvaluacion = [
      {
        "despun": "descripcion 01",
        "aumpun": "0",
        "codpun": "01",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "despun": "descripcion",
        "aumpun": "1",
        "codpun": "03",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ];

    // datos del formulario
    const data = {
      "despun": "descripcion",
      "aumpun": "1",
      "codpun": "02",
      "idEmpresa": "93",
      "idNomina": "0001"
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

    app.nominaRow = {
      "tipnom": "0005",
      "desnom": "EMPLEADOS DISCAPACITADOS",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": new Date,
      "fecto2": new Date,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 12,
      "canmin": 12,
      "facgua": 12,
      "asifon": 12,
      "dedfon": 12,
      "valfon": 12,
      "fecabo": new Date,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "0",
      "anocom": "0",
      "pgmrec": "US0633",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    app.puntajesEvaluacion = [
      {
        "despun": "descripcion 01",
        "aumpun": "0",
        "codpun": "01",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "despun": "descripcion",
        "aumpun": "1",
        "codpun": "03",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ];

    // datos del formulario
    const data = {
      "despun": "descripcion",
      "aumpun": "1",
      "codpun": "02",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    const resp = {"message":"Nivel Educativo creado."}
    
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codpun'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.despunMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.idEmpresa}/${data.idNomina}/${data.codpun}`);
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

    app.nominaRow = {
      "tipnom": "0005",
      "desnom": "EMPLEADOS DISCAPACITADOS",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": new Date,
      "fecto2": new Date,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 12,
      "canmin": 12,
      "facgua": 12,
      "asifon": 12,
      "dedfon": 12,
      "valfon": 12,
      "fecabo": new Date,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "0",
      "anocom": "0",
      "pgmrec": "US0633",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    app.puntajesEvaluacion = [
      {
        "despun": "descripcion 01",
        "aumpun": "0",
        "codpun": "01",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "despun": "descripcion",
        "aumpun": "1",
        "codpun": "03",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ];

    // datos del formulario
    const data = {
      "despun": "descripcion",
      "aumpun": "1",
      "codpun": "02",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    const resp = {"message":"Nivel Educativo creado."}
    
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codpun'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.despunMsgError;

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

    app.nominaRow = {
      "tipnom": "0005",
      "desnom": "EMPLEADOS DISCAPACITADOS",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": new Date,
      "fecto2": new Date,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 12,
      "canmin": 12,
      "facgua": 12,
      "asifon": 12,
      "dedfon": 12,
      "valfon": 12,
      "fecabo": new Date,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "0",
      "anocom": "0",
      "pgmrec": "US0633",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    app.puntajesEvaluacion = [
      {
        "despun": "descripcion 01",
        "aumpun": "0",
        "codpun": "01",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "despun": "descripcion",
        "aumpun": "1",
        "codpun": "03",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ];

    // datos del formulario
    const data = {
      "despun": "descripcion",
      "aumpun": "1",
      "codpun": "02",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codpun'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)
    app.despunMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.idEmpresa}/${data.idNomina}/${data.codpun}`);
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

    app.nominaRow = {
      "tipnom": "0005",
      "desnom": "EMPLEADOS DISCAPACITADOS",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": new Date,
      "fecto2": new Date,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 12,
      "canmin": 12,
      "facgua": 12,
      "asifon": 12,
      "dedfon": 12,
      "valfon": 12,
      "fecabo": new Date,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "0",
      "anocom": "0",
      "pgmrec": "US0633",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    app.puntajesEvaluacion = [
      {
        "despun": "descripcion 01",
        "aumpun": "0",
        "codpun": "01",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "despun": "descripcion",
        "aumpun": "1",
        "codpun": "03",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ];

    // datos del formulario
    const data = {
      "despun": "descripcion",
      "aumpun": "1",
      "codpun": "02",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codpun'].setValue("03")
    expect(app.form.valid).toEqual(false)
    app.codpunMsgError;

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codpun'].setValue("155244")
    expect(app.form.valid).toEqual(false)
    app.codpunMsgError;
    
    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codpun'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codpunMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    app.campoInvalid('codpun');

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

    app.nominaRow = {
      "tipnom": "0005",
      "desnom": "EMPLEADOS DISCAPACITADOS",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": new Date,
      "fecto2": new Date,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 12,
      "canmin": 12,
      "facgua": 12,
      "asifon": 12,
      "dedfon": 12,
      "valfon": 12,
      "fecabo": new Date,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "0",
      "anocom": "0",
      "pgmrec": "US0633",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    app.puntajesEvaluacion = [
      {
        "despun": "descripcion 01",
        "aumpun": "0",
        "codpun": "01",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "despun": "descripcion",
        "aumpun": "1",
        "codpun": "03",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ];

    // datos del formulario
    const data = {
      "despun": "descripcion",
      "aumpun": "1",
      "codpun": "02",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codpun'].disable();
    app.form.reset(data)
    app.form.controls['despun'].setValue("444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.despunMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codpun'].disable();
    app.form.reset(data)
    app.form.controls['despun'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.despunMsgError

    app.save();

    app.campoInvalid('despun');
  });
});
