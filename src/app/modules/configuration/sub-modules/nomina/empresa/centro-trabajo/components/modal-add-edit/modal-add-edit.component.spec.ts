import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/centrostrabajos`;

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

    expect(app.form.value.descen).toEqual('')
    expect(app.form.value.facrie).toEqual(0)
    expect(app.form.value.codcen).toEqual('')
    expect(app.form.value.idEmpresa).toEqual(undefined)

    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.centroTrabajoSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.centrosTrabajos = [
      {
        "descen": "dd",
        "facrie": 123,
        "codcen": "2",
        "idEmpresa": "93"
      },
      {
        "descen": "descripcion",
        "facrie": 123.12345678,
        "codcen": "3",
        "idEmpresa": "94"
      }
    ];

    app.centroTrabajoSelect = {
      "descen": "dd",
      "facrie": 123,
      "codcen": "2",
      "idEmpresa": "93"
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
    expect(app.form.value.descen).toEqual('')
    expect(app.form.value.facrie).toEqual(0)
    expect(app.form.value.codcen).toEqual('')
    expect(app.form.value.idEmpresa).toEqual(undefined)
    expect(app.form.valid).toEqual(false)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    // Reset hecho por la funcion
    expect(app.form.value.descen).toEqual(null)
    expect(app.form.value.facrie).toEqual(null)
    expect(app.form.value.codcen).toEqual(null)
    expect(app.form.value.idEmpresa).toEqual(undefined)
    expect(app.centroTrabajoSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.centrosTrabajos = [
      {
        "descen": "dd",
        "facrie": 123,
        "codcen": "2",
        "idEmpresa": "93"
      },
      {
        "descen": "descripcion",
        "facrie": 123.12345678,
        "codcen": "3",
        "idEmpresa": "94"
      }
    ];
    
    // datos del formulario
    const data = {
      "descen": "ddf",
      "facrie": 123,
      "codcen": "6",
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
    app.codcenMsgError
    app.descenMsgError
    app.facrieMsgError
    
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
    app.centrosTrabajos = [
      {
        "descen": "dd",
        "facrie": 123,
        "codcen": "2",
        "idEmpresa": "93"
      },
      {
        "descen": "descripcion",
        "facrie": 123.12345678,
        "codcen": "3",
        "idEmpresa": "94"
      }
    ];
    
    // datos del formulario
    const data = {
      "descen": "dd",
      "facrie": 123,
      "codcen": "4",
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
    app.centrosTrabajos = [
      {
        "descen": "dd",
        "facrie": 123,
        "codcen": "2",
        "idEmpresa": "93"
      },
      {
        "descen": "descripcion",
        "facrie": 123.12345678,
        "codcen": "3",
        "idEmpresa": "94"
      }
    ];
    
    // datos del formulario
    const data = {
      "descen": "dd",
      "facrie": 123,
      "codcen": "2",
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
    app.form.controls['codcen'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.validateFactor

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${app.empresaRow.id}/${data.codcen}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.descen).toEqual(null)
    expect(app.form.value.facrie).toEqual(null)
    expect(app.form.value.codcen).toEqual(undefined)
    expect(app.centroTrabajoSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.centrosTrabajos = [
      {
        "descen": "dd",
        "facrie": 123,
        "codcen": "2",
        "idEmpresa": "93"
      },
      {
        "descen": "descripcion",
        "facrie": 123.12345678,
        "codcen": "3",
        "idEmpresa": "94"
      }
    ];
    
    // datos del formulario
    const data = {
      "descen": "dd",
      "facrie": 123,
      "codcen": "2",
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
    app.form.controls['codcen'].disable();
    app.form.reset(data)
    app.form.controls['descen'].setValue("hola")
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${app.empresaRow.id}/${data.codcen}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.descen).toEqual('hola')
    expect(app.form.value.facrie).toEqual(data.facrie)
    expect(app.form.value.codcen).toEqual(undefined)
    expect(app.form.value.idEmpresa).toEqual(undefined)
    expect(app.centroTrabajoSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.centrosTrabajos = [
      {
        "descen": "dd",
        "facrie": 123,
        "codcen": "2",
        "idEmpresa": "93"
      },
      {
        "descen": "descripcion",
        "facrie": 123.12345678,
        "codcen": "3",
        "idEmpresa": "94"
      }
    ];
    
    // datos del formulario
    const data = {
      "descen": "dd",
      "facrie": 123,
      "codcen": "2",
    }

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcen'].setValue("3")
    expect(app.form.valid).toEqual(false)
    app.codcenMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcen'].setValue("01234444444444444444444555555555555555444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.codcenMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcen'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codcenMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codcen'].setValue("")
    app.form.controls['descen'].setValue("nivel dos")
    expect(app.form.valid).toEqual(false)
    app.codcenMsgError

    // Reset hecho por la funcion
    expect(app.form.value.descen).toEqual("nivel dos")
    expect(app.form.value.facrie).toEqual(123)
    expect(app.form.value.codcen).toEqual("")
    expect(app.form.value.idEmpresa).toEqual(undefined)

    app.campoInvalid('codcen');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.centrosTrabajos = [
      {
        "descen": "dd",
        "facrie": 123,
        "codcen": "2",
        "idEmpresa": "93"
      },
      {
        "descen": "descripcion",
        "facrie": 123.12345678,
        "codcen": "3",
        "idEmpresa": "94"
      }
    ];
    
    // datos del formulario
    const data = {
      "descen": "descripcion",
      "facrie": "",
      "codcen": "3",
    }

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcen'].disable();
    app.form.reset(data)
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.facrieMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcen'].disable();
    app.form.reset(data)
    app.form.controls['facrie'].setValue("12345678912345678912345678915555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.facrieMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.descen).toEqual(data.descen)
    expect(app.form.value.facrie).toEqual("12345678912345678912345678915555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555234")
    expect(app.form.value.codcen).toEqual(undefined)
    expect(app.form.value.idEmpresa).toEqual(undefined)

    app.campoInvalid('descen');
    
  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.centrosTrabajos = [
      {
        "descen": "dd",
        "facrie": 123,
        "codcen": "2",
        "idEmpresa": "93"
      },
      {
        "descen": "descripcion",
        "facrie": 123.12345678,
        "codcen": "3",
        "idEmpresa": "94"
      }
    ];
    
    // datos del formulario
    const data = {
      "descen": "",
      "facrie": "",
      "codcen": "3",
    }

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcen'].disable();
    app.form.reset(data)
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.descenMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codcen'].disable();
    app.form.reset(data)
    app.form.controls['descen'].setValue("12345678912345678912345678915555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555234")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.descenMsgError

    app.save();

    // Reset hecho por la funcion
    expect(app.form.value.descen).toEqual("12345678912345678912345678915555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555234")
    expect(app.form.value.facrie).toEqual("")
    expect(app.form.value.codcen).toEqual(undefined)
    expect(app.form.value.idEmpresa).toEqual(undefined)

    app.campoInvalid('descen');
    
  });
});
