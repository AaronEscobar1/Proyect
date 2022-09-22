import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { ProcesoSituacionService } from '../../../services/proceso-situacion.service';
import { ModalProcesosComponent } from './modal-procesos.component';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NivelesEducativosComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: ProcesoSituacionService;

  const URL = `${environment.api}/configuraciones/nominas/empresas/94/nominas/0004/situaciones/AUA/conceptos`;

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        ConfirmDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [
        ModalProcesosComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(ProcesoSituacionService);

  }));

  it('Crear componente de Niveles Educativos correctamente', () => {
    const fixture = TestBed.createComponent(ModalProcesosComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(ModalProcesosComponent);
    const app = fixture.componentInstance;
    expect(app.procesosSituaciones.length).toBe(0);
    fixture.detectChanges();
  });

  it('Cerrar Modal', async () => {
    
    const fixture = TestBed.createComponent(ModalProcesosComponent);
    const app = fixture.componentInstance;

    spyOn(app.onCloseDataTableModal, 'emit');
    
    // Simulamos el proceso de abrir el modal de Crear
    app.closeModal();

  })

  it('Cargar Conceptos (caso fallido)', ()=>{
    const fixture = TestBed.createComponent(ModalProcesosComponent);
    const app = fixture.componentInstance;

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
    }

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error",   
    });

    app.loadProcesosSituacion(data);
    fixture.detectChanges(); 
    
    const fakeBackend = httpTestingController.expectOne(`${environment.api}/configuraciones/nominas/empresas/93/nominas/0001/situaciones/PPAR/procesos`); 
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET'); 

  })

  it('Cargar Conceptos (caso verdadero)', ()=>{
    const fixture = TestBed.createComponent(ModalProcesosComponent);
    const app = fixture.componentInstance;

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
    }

    const resp = [
      {
          "idEmpresa": "94",
          "idNomina": "0004",
          "codStat": "AUA",
          "idConcepto": "1",
          "dialim": 365,
          "usrcre": "USR",
          "feccre": "2022-08-17T16:43:17",
          "usract": "USR",
          "fecact": "2022-08-17T17:30:16",
          "nmTipoSuspencionVacacTb": {
              "susvac": "1",
              "descripcion": "Salida",
              "usrcre": null,
              "feccre": null,
              "usract": null,
              "fecact": null,
              "primaryKey": {
                  "susvac": "1"
              }
          }
      },
      {
          "idEmpresa": "94",
          "idNomina": "0004",
          "codStat": "AUA",
          "idConcepto": "2",
          "dialim": 2,
          "usrcre": "USR",
          "feccre": "2022-08-17T17:08:10",
          "usract": "USR",
          "fecact": "2022-08-17T17:20:42",
          "nmTipoSuspencionVacacTb": {
              "susvac": "0",
              "descripcion": "No aplica",
              "usrcre": null,
              "feccre": null,
              "usract": null,
              "fecact": null,
              "primaryKey": {
                  "susvac": "0"
              }
          }
      },
      {
          "idEmpresa": "94",
          "idNomina": "0004",
          "codStat": "AUA",
          "idConcepto": "3",
          "dialim": 3,
          "usrcre": "USR",
          "feccre": "2022-08-17T17:17:51",
          "usract": null,
          "fecact": null,
          "nmTipoSuspencionVacacTb": {
              "susvac": "0",
              "descripcion": "No aplica",
              "usrcre": null,
              "feccre": null,
              "usract": null,
              "fecact": null,
              "primaryKey": {
                  "susvac": "0"
              }
          }
      }
    ]

    app.loadProcesosSituacion(data);
    fixture.detectChanges(); 

    const fakeBackend = httpTestingController.match(`${environment.api}/configuraciones/nominas/empresas/93/nominas/0001/situaciones/PPAR/procesos`);
    fakeBackend[0].flush(resp);
    expect(fakeBackend[0].request.method).toBe('GET');

  })

  it('Cargar SituacionVacacional (caso fallido)', ()=>{
    const fixture = TestBed.createComponent(ModalProcesosComponent);
    const app = fixture.componentInstance;

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error",   
    });

    app.loadSuspensionVacacion();
    fixture.detectChanges(); 
    
    const fakeBackend = httpTestingController.match(`${environment.api}/configuraciones/nominas/suspencionesvacaciones`); 
    fakeBackend[0].error(error);
    expect(fakeBackend[0].request.method).toBe('GET'); 

  })

  it('Cargar SituacionVacacional (caso verdadero)', ()=>{
    const fixture = TestBed.createComponent(ModalProcesosComponent);
    const app = fixture.componentInstance;

    const resp = [
      {
          "idEmpresa": "94",
          "idNomina": "0004",
          "codStat": "AUA",
          "idConcepto": "1",
          "dialim": 365,
          "usrcre": "USR",
          "feccre": "2022-08-17T16:43:17",
          "usract": "USR",
          "fecact": "2022-08-17T17:30:16",
          "nmTipoSuspencionVacacTb": {
              "susvac": "1",
              "descripcion": "Salida",
              "usrcre": null,
              "feccre": null,
              "usract": null,
              "fecact": null,
              "primaryKey": {
                  "susvac": "1"
              }
          }
      },
      {
          "idEmpresa": "94",
          "idNomina": "0004",
          "codStat": "AUA",
          "idConcepto": "2",
          "dialim": 2,
          "usrcre": "USR",
          "feccre": "2022-08-17T17:08:10",
          "usract": "USR",
          "fecact": "2022-08-17T17:20:42",
          "nmTipoSuspencionVacacTb": {
              "susvac": "0",
              "descripcion": "No aplica",
              "usrcre": null,
              "feccre": null,
              "usract": null,
              "fecact": null,
              "primaryKey": {
                  "susvac": "0"
              }
          }
      },
      {
          "idEmpresa": "94",
          "idNomina": "0004",
          "codStat": "AUA",
          "idConcepto": "3",
          "dialim": 3,
          "usrcre": "USR",
          "feccre": "2022-08-17T17:17:51",
          "usract": null,
          "fecact": null,
          "nmTipoSuspencionVacacTb": {
              "susvac": "0",
              "descripcion": "No aplica",
              "usrcre": null,
              "feccre": null,
              "usract": null,
              "fecact": null,
              "primaryKey": {
                  "susvac": "0"
              }
          }
      }
    ]

    app.loadSuspensionVacacion();
    fixture.detectChanges(); 

    const fakeBackend = httpTestingController.match(`${environment.api}/configuraciones/nominas/suspencionesvacaciones`); 
    fakeBackend[0].flush(resp);
    expect(fakeBackend[0].request.method).toBe('GET');

  })

});
