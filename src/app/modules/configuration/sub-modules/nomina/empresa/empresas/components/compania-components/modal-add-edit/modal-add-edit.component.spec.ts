import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';
import { Dropdown, ObjectEventChange } from 'src/app/shared/interfaces/country-entity.interfaces';

const event: ObjectEventChange  = {
  originalEvent: true,
  value: "VEN"
}
const dropdownElement: Dropdown = {
  selectedOption: {
    nombre: "VEN"
  }
}

describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/empresas`;
  const URLPAIS = `${environment.api}/configuraciones/organizaciones/entidadesfederales`;

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

    expect(app.companiaSelect).toEqual(undefined);
  
  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.companias = [
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "2",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00301656-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "1070",
        "telefono1": "582122053152",
        "telefono2": null,
        "fax": "02010201",
        "paginaWeb": "www.algo.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date(),
        "feInicio": new Date(),
        "filemail": "www.gold",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/93/datosadicionales"
          }
        ]
      },
      {
        "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
        "clave": "84D9D4SRJ4120SS9K4FR",
        "nombreAbrev": "FEDEX HOLDINGS",
        "sectorEmp": "05",
        "publica": "0",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00328548-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "0102",
        "telefono1": "02122053151",
        "telefono2": "02122053153",
        "fax": "02122053383",
        "paginaWeb": "www.algo.com",
        "eMail": null,
        "feFunda": null,
        "feInicio": new Date(),
        "filemail": "www.gold@gmail.com",
        "subprocesoRnet": 3,
        "id": "94",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/94/datosadicionales"
          }
        ]
      }
    ];
    app.companiaSelect = {
      "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
      "clave": "84D9D4SRJ4120SS9K4FR",
      "nombreAbrev": "FEDEX HOLDINGS",
      "sectorEmp": "05",
      "publica": "0",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00328548-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "0102",
      "telefono1": "02122053151",
      "telefono2": "02122053153",
      "fax": "02122053383",
      "paginaWeb": "www.algo.com",
      "eMail": null,
      "feFunda": new Date(),
      "feInicio": new Date(),
      "filemail": "www.gold@gmail.com",
      "subprocesoRnet": 3,
      "id": "94",
      "links": [
        {
          "rel": "datosadicionales",
          "href": "/empresas/94/datosadicionales"
        }
      ]
    };
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
    app.companias = [
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "2",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00301656-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "1070",
        "telefono1": "582122053152",
        "telefono2": null,
        "fax": "02010201",
        "paginaWeb": "www.algo.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date(),
        "feInicio": new Date(),
        "filemail": "www.gold",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/93/datosadicionales"
          }
        ]
      },
      {
        "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
        "clave": "84D9D4SRJ4120SS9K4FR",
        "nombreAbrev": "FEDEX HOLDINGS",
        "sectorEmp": "05",
        "publica": "0",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00328548-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "0102",
        "telefono1": "02122053151",
        "telefono2": "02122053153",
        "fax": "02122053383",
        "paginaWeb": "www.algo.com",
        "eMail": null,
        "feFunda": null,
        "feInicio": new Date(),
        "filemail": "www.gold@gmail.com",
        "subprocesoRnet": 3,
        "id": "94",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/94/datosadicionales"
          }
        ]
      }
    ];

    // datos del formulario
    const data = {
      "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
      "clave": "84D9D4SRJ4120SS9K4FR",
      "nombreAbrev": "FEDEX HOLDINGS",
      "sectorEmp": "05",
      "publica": "0",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00328548-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "0102",
      "telefono1": "02122053151",
      "telefono2": "",
      "fax": "02122053383",
      "paginaWeb": "www.algo.com",
      "eMail": '',
      "feFunda": null,
      "filemail": "www.gold@gmail.com",
      "subprocesoRnet": 3,
      "id": "54",
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.idMsgError
    app.nombreMsgError
    app.nombreAbrevMsgError
    app.rif1MsgError
    app.telefono1MsgError
    app.eMailMsgError
    app.filemailMsgError
    

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('POST');

  });
  
  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.companias = [
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "2",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00301656-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "1070",
        "telefono1": "582122053152",
        "telefono2": null,
        "fax": "02010201",
        "paginaWeb": "www.algo.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date(),
        "feInicio": new Date(),
        "filemail": "www.gold",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/93/datosadicionales"
          }
        ]
      },
      {
        "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
        "clave": "84D9D4SRJ4120SS9K4FR",
        "nombreAbrev": "FEDEX HOLDINGS",
        "sectorEmp": "05",
        "publica": "0",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00328548-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "0102",
        "telefono1": "02122053151",
        "telefono2": "02122053153",
        "fax": "02122053383",
        "paginaWeb": "www.algo.com",
        "eMail": null,
        "feFunda": null,
        "feInicio": new Date(),
        "filemail": "www.gold@gmail.com",
        "subprocesoRnet": 3,
        "id": "94",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/94/datosadicionales"
          }
        ]
      }
    ];

    // datos del formulario
    const data = {
      "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
      "clave": "84D9D4SRJ4120SS9K4FR",
      "nombreAbrev": "FEDEX HOLDINGS",
      "sectorEmp": "05",
      "publica": "0",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00328548-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": null,
      "idPais": "VEN",
      "codPostal": "0102",
      "telefono1": "02122053151",
      "telefono2": "",
      "fax": "02122053383",
      "paginaWeb": "www.algo.com",
      "eMail": '',
      "feFunda": null,
      "filemail": "www.gold@gmail.com",
      "subprocesoRnet": 3,
      "id": "54",
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.idMsgError
    app.nombreMsgError
    app.nombreAbrevMsgError
    app.rif1MsgError
    app.telefono1MsgError
    app.eMailMsgError
    app.filemailMsgError
    

    // Llamamos a la funcion de Guardado
    app.save()

  });

  it('Probando el Guardado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.companias = [
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "2",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00301656-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "1070",
        "telefono1": "582122053152",
        "telefono2": null,
        "fax": "02010201",
        "paginaWeb": "www.algo.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date(),
        "feInicio": new Date(),
        "filemail": "www.gold",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/93/datosadicionales"
          }
        ]
      },
      {
        "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
        "clave": "84D9D4SRJ4120SS9K4FR",
        "nombreAbrev": "FEDEX HOLDINGS",
        "sectorEmp": "05",
        "publica": "0",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00328548-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "0102",
        "telefono1": "02122053151",
        "telefono2": "02122053153",
        "fax": "02122053383",
        "paginaWeb": "www.algo.com",
        "eMail": null,
        "feFunda": null,
        "feInicio": new Date(),
        "filemail": "www.gold@gmail.com",
        "subprocesoRnet": 3,
        "id": "94",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/94/datosadicionales"
          }
        ]
      }
    ];

    // datos del formulario
    const data = {
      "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
      "clave": "84D9D4SRJ4120SS9K4FR",
      "nombreAbrev": "FEDEX HOLDINGS",
      "sectorEmp": "05",
      "publica": "0",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00328548-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "0102",
      "telefono1": "02122053151",
      "telefono2": "02122053153",
      "fax": "02122053383",
      "paginaWeb": "www.algo.com",
      "eMail": null,
      "feFunda": null,
      "filemail": "www.gold@gmail.com",
      "subprocesoRnet": 3,
      "id": "57",
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
    app.companias = [
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "2",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00301656-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "1070",
        "telefono1": "582122053152",
        "telefono2": null,
        "fax": "02010201",
        "paginaWeb": "www.algo.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date(),
        "feInicio": new Date(),
        "filemail": "www.gold",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/93/datosadicionales"
          }
        ]
      },
      {
        "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
        "clave": "84D9D4SRJ4120SS9K4FR",
        "nombreAbrev": "FEDEX HOLDINGS",
        "sectorEmp": "05",
        "publica": "0",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00328548-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "0102",
        "telefono1": "02122053151",
        "telefono2": "02122053153",
        "fax": "02122053383",
        "paginaWeb": "www.algo.com",
        "eMail": null,
        "feFunda": null,
        "feInicio": new Date(),
        "filemail": "www.gold@gmail.com",
        "subprocesoRnet": 3,
        "id": "94",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/94/datosadicionales"
          }
        ]
      }
    ];

    // datos del formulario
    const data = {
      "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
      "clave": "84D9D4SRJ4120SS9K4FR",
      "nombreAbrev": "FEDEX HOLDINGS",
      "sectorEmp": "05",
      "publica": "0",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00328548-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "0102",
      "telefono1": "02122053151",
      "telefono2": "02122053153",
      "fax": "02122053383",
      "paginaWeb": "www.algo.com",
      "eMail": null,
      "feFunda": null,
      "feInicio": new Date(),
      "filemail": "www.gold@gmail.com",
      "subprocesoRnet": 3,
      "id": "94",
      "links": [
        {
          "rel": "datosadicionales",
          "href": "/empresas/94/datosadicionales"
        }
      ]
    };

    const resp = {"message":"Forma de pago creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.direccionMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.companias = [
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "2",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00301656-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "1070",
        "telefono1": "582122053152",
        "telefono2": null,
        "fax": "02010201",
        "paginaWeb": "www.algo.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date(),
        "feInicio": new Date(),
        "filemail": "www.gold",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/93/datosadicionales"
          }
        ]
      },
      {
        "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
        "clave": "84D9D4SRJ4120SS9K4FR",
        "nombreAbrev": "FEDEX HOLDINGS",
        "sectorEmp": "05",
        "publica": "0",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00328548-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "0102",
        "telefono1": "02122053151",
        "telefono2": "02122053153",
        "fax": "02122053383",
        "paginaWeb": "www.algo.com",
        "eMail": null,
        "feFunda": null,
        "feInicio": new Date(),
        "filemail": "www.gold@gmail.com",
        "subprocesoRnet": 3,
        "id": "94",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/94/datosadicionales"
          }
        ]
      }
    ];

    // datos del formulario
    const data = {
      "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
      "clave": "84D9D4SRJ4120SS9K4FR",
      "nombreAbrev": "FEDEX HOLDINGS",
      "sectorEmp": "05",
      "publica": "0",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00328548-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "0102",
      "telefono1": "02122053151",
      "telefono2": "02122053153",
      "fax": "02122053383",
      "paginaWeb": "www.algo.com",
      "eMail": null,
      "feFunda": null,
      "filemail": "www.gold@gmail.com",
      "subprocesoRnet": 3,
      "id": "54",
    };

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });


    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.id}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.companias = [
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "2",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00301656-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "1070",
        "telefono1": "582122053152",
        "telefono2": null,
        "fax": "02010201",
        "paginaWeb": "www.algo.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date(),
        "feInicio": new Date(),
        "filemail": "www.gold",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/93/datosadicionales"
          }
        ]
      },
      {
        "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
        "clave": "84D9D4SRJ4120SS9K4FR",
        "nombreAbrev": "FEDEX HOLDINGS",
        "sectorEmp": "05",
        "publica": "0",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00328548-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "0102",
        "telefono1": "02122053151",
        "telefono2": "02122053153",
        "fax": "02122053383",
        "paginaWeb": "www.algo.com",
        "eMail": null,
        "feFunda": null,
        "feInicio": new Date(),
        "filemail": "www.gold@gmail.com",
        "subprocesoRnet": 3,
        "id": "94",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/94/datosadicionales"
          }
        ]
      }
    ];

    // datos del formulario
    const data = {
      "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
      "clave": "84D9D4SRJ4120SS9K4FR",
      "nombreAbrev": "FEDEX HOLDINGS",
      "sectorEmp": "05",
      "publica": "0",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00328548-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "0102",
      "telefono1": "02122053151",
      "telefono2": "02122053153",
      "fax": "02122053383",
      "paginaWeb": "www.algo.com",
      "eMail": null,
      "feFunda": null,
      "filemail": "www.gold@gmail.com",
      "subprocesoRnet": 3,
      "id": "94",
    };

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("94")
    expect(app.form.valid).toEqual(false)
    app.idMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("01234444444444444444444444444444444444444")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    // caso vacio con descripcion duplicada
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    app.campoInvalid('id');


  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.companias = [
      {
        "nombre": "FEDERAL EXPRESS CORPORATION, S.A.",
        "clave": "F195J9FDN520AJ0SC953",
        "nombreAbrev": "FEDEX CORPORATION",
        "sectorEmp": "11",
        "publica": "2",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00301656-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "1070",
        "telefono1": "582122053152",
        "telefono2": null,
        "fax": "02010201",
        "paginaWeb": "www.algo.com",
        "eMail": "correo@gmail.com",
        "feFunda": new Date(),
        "feInicio": new Date(),
        "filemail": "www.gold",
        "subprocesoRnet": 175993,
        "id": "93",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/93/datosadicionales"
          }
        ]
      },
      {
        "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
        "clave": "84D9D4SRJ4120SS9K4FR",
        "nombreAbrev": "FEDEX HOLDINGS",
        "sectorEmp": "05",
        "publica": "0",
        "capitalPag": 3,
        "capitalSub": 3,
        "rif1": "J-00328548-0",
        "rif2": null,
        "direccion": "CARACAS",
        "ciudad": "CARACAS",
        "idEntfe": "DC",
        "idPais": "VEN",
        "codPostal": "0102",
        "telefono1": "02122053151",
        "telefono2": "02122053153",
        "fax": "02122053383",
        "paginaWeb": "www.algo.com",
        "eMail": null,
        "feFunda": null,
        "feInicio": new Date(),
        "filemail": "www.gold@gmail.com",
        "subprocesoRnet": 3,
        "id": "94",
        "links": [
          {
            "rel": "datosadicionales",
            "href": "/empresas/94/datosadicionales"
          }
        ]
      }
    ];

    // datos del formulario
    const data = {
      "nombre": "FEDERAL EXPRESS HOLDINGS, S.A.",
      "clave": "84D9D4SRJ4120SS9K4FR",
      "nombreAbrev": "FEDEX HOLDINGS",
      "sectorEmp": "05",
      "publica": "0",
      "capitalPag": 3,
      "capitalSub": 3,
      "rif1": "J-00328548-0",
      "rif2": null,
      "direccion": "CARACAS",
      "ciudad": "CARACAS",
      "idEntfe": "DC",
      "idPais": "VEN",
      "codPostal": "0102",
      "telefono1": "02122053151",
      "telefono2": "02122053153",
      "fax": "02122053383",
      "paginaWeb": "www.algo.com",
      "eMail": null,
      "feFunda": null,
      "filemail": "www.gold@gmail.com",
      "subprocesoRnet": 3,
      "id": "94",
    };

    // caso required nombre
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['nombre'].setValue("")
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreMsgError
    
    // caso maxlength nombre
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['nombre'].setValue("1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111")
    console.log(app.form.value);
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreMsgError

    // caso required nombre Abreviado
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['nombreAbrev'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreAbrevMsgError

    // caso length nombre abreviado
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['nombreAbrev'].setValue("1234567891234567891234567891234111111111111")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.nombreAbrevMsgError

    //Caso required rif
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['rif1'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.rif1MsgError

    //Caso maxlength rif
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['rif1'].setValue("111111111111111111111111111111111111111111111111111")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.rif1MsgError

    //Caso required telefono
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['telefono1'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.telefono1MsgError

    //Caso maxlength telefono
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['telefono1'].setValue("dddddddddddddddddddddddddddddd")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.telefono1MsgError

    //Caso maxlength email
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['eMail'].setValue("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhooooooooooooooooodddddddddddddddooooooooooolllllllllllllllllllllllll@gmail.com")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.eMailMsgError

    //Caso pattern email
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['eMail'].setValue("holacomoestasestonoesunemail")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.eMailMsgError

    //Caso required direccion
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['direccion'].setValue("")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.direccionMsgError

    //Caso maxLength direccion
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['direccion'].setValue(`1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111`)    
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.direccionMsgError

    //Caso required filemail
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['filemail'].setValue(`1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111`)    
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.filemailMsgError
    
    //Caso maxLength filemail
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['id'].disable();
    app.form.reset(data)
    app.form.controls['filemail'].setValue("holaestotampocoesunformatovalido")
    expect(app.form.valid).toEqual(false)
    expect(app.form.invalid).toEqual(true)
    app.filemailMsgError

    app.save();

    app.campoInvalid('filemail');
    app.campoInvalid('direccion');
    app.campoInvalid('eMail');
    app.campoInvalid('telefono1');
    app.campoInvalid('rif1');
    app.campoInvalid('nombreAbrev');
    app.campoInvalid('nombre');
    
  });

  it('Validando el formulario (Caso kkkk)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
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
      "paiCodpai": "VEN",
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": '234567891234567891234567444444444444489123456789',
      "local": "0",
      "codsin": "646"
    };

    app.countrys = [
      {
        "nombre": "Venezuela",
        "codigo": "VEN",
      },
      {
          "nombre": "ARGENTINA",
          "codigo": "ARG",
      },
      {
          "nombre": "AUSTRALIA",
          "codigo": "AUS",
      },
      {
          "nombre": "AUSTRIA",
          "codigo": "AUT",
      },
      {
          "nombre": "BELGICA",
          "codigo": "BEL",
      },
      {
          "nombre": "BERMUDA",
          "codigo": "BMU",
      },
    ];

    const resp = [
      {
          "nombre": "Amazonas",
          "codPais": "VEN",
          "codEntidad": "AM"
      },
      {
          "nombre": "Apure",
          "codPais": "VEN",
          "codEntidad": "AP"
      },
    ];

    app.loadEntitiesByCountry(data.paiCodpai)

    const fakeBackend = httpTestingController.expectOne(`${URLPAIS}/${data.paiCodpai}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('GET');

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    app.loadEntitiesByCountry(data.paiCodpai)

    const fakeBackendFalse = httpTestingController.expectOne(`${URLPAIS}/${data.paiCodpai}`);
    fakeBackendFalse.error(error);
    expect(fakeBackend.request.method).toBe('GET');

  });

  it('Peticiones a service (Caso false and true)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
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
      "paiCodpai": "VEN",
      "tlfsi1": null,
      "tlfsi2": null,
      "faxsin": null,
      "tlxsin": null,
      "eMail": '234567891234567891234567444444444444489123456789',
      "local": "0",
      "codsin": "646"
    };

    app.countrys = [
      {
        "nombre": "Venezuela",
        "codigo": "VEN",
      },
      {
          "nombre": "ARGENTINA",
          "codigo": "ARG",
      },
      {
          "nombre": "AUSTRALIA",
          "codigo": "AUS",
      },
      {
          "nombre": "AUSTRIA",
          "codigo": "AUT",
      },
      {
          "nombre": "BELGICA",
          "codigo": "BEL",
      },
      {
          "nombre": "BERMUDA",
          "codigo": "BMU",
      },
    ];

    app.countrySelectChange(event)
    const eventfalse: ObjectEventChange  = {
      originalEvent: true,
      value: null
    }
    app.countrySelectChange(eventfalse)

    app.loadCountrysData()
    
    const fakeBackend = httpTestingController.match(`http://localhost:8080/api/configuraciones/organizaciones/paises`);
    fakeBackend[0].flush(app.countrys);
    expect(fakeBackend[0].request.method).toBe('GET');

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    app.loadCountrysData()

    const fakeBackendFalse = httpTestingController.match(`http://localhost:8080/api/configuraciones/organizaciones/paises`);
    fakeBackendFalse[0].error(error);
    expect(fakeBackendFalse[0].request.method).toBe('GET');

    app.clearCountrySelect()
    
    app.loadSectoresEmpresas()
    
    const fakeBackendEmpresas = httpTestingController.match(`http://localhost:8080/api/configuraciones/nominas/sectoresempresas`);
    fakeBackendEmpresas[0].flush(app.sectorEmpre);
    expect(fakeBackendEmpresas[0].request.method).toBe('GET');

    app.loadSectoresEmpresas()

    const fakeBackendEmpresasFalse = httpTestingController.match(`http://localhost:8080/api/configuraciones/nominas/sectoresempresas`);
    fakeBackendEmpresasFalse[0].error(error);
    expect(fakeBackendEmpresasFalse[0].request.method).toBe('GET');
    
  });
});
