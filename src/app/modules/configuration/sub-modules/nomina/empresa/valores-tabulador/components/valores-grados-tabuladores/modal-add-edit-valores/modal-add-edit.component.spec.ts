import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditValoresComponent } from './modal-add-edit-valores.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/valoresgrados`;

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
        ModalAddEditValoresComponent
      ]
    }).compileComponents()
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
  }));


  it('Crear componente de Niveles Educativos Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditValoresComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente Forma de Crear', () => {
    const fixture = TestBed.createComponent(ModalAddEditValoresComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Se valida que no haya cambios en el input isEdit

    app.ngOnChanges()

    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.gradoTabuladorSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditValoresComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.valoresGrados = [
      {
        'idEmpresa':  '93',
        'tabuCodtab': '1',
        'fecefe':     '18-01-2001',
        'pastab':     12,
        'valtab':     1,
        'eoGradoTb':  {
          'eoGradoTbId': {
            'idEmpresa': 'string',
            'id':        'string',
          },
          'descrip':     'string',
          'codOficial':  'string',
        },
      }
    ];

    app.valorGradoSelect = {
        'idEmpresa':  '93',
        'tabuCodtab': '1',
        'fecefe':     '18-01-2001',
        'pastab':     12,
        'valtab':     1,
        'eoGradoTb':  {
          'eoGradoTbId': {
            'idEmpresa': 'string',
            'id':        'string',
          },
          'descrip':     'string',
          'codOficial':  'string',
        },
    }

    app.gradoTabuladorSelect = {
      "descrip": "hola",
      "codOficial": "12",
      "disabledGrado": false,
      "eoGradoTbId": {
        "id": "1234",
        "idEmpresa": "93"  
      },
      "id": "1234",
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
    expect(app.form.valid).toEqual(false)
  });


  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditValoresComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    // Reset hecho por la funcion
    expect(app.gradoTabuladorSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditValoresComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.valoresGrados = [
      {
        'idEmpresa':  '93',
        'tabuCodtab': '1',
        'fecefe':     '18-01-2001',
        'pastab':     12,
        'valtab':     1,
        'eoGradoTb':  {
          'eoGradoTbId': {
            'idEmpresa': 'string',
            'id':        'string',
          },
          'descrip':     'string',
          'codOficial':  'string',
        },
      }
    ];
    
    // datos del formulario
    const data = {
      'idEmpresa':  '93',
      'tabuCodtab': '1',
      'fecefe':     new Date(),
      'pastab':     12,
      'valtab':     1,
      'eoGradoTb':  {
        'eoGradoTbId': {
          'idEmpresa': 'string',
          'id':        'string',
        },
      },
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
    app.pastabMsgError
    app.valtabMsgError
    
    // Llamamos a la funcion de Guardado
    app.save()
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditValoresComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.valoresGrados = [
      {
        'idEmpresa':  '93',
        'tabuCodtab': '1',
        'fecefe':     '18-01-2001',
        'pastab':     12,
        'valtab':     1,
        'eoGradoTb':  {
          'eoGradoTbId': {
            'idEmpresa': 'string',
            'id':        'string',
          },
          'descrip':     'string',
          'codOficial':  'string',
        },
      }
    ];
    
    // datos del formulario
    const data = {
      'idEmpresa':  '93',
      'tabuCodtab': '1',
      'fecefe':     new Date(),
      'pastab':     12,
      'valtab':     1,
      'eoGradoTb':  {
        'eoGradoTbId': {
          'idEmpresa': 'string',
          'id':        'string',
        },
      },
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

    app.gradoTabuladorSelect = {
      "descrip": "hola",
      "codOficial": "12",
      "disabledGrado": false,
      "eoGradoTbId": {
        "id": "1234",
        "idEmpresa": "93"  
      },
      "id": "1234",
      "idEmpresa": "93"
    }

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.pastabMsgError
    app.valtabMsgError
    
    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('POST');

  });

  it('Probando el Guardado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditValoresComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.valoresGrados = [
      {
        'idEmpresa':  '93',
        'tabuCodtab': '1',
        'fecefe':     '18-01-2001',
        'pastab':     12,
        'valtab':     1,
        'eoGradoTb':  {
          'eoGradoTbId': {
            'idEmpresa': 'string',
            'id':        'string',
          },
          'descrip':     'string',
          'codOficial':  'string',
        },
      }
    ];
    
    // datos del formulario
    const data = {
      'idEmpresa':  '93',
      'tabuCodtab': '1',
      'fecefe':     new Date(),
      'pastab':     12,
      'valtab':     1,
      'eoGradoTb':  {
        'eoGradoTbId': {
          'idEmpresa': 'string',
          'id':        'string',
        },
      },
    }

    app.gradoTabuladorSelect = {
      "descrip": "hola",
      "codOficial": "12",
      "disabledGrado": false,
      "eoGradoTbId": {
        "id": "1234",
        "idEmpresa": "93"  
      },
      "id": "1234",
      "idEmpresa": "93"
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
    const fixture = TestBed.createComponent(ModalAddEditValoresComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.valoresGrados = [
      {
        'idEmpresa':  '93',
        'tabuCodtab': '1',
        'fecefe':     '18-01-2001',
        'pastab':     12,
        'valtab':     1,
        'eoGradoTb':  {
          'eoGradoTbId': {
            'idEmpresa': 'string',
            'id':        'string',
          },
          'descrip':     'string',
          'codOficial':  'string',
        },
      }
    ];
    
    // datos del formulario
    const data = {
      'idEmpresa':  '93',
      'tabuCodtab': '1',
      'fecefe':     new Date(),
      'pastab':     12,
      'valtab':     1,
      'eoGradoTb':  {
        'eoGradoTbId': {
          'idEmpresa': 'string',
          'id':        'string',
        },
        'descrip':     'string',
        'codOficial':  'string',
      },
    }

    app.gradoTabuladorSelect = {
      "descrip": "hola",
      "codOficial": "12",
      "disabledGrado": false,
      "eoGradoTbId": {
        "id": "1234",
        "idEmpresa": "93"  
      },
      "id": "1234",
      "idEmpresa": "93"
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
    app.form.controls['pastab'].disable();
    app.form.controls['fecefe'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`http://localhost:8080/api/configuraciones/nominas/valoresgrados/empresas/93/1/${new Date(data.fecefe).toISOString().slice(0, 10)}T00:00:00/12`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditValoresComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.valoresGrados = [
      {
        'idEmpresa':  '93',
        'tabuCodtab': '1',
        'fecefe':     '18-01-2001',
        'pastab':     12,
        'valtab':     1,
        'eoGradoTb':  {
          'eoGradoTbId': {
            'idEmpresa': 'string',
            'id':        'string',
          },
          'descrip':     'string',
          'codOficial':  'string',
        },
      }
    ];
    
    // datos del formulario
    const data = {
      'idEmpresa':  '93',
      'tabuCodtab': '1',
      'fecefe':     new Date(),
      'pastab':     12,
      'valtab':     1,
      'eoGradoTb':  {
        'eoGradoTbId': {
          'idEmpresa': 'string',
          'id':        'string',
        },
        'descrip':     'string',
        'codOficial':  'string',
      },
    }

    app.gradoTabuladorSelect = {
      "descrip": "hola",
      "codOficial": "12",
      "disabledGrado": false,
      "eoGradoTbId": {
        "id": "1234",
        "idEmpresa": "93"  
      },
      "id": "1234",
      "idEmpresa": "93"
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
    app.form.controls['pastab'].disable();
    app.form.controls['fecefe'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`http://localhost:8080/api/configuraciones/nominas/valoresgrados/empresas/93/1/${new Date(data.fecefe).toISOString().slice(0, 10)}T00:00:00/12`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditValoresComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.valoresGrados = [
      {
        'idEmpresa':  '93',
        'tabuCodtab': '1',
        'fecefe':     '18-01-2001',
        'pastab':     12,
        'valtab':     1,
        'eoGradoTb':  {
          'eoGradoTbId': {
            'idEmpresa': 'string',
            'id':        'string',
          },
          'descrip':     'string',
          'codOficial':  'string',
        },
      }
    ];
    
    // datos del formulario
    const data = {
      'idEmpresa':  '93',
      'tabuCodtab': '1',
      'fecefe':     '18-01-2001',
      'pastab':     "",
      'valtab':     1,
      'eoGradoTb':  {
        'eoGradoTbId': {
          'idEmpresa': 'string',
          'id':        'string',
        },
        'descrip':     'string',
        'codOficial':  'string',
      },
    }

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    expect(app.form.valid).toEqual(false)
    app.pastabMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['pastab'].setValue("01234444444444444444444555555555555555444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.pastabMsgError

    app.campoInvalid('pastab');

  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditValoresComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.valoresGrados = [
      {
        'idEmpresa':  '93',
        'tabuCodtab': '1',
        'fecefe':     '18-01-2001',
        'pastab':     12,
        'valtab':     1,
        'eoGradoTb':  {
          'eoGradoTbId': {
            'idEmpresa': 'string',
            'id':        'string',
          },
          'descrip':     'string',
          'codOficial':  'string',
        },
      }
    ];
    
    // datos del formulario
    const data = {
      'idEmpresa':  '93',
      'tabuCodtab': '1',
      'fecefe':     '18-01-2001',
      'pastab':     12,
      'valtab':     1,
      'eoGradoTb':  {
        'eoGradoTbId': {
          'idEmpresa': 'string',
          'id':        'string',
        },
      },
    }

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['tabuCodtab'].disable();
    app.form.reset(data)
    app.form.controls['valtab'].setValue("")
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.valtabMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['tabuCodtab'].disable();
    app.form.reset(data)
    app.form.controls['valtab'].setValue(12345678912345678912345678915555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555234)
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.valtabMsgError

    app.save();

    app.campoInvalid('valtab');
    
  });
});
