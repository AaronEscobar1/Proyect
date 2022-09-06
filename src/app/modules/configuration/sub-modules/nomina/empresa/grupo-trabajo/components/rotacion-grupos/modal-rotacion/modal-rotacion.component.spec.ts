import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { GrupoTrabajoService } from '../../../services/grupo-trabajo.service';
import { GrupoRotacion } from '../../../../shared-empresa/interfaces/grupo-rotacion.interfaces';
import { ModalRotacionComponent } from './modal-rotacion.component';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GrupoTrabajo } from '../../../interfaces/grupo-trabajo.interfaces';

describe('NivelesEducativosComponent', () => {

  let httpTestingController: HttpTestingController;

  let services: GrupoTrabajoService;

  const URL = `${environment.api}/configuraciones/nominas/empresas/93/nominas/0001/rotaciongrupos`;

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
        ModalRotacionComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);

    services = TestBed.inject(GrupoTrabajoService);

  }));

  it('Crear componente de Niveles Educativos correctamente', () => {
    const fixture = TestBed.createComponent(ModalRotacionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(ModalRotacionComponent);
    const app = fixture.componentInstance;
    expect(app.rotacionesGrupoTrabajo.length).toBe(0);
    fixture.detectChanges();
  });

  it('Cerrar Modal', async () => {
    
    const fixture = TestBed.createComponent(ModalRotacionComponent);
    const app = fixture.componentInstance;

    spyOn(app.onCloseDataTableModal, 'emit');
    
    // Simulamos el proceso de abrir el modal de Crear
    app.closeModal();

  })

  it('Cargar Rotaciones (caso fallido)', ()=>{
    const fixture = TestBed.createComponent(ModalRotacionComponent);
    const app = fixture.componentInstance;

    const dataNomina = {
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

    const data: GrupoTrabajo = {
      "desgru": "descripción",
      "labdom": "1",
      "tipoJornada": {
          "id": "D",
          "descripcion": "Diurna"
      },
      "codgru": "D"
    }

    const error = new ErrorEvent('', {
      error : new Error('Error'),
      filename : '',
      lineno: 404,
      message: "Error",   
    });

    app.loadRotacion(data, dataNomina);
    fixture.detectChanges(); 
    
    const fakeBackend = httpTestingController.expectOne(`${URL}/${data.codgru}`); 
    fakeBackend.error(error);
    expect(fakeBackend.request.method).toBe('GET'); 

  })

  it('Eliminar Niveles Educativos (caso verdadero)', ()=>{
    const fixture = TestBed.createComponent(ModalRotacionComponent);
    const app = fixture.componentInstance;

    const dataNomina = {
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

    const data: GrupoTrabajo = {
      "desgru": "descripción",
      "labdom": "1",
      "tipoJornada": {
          "id": "D",
          "descripcion": "Diurna"
      },
      "codgru": "D"
    }

    const resp = [
      {
        "diag01": "F",
        "diag02": "1",
        "diag03": "S",
        "diag04": "D",
        "diag05": "1",
        "diag06": "1",
        "diag07": "1",
        "diag08": "1",
        "diag09": "1",
        "diag10": "S",
        "diag11": "D",
        "diag12": "1",
        "diag13": "1",
        "diag14": "1",
        "diag15": "1",
        "diag16": "1",
        "diag17": "S",
        "diag18": "D",
        "diag19": "1",
        "diag20": "1",
        "diag21": "1",
        "diag22": "1",
        "diag23": "1",
        "diag24": "S",
        "diag25": "D",
        "diag26": "1",
        "diag27": "1",
        "diag28": "1",
        "diag29": "1",
        "diag30": "1",
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
        "diaga1": null,
        "diaga2": null,
        "diaga3": null,
        "diaga4": null,
        "diava1": null,
        "diava2": null,
        "diava3": null,
        "diava4": null,
        "canlim": 0,
        "idEmpresa": "93",
        "idNomina": "0001",
        "idGrupo": "A",
        "congru": "2",
        "idTableTemporal" : 0
      },
      {
        "diag01": "Q",
        "diag02": "Q",
        "diag03": "Q",
        "diag04": "Q",
        "diag05": "Q",
        "diag06": "Q",
        "diag07": "Q",
        "diag08": "Q",
        "diag09": "Q",
        "diag10": "Q",
        "diag11": "Q",
        "diag12": "Q",
        "diag13": "Q",
        "diag14": "Q",
        "diag15": "Q",
        "diag16": "Q",
        "diag17": "Q",
        "diag18": "Q",
        "diag19": "Q",
        "diag20": "Q",
        "diag21": "Q",
        "diag22": "Q",
        "diag23": "Q",
        "diag24": "Q",
        "diag25": "Q",
        "diag26": "Q",
        "diag27": "Q",
        "diag28": "Q",
        "diag29": "Q",
        "diag30": "Q",
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
        "diaga1": null,
        "diaga2": null,
        "diaga3": null,
        "diaga4": null,
        "diava1": null,
        "diava2": null,
        "diava3": null,
        "diava4": null,
        "canlim": 0,
        "idEmpresa": "93",
        "idNomina": "0001",
        "idGrupo": "A",
        "congru": "3",
        "idTableTemporal": 1
      }
    ]

    app.loadRotacion(data, dataNomina);
    fixture.detectChanges(); 

    const fakeBackend = httpTestingController.match(`${URL}/${data.codgru}`);
    fakeBackend[0].flush(resp);
    expect(fakeBackend[0].request.method).toBe('GET');

  })
  
  it('Eliminar Niveles Educativos (caso verdadero)', ()=>{
    const fixture = TestBed.createComponent(ModalRotacionComponent);
    const app = fixture.componentInstance;

    const dataNomina = undefined

    const data: GrupoTrabajo = {
      "desgru": "descripción",
      "labdom": "1",
      "tipoJornada": {
          "id": "D",
          "descripcion": "Diurna"
      },
      "codgru": "D"
    }

    const resp = [
      {
        "diag01": "F",
        "diag02": "1",
        "diag03": "S",
        "diag04": "D",
        "diag05": "1",
        "diag06": "1",
        "diag07": "1",
        "diag08": "1",
        "diag09": "1",
        "diag10": "S",
        "diag11": "D",
        "diag12": "1",
        "diag13": "1",
        "diag14": "1",
        "diag15": "1",
        "diag16": "1",
        "diag17": "S",
        "diag18": "D",
        "diag19": "1",
        "diag20": "1",
        "diag21": "1",
        "diag22": "1",
        "diag23": "1",
        "diag24": "S",
        "diag25": "D",
        "diag26": "1",
        "diag27": "1",
        "diag28": "1",
        "diag29": "1",
        "diag30": "1",
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
        "diaga1": null,
        "diaga2": null,
        "diaga3": null,
        "diaga4": null,
        "diava1": null,
        "diava2": null,
        "diava3": null,
        "diava4": null,
        "canlim": 0,
        "idEmpresa": "93",
        "idNomina": "0001",
        "idGrupo": "A",
        "congru": "2",
        "idTableTemporal" : 0
      },
      {
        "diag01": "Q",
        "diag02": "Q",
        "diag03": "Q",
        "diag04": "Q",
        "diag05": "Q",
        "diag06": "Q",
        "diag07": "Q",
        "diag08": "Q",
        "diag09": "Q",
        "diag10": "Q",
        "diag11": "Q",
        "diag12": "Q",
        "diag13": "Q",
        "diag14": "Q",
        "diag15": "Q",
        "diag16": "Q",
        "diag17": "Q",
        "diag18": "Q",
        "diag19": "Q",
        "diag20": "Q",
        "diag21": "Q",
        "diag22": "Q",
        "diag23": "Q",
        "diag24": "Q",
        "diag25": "Q",
        "diag26": "Q",
        "diag27": "Q",
        "diag28": "Q",
        "diag29": "Q",
        "diag30": "Q",
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
        "diaga1": null,
        "diaga2": null,
        "diaga3": null,
        "diaga4": null,
        "diava1": null,
        "diava2": null,
        "diava3": null,
        "diava4": null,
        "canlim": 0,
        "idEmpresa": "93",
        "idNomina": "0001",
        "idGrupo": "A",
        "congru": "3",
        "idTableTemporal": 1
      }
    ]

    app.loadRotacion(data, dataNomina);
    fixture.detectChanges(); 

  })

});
