import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';
import { By } from '@angular/platform-browser';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/empresas/93/nominas/0001/grupos`;

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

    expect(app.form.value.codgru).toEqual('')
    expect(app.form.value.desgru).toEqual('')
    expect(app.form.value.tipoJornada).toEqual({ id: 'D' })
    expect(app.form.value.labdom).toEqual(false)
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.grupoTrabajoSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.gruposTrabajo = [
      {
        "desgru": "ADMINISTRATIVO 2",
        "labdom": "1",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "A"
      },
      {
        "desgru": "descripción",
        "labdom": "0",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "D"
      }
    ];
    app.grupoTrabajoSelect = {
      "desgru": "descripción",
      "labdom": "0",
      "tipoJornada": {
          "id": "D",
          "descripcion": "Diurna"
      },
      "codgru": "D"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.codgru).toEqual(undefined)
    expect(app.form.value.desgru).toEqual('descripción')
    expect(app.form.value.tipoJornada).toEqual({ id: 'D' })
    expect(app.form.value.labdom).toEqual(false)
    expect(app.form.valid).toEqual(true)
  });

  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    expect(app.form.value.codgru).toEqual(null)
    expect(app.form.value.desgru).toEqual(null)
    expect(app.form.value.tipoJornada).toEqual({ id: null })
    expect(app.form.value.labdom).toEqual(null)
    expect(app.form.valid).toEqual(false)
    expect(app.grupoTrabajoSelect).toEqual(undefined);
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
      "tipnom": "0001",
      "desnom": "Empleados Directos",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": null,
      "fecto2": null,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 21,
      "canmin": 12,
      "facgua": 21,
      "asifon": 12,
      "dedfon": 21,
      "valfon": 0.5,
      "fecabo": null,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "1",
      "anocom": "0",
      "pgmrec": "21",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    app.gruposTrabajo = [
      {
        "desgru": "ADMINISTRATIVO 2",
        "labdom": "1",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "A"
      },
      {
        "desgru": "descripción",
        "labdom": "0",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "D"
      }
    ];
    // datos del formulario
    const data = {
      "desgru": "deescripción",
      "labdom": "0",
      "tipoJornada": {
          "id": "D",
      },
      "codgru": "F"
    };

    const resp = {"message":"Nivel Educativo creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.codgruMsgError;
    
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
      "tipnom": "0001",
      "desnom": "Empleados Directos",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": null,
      "fecto2": null,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 21,
      "canmin": 12,
      "facgua": 21,
      "asifon": 12,
      "dedfon": 21,
      "valfon": 0.5,
      "fecabo": null,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "1",
      "anocom": "0",
      "pgmrec": "21",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    app.gruposTrabajo = [
      {
        "desgru": "ADMINISTRATIVO 2",
        "labdom": "1",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "A"
      },
      {
        "desgru": "descripción",
        "labdom": "0",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "D"
      }
    ];
    // datos del formulario
    const data = {
      "desgru": "deescripción",
      "labdom": "0",
      "tipoJornada": {
          "id": "D",
      },
      "codgru": "F"
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
      "tipnom": "0001",
      "desnom": "Empleados Directos",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": null,
      "fecto2": null,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 21,
      "canmin": 12,
      "facgua": 21,
      "asifon": 12,
      "dedfon": 21,
      "valfon": 0.5,
      "fecabo": null,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "1",
      "anocom": "0",
      "pgmrec": "21",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    app.gruposTrabajo = [
      {
        "desgru": "ADMINISTRATIVO 2",
        "labdom": "1",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "A"
      },
      {
        "desgru": "descripción",
        "labdom": "0",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "D"
      }
    ];
    // datos del formulario
    const data = {
      "desgru": "descripción",
      "labdom": "0",
      "tipoJornada": {
          "id": "D",
      },
      "codgru": "D"
    };

    const resp = {"message":"Nivel Educativo creado."}

    
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codgru'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.codgruMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codgru}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.codgru).toEqual(undefined)
    expect(app.form.value.desgru).toEqual(null)
    expect(app.form.value.tipoJornada).toEqual({ id: null })
    expect(app.form.value.labdom).toEqual(null)
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
      "tipnom": "0001",
      "desnom": "Empleados Directos",
      "clanom": "2",
      "frenom": 30,
      "codpai": null,
      "fecto1": null,
      "fecto2": null,
      "fecto3": null,
      "fecto4": null,
      "fecto5": null,
      "topgua": 21,
      "canmin": 12,
      "facgua": 21,
      "asifon": 12,
      "dedfon": 21,
      "valfon": 0.5,
      "fecabo": null,
      "tipmon": null,
      "tasmon": null,
      "valred": 0.01,
      "tipfec": 1,
      "reghab": "1",
      "anocom": "0",
      "pgmrec": "21",
      "fresue": "0",
      "codcon": null,
      "fecto6": null,
      "fecto7": null,
      "fecto8": null,
      "fecto9": null,
      "fecto10": null,
      "idEmpresa": "93"
    }

    app.gruposTrabajo = [
      {
        "desgru": "ADMINISTRATIVO 2",
        "labdom": "1",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "A"
      },
      {
        "desgru": "descripción",
        "labdom": "0",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "D"
      }
    ];

    // datos del formulario
    
    const data = {
      "desgru": "descripción",
      "labdom": "0",
      "tipoJornada": {
          "id": "D",
      },
      "codgru": "D"
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codgru'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)
    app.desgruMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codgru}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.codgru).toEqual(undefined)
    expect(app.form.value.desgru).toEqual('descripción')
    expect(app.form.value.tipoJornada).toEqual({ id: 'D' })
    expect(app.form.value.labdom).toEqual('0')
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.gruposTrabajo = [
      {
        "desgru": "ADMINISTRATIVO 2",
        "labdom": "1",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "A"
      },
      {
        "desgru": "descripción",
        "labdom": "0",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "D"
      }
    ];

    // datos del formulario
    
    const data = {
      "desgru": "descripción",
      "labdom": "0",
      "tipoJornada": {
          "id": "D",
          "descripcion": "Diurna"
      },
      "codgru": "D"
    };

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codgru'].setValue("D")
    expect(app.form.valid).toEqual(false)
    app.codgruMsgError;

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codgru'].setValue("1552")
    expect(app.form.valid).toEqual(false)
    app.codgruMsgError;
    
    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codgru'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codgruMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    // Reset hecho por la funcion
    expect(app.form.value.codgru).toEqual('')
    expect(app.form.value.desgru).toEqual('descripción')
    expect(app.form.value.tipoJornada).toEqual({ id: 'D' })
    expect(app.form.value.labdom).toEqual('0')

    app.campoInvalid('codgru');

  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.gruposTrabajo = [
      {
        "desgru": "ADMINISTRATIVO 2",
        "labdom": "1",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "A"
      },
      {
        "desgru": "descripción",
        "labdom": "0",
        "tipoJornada": {
            "id": "D",
            "descripcion": "Diurna"
        },
        "codgru": "D"
      }
    ];

    // datos del formulario
    
    const data = {
      "desgru": "descripción",
      "labdom": "1",
      "tipoJornada": {
          "id": "D",
      },
      "codgru": "D"
    };

    app.grupoTrabajoSelect = {
      "desgru": "descripción",
      "labdom": "1",
      "tipoJornada": {
          "id": "D",
          "descripcion": "Diurna"
      },
      "codgru": "D"
    };

    app.ngOnChanges()

    app.tipoJornadaFormGroup

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codgru'].disable();
    app.form.reset(data)
    app.form.controls['desgru'].setValue("1234567891234567891234567891234")
    expect(app.form.valid).toEqual(false)
    app.desgruMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codgru'].disable();
    app.form.reset(data)
    app.form.controls['desgru'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.desgruMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.codgru).toEqual(undefined)
    expect(app.form.value.desgru).toEqual('')
    expect(app.form.value.tipoJornada).toEqual({ id: 'D' })
    expect(app.form.value.labdom).toEqual('1')

    app.campoInvalid('desgru');
  });
});
