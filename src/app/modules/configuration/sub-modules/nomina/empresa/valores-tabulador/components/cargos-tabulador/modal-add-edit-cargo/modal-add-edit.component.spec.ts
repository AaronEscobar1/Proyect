import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ModalAddEditCargoComponent } from './modal-add-edit-cargo.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/configuraciones/nominas/cargostabuladores`;

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
        ModalAddEditCargoComponent
      ]
    }).compileComponents()
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
  }));


  it('Crear componente de Niveles Educativos Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditCargoComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente Forma de Crear', () => {
    const fixture = TestBed.createComponent(ModalAddEditCargoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Se valida que no haya cambios en el input isEdit

    app.ngOnChanges()
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    app.save()

    // validamos que no exista el nivelSelect

    expect(app.cargoTabuladorSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditCargoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    let data = {
        "idEmpresa":   "93",
        "id":          "1",
        "nmCargoTabuladorTbId": {
          "idEmpresa": "93",
          "id":       "1"
        },
        "tabu01": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu02": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu03": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu04": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu05": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu06": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu07": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu08": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu09": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu10": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu11": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu12": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "mest01": 2,
        "mest02": 2,
        "mest03": 2,
        "mest04": 2,
        "mest05": 2,
        "mest06": 2,
        "mest07": 2,
        "mest08": 2,
        "mest09": 2,
        "mest10": 2,
        "mest11": 2,
        "mest12": 2,  
    };

    app.cargosTabulador.push(data)
    app.cargoTabuladorSelect = data
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();

    app.cargoTabuladorSelect = {
      "idEmpresa":   "93",
      "id":          "1",
        "nmCargoTabuladorTbId": {
          "idEmpresa": "93",
          "id":       "1"
        },
        "tabu01": null,    
        "tabu02": null,    
        "tabu03": null,    
        "tabu04": null,    
        "tabu05": null,    
        "tabu06": null,    
        "tabu07": null,    
        "tabu08": null,    
        "tabu09": null,    
        "tabu10": null,    
        "tabu11": null,    
        "tabu12": null,    
        "mest01": 2,
        "mest02": 2,
        "mest03": 2,
        "mest04": 2,
        "mest05": 2,
        "mest06": 2,
        "mest07": 2,
        "mest08": 2,
        "mest09": 2,
        "mest10": 2,
        "mest11": 2,
        "mest12": 2,  
    };
    
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();

  });

  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditCargoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.cargosTabulador = [
      {
        "idEmpresa":   "93",
        "id":          "1",
        "nmCargoTabuladorTbId": {
          "idEmpresa": "93",
          "id":       "1"
        },
        "tabu01": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu02": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu03": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu04": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu05": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu06": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu07": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu08": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu09": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu10": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu11": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu12": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "mest01": 2,
        "mest02": 2,
        "mest03": 2,
        "mest04": 2,
        "mest05": 2,
        "mest06": 2,
        "mest07": 2,
        "mest08": 2,
        "mest09": 2,
        "mest10": 2,
        "mest11": 2,
        "mest12": 2,  
      }
    ];
    app.cargoTabuladorSelect = {
      "idEmpresa":   "93",
      "id":          "2",
      "nmCargoTabuladorTbId": {
        "idEmpresa": "93",
        "id":       "1"
      },
      "tabu01": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu02": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu03": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu04": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu05": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu06": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu07": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu08": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu09": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu10": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu11": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu12": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "mest01": 2,
      "mest02": 2,
      "mest03": 2,
      "mest04": 2,
      "mest05": 2,
      "mest06": 2,
      "mest07": 2,
      "mest08": 2,
      "mest09": 2,
      "mest10": 2,
      "mest11": 2,
      "mest12": 2,  
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.valid).toEqual(true)
  });

  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditCargoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    expect(app.cargoTabuladorSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos (Caso Verdadero)', () => {
    const fixture = TestBed.createComponent(ModalAddEditCargoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.cargosTabulador = [
      {
        "idEmpresa":   "93",
        "id":          "1",
        "nmCargoTabuladorTbId": {
          "idEmpresa": "93",
          "id":       "1"
        },
        "tabu01": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu02": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu03": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu04": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu05": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu06": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu07": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu08": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu09": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu10": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu11": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu12": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "mest01": 2,
        "mest02": 2,
        "mest03": 2,
        "mest04": 2,
        "mest05": 2,
        "mest06": 2,
        "mest07": 2,
        "mest08": 2,
        "mest09": 2,
        "mest10": 2,
        "mest11": 2,
        "mest12": 2,  
      }
    ];

    // datos del formulario
    const data = {
      "idEmpresa":   "93",
      "id":          "2",
      "tabu01": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu02": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu03": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu04": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu05": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu06": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu07": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu08": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu09": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu10": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu11": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu12": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "mest01": 2,
      "mest02": 2,
      "mest03": 2,
      "mest04": 2,
      "mest05": 2,
      "mest06": 2,
      "mest07": 2,
      "mest08": 2,
      "mest09": 2,
      "mest10": 2,
      "mest11": 2,
      "mest12": 2,  
    };

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
    app.idMsgError

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('POST');

  });

  it('Probando el Guardado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditCargoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.cargosTabulador = [
      {
        "idEmpresa":   "93",
        "id":          "1",
        "nmCargoTabuladorTbId": {
          "idEmpresa": "93",
          "id":       "1"
        },
        "tabu01": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu02": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu03": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu04": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu05": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu06": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu07": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu08": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu09": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu10": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu11": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu12": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "mest01": 2,
        "mest02": 2,
        "mest03": 2,
        "mest04": 2,
        "mest05": 2,
        "mest06": 2,
        "mest07": 2,
        "mest08": 2,
        "mest09": 2,
        "mest10": 2,
        "mest11": 2,
        "mest12": 2,  
      }
    ];

    // datos del formulario
    const data = {
      "idEmpresa":   "93",
      "id":          "2",
      "tabu01": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu02": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu03": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu04": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu05": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu06": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu07": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu08": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu09": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu10": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu11": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "tabu12": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
      },    
      "mest01": 2,
      "mest02": 2,
      "mest03": 2,
      "mest04": 2,
      "mest05": 2,
      "mest06": 2,
      "mest07": 2,
      "mest08": 2,
      "mest09": 2,
      "mest10": 2,
      "mest11": 2,
      "mest12": 2,  
    };

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
      error : new Error('Error en los datos de entrada.'),
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
    const fixture = TestBed.createComponent(ModalAddEditCargoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.cargosTabulador = [
      {
        "idEmpresa":   "93",
        "id":          "1",
        "nmCargoTabuladorTbId": {
          "idEmpresa": "93",
          "id":       "1"
        },
        "tabu01": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu02": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu03": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu04": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu05": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu06": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu07": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu08": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu09": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu10": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu11": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu12": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "mest01": 2,
        "mest02": 2,
        "mest03": 2,
        "mest04": 2,
        "mest05": 2,
        "mest06": 2,
        "mest07": 2,
        "mest08": 2,
        "mest09": 2,
        "mest10": 2,
        "mest11": 2,
        "mest12": 2,  
      }
    ];

    // datos del formulario
    const data = {
      "idEmpresa":   "93",
      "id":          "1",
      "nmCargoTabuladorTbId": {
        "idEmpresa": "93",
        "id":       "1"
      },
      "tabu01": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu02": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu03": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu04": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu05": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu06": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu07": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu08": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu09": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu10": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu11": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu12": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "mest01": 2,
      "mest02": 2,
      "mest03": 2,
      "mest04": 2,
      "mest05": 2,
      "mest06": 2,
      "mest07": 2,
      "mest08": 2,
      "mest09": 2,
      "mest10": 2,
      "mest11": 2,
      "mest12": 2,  
    };

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
    app.form.controls['id'].disable();
    app.form.reset(data)
    console.log(app.form.valid)
    expect(app.form.valid).toEqual(true)

    // Llamamos a la funcion de Guardado
    app.save()

    const fakeBackend = httpTestingController.expectOne(`http://localhost:8080/api/configuraciones/nominas/cargostabuladores/empresas/93/1`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.cargoTabuladorSelect).toEqual(undefined);
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditCargoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.cargosTabulador = [
      {
        "idEmpresa":   "93",
        "id":          "1",
        "nmCargoTabuladorTbId": {
          "idEmpresa": "93",
          "id":       "1"
        },
        "tabu01": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu02": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu03": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu04": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu05": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu06": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu07": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu08": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu09": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu10": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu11": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu12": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "mest01": 2,
        "mest02": 2,
        "mest03": 2,
        "mest04": 2,
        "mest05": 2,
        "mest06": 2,
        "mest07": 2,
        "mest08": 2,
        "mest09": 2,
        "mest10": 2,
        "mest11": 2,
        "mest12": 2,  
      }
    ];

    // datos del formulario
    const data = {
      "idEmpresa":   "93",
      "id":          "2",
      "nmCargoTabuladorTbId": {
        "idEmpresa": "93",
        "id":       "1"
      },
      "tabu01": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu02": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu03": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu04": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu05": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu06": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu07": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu08": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu09": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu10": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu11": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu12": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       null
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "mest01": 2,
      "mest02": 2,
      "mest03": 2,
      "mest04": 2,
      "mest05": 2,
      "mest06": 2,
      "mest07": 2,
      "mest08": 2,
      "mest09": 2,
      "mest10": 2,
      "mest11": 2,
      "mest12": 2,  
    };

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
      error : new Error('Error en los datos de entrada.'),
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
  });

  it('Probando el Editado de Datos (Caso Falso)', () => {
    const fixture = TestBed.createComponent(ModalAddEditCargoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.cargosTabulador = [
      {
        "idEmpresa":   "93",
        "id":          "1",
        "nmCargoTabuladorTbId": {
          "idEmpresa": "93",
          "id":       "1"
        },
        "tabu01": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu02": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu03": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu04": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu05": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu06": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu07": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu08": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu09": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu10": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu11": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu12": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "mest01": 2,
        "mest02": 2,
        "mest03": 2,
        "mest04": 2,
        "mest05": 2,
        "mest06": 2,
        "mest07": 2,
        "mest08": 2,
        "mest09": 2,
        "mest10": 2,
        "mest11": 2,
        "mest12": 2,  
      }
    ];

    // datos del formulario
    const data = {
      "idEmpresa":   "93",
      "id":          "2",
      "nmCargoTabuladorTbId": {
        "idEmpresa": "93",
        "id":       "1"
      },
      "tabu01": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu02": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu03": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu04": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu05": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu06": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu07": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu08": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu09": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu10": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu11": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu12": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "mest01": 2,
      "mest02": 2,
      "mest03": 2,
      "mest04": 2,
      "mest05": 2,
      "mest06": 2,
      "mest07": 2,
      "mest08": 2,
      "mest09": 2,
      "mest10": 2,
      "mest11": 2,
      "mest12": 2,  
    };

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
      error : new Error('Error en los datos de entrada.'),
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

    const fakeBackend = httpTestingController.expectOne(`http://localhost:8080/api/configuraciones/nominas/cargostabuladores/empresas/93/2`);
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.cargoTabuladorSelect).toEqual(undefined);
  });

  it('Validando el formulario (Caso Creado)', () => {
    const fixture = TestBed.createComponent(ModalAddEditCargoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.cargosTabulador = [
      {
        "idEmpresa":   "93",
        "id":          "1",
        "nmCargoTabuladorTbId": {
          "idEmpresa": "93",
          "id":       "1"
        },
        "tabu01": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu02": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu03": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu04": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu05": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu06": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu07": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu08": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu09": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu10": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu11": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "tabu12": {
          "eoGradoTbId": {
          "idEmpresa": "93",
          "id":       "1"
          },
          "descrip":     "hola",
          "codOficial":  "01",
        },    
        "mest01": 2,
        "mest02": 2,
        "mest03": 2,
        "mest04": 2,
        "mest05": 2,
        "mest06": 2,
        "mest07": 2,
        "mest08": 2,
        "mest09": 2,
        "mest10": 2,
        "mest11": 2,
        "mest12": 2,  
      }
    ];

    // datos del formulario
    const data = {
      "idEmpresa":   "93",
      "id":          "1",
      "nmCargoTabuladorTbId": {
        "idEmpresa": "93",
        "id":       "1"
      },
      "tabu01": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu02": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu03": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu04": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu05": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu06": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu07": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu08": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu09": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu10": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu11": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "tabu12": {
        "eoGradoTbId": {
        "idEmpresa": "93",
        "id":       "1"
        },
        "descrip":     "hola",
        "codOficial":  "01",
      },    
      "mest01": 2,
      "mest02": 2,
      "mest03": 2,
      "mest04": 2,
      "mest05": 2,
      "mest06": 2,
      "mest07": 2,
      "mest08": 2,
      "mest09": 2,
      "mest10": 2,
      "mest11": 2,
      "mest12": 2,  
    };  

    // caso repite
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("1")
    expect(app.form.valid).toEqual(false)
    app.idMsgError
    
    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("01235555555555555555555554")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    // caso length
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.reset(data)
    app.form.controls['id'].setValue("")
    expect(app.form.valid).toEqual(false)
    app.idMsgError

    app.campoInvalid('id');
  });

});
