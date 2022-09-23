import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';
import { By } from '@angular/platform-browser';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/situaciones`;

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

    expect(app.form.value.idEmpresa).toEqual(null)
    expect(app.form.value.idNomina).toEqual(null)
    expect(app.form.value.codsta).toEqual(null)
    expect(app.form.value.dessta).toEqual(null)
    expect(app.form.value.nmVacacionStatusTb).toEqual({ vacsta: '0' })
    expect(app.form.value.nmTipoEsquTrabCalcVacaTb).toEqual({ conesq: '0' })
    expect(app.form.value.cfClaseSituacionTb).toEqual({ clasta: '0' })
    expect(app.form.value.idGrupo).toEqual(null)
    expect(app.form.value.idRotacion).toEqual(undefined)
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.situacionSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
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

    app.situaciones = [
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ];
    app.situacionSelect = {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();

    app.nmVacacionFormGroup
    app.cfClaseSituacionFormGroup
    app.nmTipoEsquTrabFormGroup

    app.rotacionGrupoSelectChange({value: "A"})

    const resp = [{congru: 'SSS'},{congru: 'SSS'}, {congru: 'SSS'}]

    // Se hace la peticion de rotacion

    const fakeBackend = httpTestingController.expectOne(`http://localhost:8080/api/configuraciones/nominas/empresas/93/nominas/0001/rotaciongrupos/A`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('GET');

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error en solicitud.",   
    });

    app.rotacionGrupoSelectChange({value: "A"})

    const fakeBackendError = httpTestingController.expectOne(`http://localhost:8080/api/configuraciones/nominas/empresas/93/nominas/0001/rotaciongrupos/A`);
    fakeBackendError.error(error);
    expect(fakeBackend.request.method).toBe('GET');

    app.rotacionGrupoSelectChange({value: null})

    // Validacion
    expect(app.form.valid).toEqual(true)
  });

  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    expect(app.situacionSelect).toEqual(undefined);
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

    app.situaciones = [
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ];;
    // datos del formulario
    const data = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
      },
      "nmVacacionStatusTb": {
          "vacsta": "3",
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPRR",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    const resp = {"message":"Nivel Educativo creado."}

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)
    app.codstaMsgError;
    
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

    app.situaciones = [
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ]
    // datos del formulario
    const data = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
      },
      "nmVacacionStatusTb": {
          "vacsta": "3",
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPRR",
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

    app.situaciones = [
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ]
    // datos del formulario
    let data: any = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
      },
      "nmVacacionStatusTb": {
          "vacsta": "4"
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPAR",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    const resp = {"message":"Nivel Educativo creado."}

    
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsta'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)
    app.codstaMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${app.empresaRow.id}/${app.nominaRow.tipnom}/${data.codsta}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    data = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
      },
      "nmVacacionStatusTb": {
          "vacsta": "4"
      },
      "idGrupo": "PP",
      "codsta": "PPAR",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    app.form.reset(data)

    app.save()
    
    data = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
      },
      "nmVacacionStatusTb": {
          "vacsta": "2"
      },
      "idGrupo": "PP",
      "codsta": "PPAR",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    app.form.reset(data)

    app.save()

    app.clearRotacionGrupoSelect()

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

    app.situaciones = [
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ]
    // datos del formulario
    const data = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "clasta": "0"
          }
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
          "descripcion": "No aplica",
          "primaryKey": {
              "conesq": "0"
          }
      },
      "nmVacacionStatusTb": {
          "vacsta": "3",
          "descripcion": "Rotacion situacion",
          "primaryKey": {
              "vacsta": "3"
          }
      },
      "nmGrupoRotacionTb": {
          "idEmpresa": "93",
          "idNomina": "0001",
          "idGrupo": "PP",
          "congru": "1",
          "diag01": "P",
          "diag02": "P",
          "diag03": "P",
          "diag04": "P",
          "diag05": "P",
          "diag06": "P",
          "diag07": "P",
          "diag08": "P",
          "diag09": "P",
          "diag10": "P",
          "diag11": "P",
          "diag12": "P",
          "diag13": "P",
          "diag14": "P",
          "diag15": "P",
          "diag16": "P",
          "diag17": "P",
          "diag18": "P",
          "diag19": "P",
          "diag20": "P",
          "diag21": "P",
          "diag22": "P",
          "diag23": "P",
          "diag24": "P",
          "diag25": "P",
          "diag26": "P",
          "diag27": "P",
          "diag28": "P",
          "diag29": "P",
          "diag30": "P",
          "diag31": null,
          "diav01": null,
          "diav02": null,
          "diav03": null,
          "diav04": null,
          "diav05": null,
          "diav06": null,
          "diav07": null,
          "diav08": null,
          "diav09": null,
          "diav10": null,
          "diav11": null,
          "diav12": null,
          "diav13": null,
          "diav14": null,
          "diav15": null,
          "diav16": null,
          "diav17": null,
          "diav18": null,
          "diav19": null,
          "diav20": null,
          "diav21": null,
          "diav22": null,
          "diav23": null,
          "diav24": null,
          "diav25": null,
          "diav26": null,
          "diav27": null,
          "diav28": null,
          "diav29": null,
          "diav30": null,
          "diav31": null,
          "canlim": 0,
          "diaga1": null,
          "diaga2": null,
          "diaga3": null,
          "diaga4": null,
          "diava1": null,
          "diava2": null,
          "diava3": null,
          "diava4": null,
          "idTableTemporal": 1
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPAR",
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
    app.form.controls['codsta'].disable();
    app.form.reset(data)
    expect(app.form.valid).toEqual(true)
    app.desstaMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}/${app.empresaRow.id}/${app.nominaRow.tipnom}/${data.codsta}`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.situaciones = [
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ]
    // datos del formulario
    const data = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
      },
      "nmVacacionStatusTb": {
          "vacsta": "3",
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPAR",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codsta'].setValue("PPAR")
    expect(app.form.valid).toEqual(false)
    app.codstaMsgError;

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codsta'].setValue("15525")
    expect(app.form.valid).toEqual(false)
    app.codstaMsgError;
    
    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['codsta'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.codstaMsgError;

    // Llamamos a la funcion de Guardado
    app.save()

    app.campoInvalid('codsta');

  });
  it('Validando el formulario (Caso Editado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.situaciones = [
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      },
      {
        "dessta": "PERMISO POR PATERNIDAD",
        "cfClaseSituacionTb": {
            "clasta": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "clasta": "0"
            }
        },
        "nmTipoEsquTrabCalcVacaTb": {
            "conesq": "0",
            "descripcion": "No aplica",
            "primaryKey": {
                "conesq": "0"
            }
        },
        "nmVacacionStatusTb": {
            "vacsta": "3",
            "descripcion": "Rotacion situacion",
            "primaryKey": {
                "vacsta": "3"
            }
        },
        "nmGrupoRotacionTb": {
            "idEmpresa": "93",
            "idNomina": "0001",
            "idGrupo": "PP",
            "congru": "1",
            "diag01": "P",
            "diag02": "P",
            "diag03": "P",
            "diag04": "P",
            "diag05": "P",
            "diag06": "P",
            "diag07": "P",
            "diag08": "P",
            "diag09": "P",
            "diag10": "P",
            "diag11": "P",
            "diag12": "P",
            "diag13": "P",
            "diag14": "P",
            "diag15": "P",
            "diag16": "P",
            "diag17": "P",
            "diag18": "P",
            "diag19": "P",
            "diag20": "P",
            "diag21": "P",
            "diag22": "P",
            "diag23": "P",
            "diag24": "P",
            "diag25": "P",
            "diag26": "P",
            "diag27": "P",
            "diag28": "P",
            "diag29": "P",
            "diag30": "P",
            "diag31": null,
            "diav01": null,
            "diav02": null,
            "diav03": null,
            "diav04": null,
            "diav05": null,
            "diav06": null,
            "diav07": null,
            "diav08": null,
            "diav09": null,
            "diav10": null,
            "diav11": null,
            "diav12": null,
            "diav13": null,
            "diav14": null,
            "diav15": null,
            "diav16": null,
            "diav17": null,
            "diav18": null,
            "diav19": null,
            "diav20": null,
            "diav21": null,
            "diav22": null,
            "diav23": null,
            "diav24": null,
            "diav25": null,
            "diav26": null,
            "diav27": null,
            "diav28": null,
            "diav29": null,
            "diav30": null,
            "diav31": null,
            "canlim": 0,
            "diaga1": null,
            "diaga2": null,
            "diaga3": null,
            "diaga4": null,
            "diava1": null,
            "diava2": null,
            "diava3": null,
            "diava4": null,
            "idTableTemporal": 1
        },
        "idGrupo": "PP",
        "idRotacion": "1",
        "codsta": "PPAR",
        "idEmpresa": "93",
        "idNomina": "0001"
      }
    ]
    // datos del formulario
    const data = {
      "dessta": "PERMISO POR PATERNIDAD",
      "cfClaseSituacionTb": {
          "clasta": "0",
      },
      "nmTipoEsquTrabCalcVacaTb": {
          "conesq": "0",
      },
      "nmVacacionStatusTb": {
          "vacsta": "3",
      },
      "idGrupo": "PP",
      "idRotacion": "1",
      "codsta": "PPAR",
      "idEmpresa": "93",
      "idNomina": "0001"
    };

    app.ngOnChanges()

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsta'].disable();
    app.form.reset(data)
    app.form.controls['dessta'].setValue("1234567891234567891234567891234")
    expect(app.form.valid).toEqual(false)
    app.desstaMsgError

    // caso vacio
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.controls['codsta'].disable();
    app.form.reset(data)
    app.form.controls['dessta'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.desstaMsgError

    app.save();

    app.campoInvalid('dessta');
  });
});
