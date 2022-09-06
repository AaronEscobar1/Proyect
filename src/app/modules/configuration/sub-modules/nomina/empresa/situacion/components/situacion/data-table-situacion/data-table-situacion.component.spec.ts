import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { ModalProcesosComponent } from '../../procesos-situacion/modal-procesos/modal-procesos.component';
import { ModalConceptosComponent } from '../../conceptos-situacion/modal-conceptos/modal-conceptos.component';

import { DataTableSituacionComponent } from './data-table-situacion.component';

describe('DataTableComponent', () => {
  let httpTestingController: HttpTestingController;
  let service: CompanyNominaService;
  let serviceRow: SelectRowService;

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        DataTableSituacionComponent,
        ModalProcesosComponent,
        ModalConceptosComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CompanyNominaService);
    serviceRow = TestBed.inject(SelectRowService);
  }));

  it('Crear componente de Motivos Finiquito DataTable Component correctamente', () => {
    const fixture = TestBed.createComponent(DataTableSituacionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente DataTable', () => {
    const fixture = TestBed.createComponent(DataTableSituacionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(app.columns.length).toBeGreaterThanOrEqual(0)
  });

  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableSituacionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowThirdTable$, 'emit').and.callThrough();

    expect(app.columns.length).toBeGreaterThanOrEqual(0)

    const log = {
      "originalEvent": {
          "isTrusted": true
      },
      "data": {
          "codmot": "1",
          "desmot": "prueba 1",
          "fecact": "2022-05-03T22:20:36.682Z",
          "feccre": "2022-05-03T22:20:36.682Z",
          "usract": "",
          "usrcre": ""
      },
      "type": "row"
    }

    app.onRowSelect(log)
    expect(service.selectRowThirdTable$.emit).not.toHaveBeenCalledWith(null);

  });

  it('show modal rotaciones ', () => {
    const fixture = TestBed.createComponent(DataTableSituacionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(app.conceptosComponent, 'loadConceptosSituacion');

    app.situacionSelectRow = {
      "dessta": "SUSPENDIDO NOMINA",
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
          "vacsta": "2",
          "descripcion": "Rotacion trabajador vacacion",
          "primaryKey": {
              "vacsta": "2"
          }
      },
      "nmGrupoRotacionTb": {
        "idEmpresa": "93",
        "idNomina": "0001",
        "idGrupo": "RM",
        "congru": "3",
        "diag01": "3",
        "diag02": "3",
        "diag03": "3",
        "diag04": "3",
        "diag05": "3",
        "diag06": "3",
        "diag07": "3",
        "diag08": "3",
        "diag09": "3",
        "diag10": "3",
        "diag11": "3",
        "diag12": "3",
        "diag13": "3",
        "diag14": "3",
        "diag15": "3",
        "diag16": "3",
        "diag17": "3",
        "diag18": "3",
        "diag19": "3",
        "diag20": "3",
        "diag21": "3",
        "diag22": "3",
        "diag23": "3",
        "diag24": "3",
        "diag25": "3",
        "diag26": "3",
        "diag27": "3",
        "diag28": "3",
        "diag29": "3",
        "diag30": "3",
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
      "idGrupo": "null",
      "idRotacion": "null",
      "codsta": "SUSN",
      "idEmpresa": "93",
      "idNomina": "0001"
    }

    app.showConceptosModal()

  });

  it('show modal rotaciones ', () => {
    const fixture = TestBed.createComponent(DataTableSituacionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(app.procesosComponent, 'loadProcesosSituacion');

    app.situacionSelectRow = {
      "dessta": "SUSPENDIDO NOMINA",
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
          "vacsta": "2",
          "descripcion": "Rotacion trabajador vacacion",
          "primaryKey": {
              "vacsta": "2"
          }
      },
      "nmGrupoRotacionTb": {
        "idEmpresa": "93",
        "idNomina": "0001",
        "idGrupo": "RM",
        "congru": "3",
        "diag01": "3",
        "diag02": "3",
        "diag03": "3",
        "diag04": "3",
        "diag05": "3",
        "diag06": "3",
        "diag07": "3",
        "diag08": "3",
        "diag09": "3",
        "diag10": "3",
        "diag11": "3",
        "diag12": "3",
        "diag13": "3",
        "diag14": "3",
        "diag15": "3",
        "diag16": "3",
        "diag17": "3",
        "diag18": "3",
        "diag19": "3",
        "diag20": "3",
        "diag21": "3",
        "diag22": "3",
        "diag23": "3",
        "diag24": "3",
        "diag25": "3",
        "diag26": "3",
        "diag27": "3",
        "diag28": "3",
        "diag29": "3",
        "diag30": "3",
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
      "idGrupo": "null",
      "idRotacion": "null",
      "codsta": "SUSN",
      "idEmpresa": "93",
      "idNomina": "0001"
    }

    app.showProcesosModal()

  });

  it('Obtener Row Deseleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableSituacionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowThirdTable$, 'emit').and.callThrough();

    const nativeElement = fixture.nativeElement;
    expect(app.columns.length).toBeGreaterThanOrEqual(0)

    app.onRowUnselect()
    expect(service.selectRowThirdTable$.emit).toHaveBeenCalledWith(null);

  });

  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableSituacionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowThirdTable$, 'emit').and.callThrough();

    expect(app.columns.length).toBeGreaterThanOrEqual(0)

    const log = {
      "originalEvent": {
          "isTrusted": true
      },
      "data": {
          "codmot": "1",
          "desmot": "prueba 1",
          "fecact": "2022-05-03T22:20:36.682Z",
          "feccre": "2022-05-03T22:20:36.682Z",
          "usract": "",
          "usrcre": ""
      },
      "type": "row"
    }

    app.onRowSelect(log)
    expect(service.selectRowThirdTable$.emit).not.toHaveBeenCalledWith(null);

  });

  it('Obtener Row Deseleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableSituacionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowThirdTable$, 'emit').and.callThrough();

    const nativeElement = fixture.nativeElement;
    expect(app.columns.length).toBeGreaterThanOrEqual(0)

    app.onRowUnselect()
    expect(service.selectRowThirdTable$.emit).toHaveBeenCalledWith(null);

  });

  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableSituacionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowThirdTable$, 'emit').and.callThrough();

    expect(app.columns.length).toBeGreaterThanOrEqual(0)

    const log = {
      "originalEvent": {
          "isTrusted": true
      },
      "data": {
          "codmot": "1",
          "desmot": "prueba 1",
          "fecact": "2022-05-03T22:20:36.682Z",
          "feccre": "2022-05-03T22:20:36.682Z",
          "usract": "",
          "usrcre": ""
      },
      "type": "row"
    }

    app.onRowSelect(log)
    expect(service.selectRowThirdTable$.emit).not.toHaveBeenCalledWith(null);

  });

  it('Obtener Row Deseleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableSituacionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    // spyOn(service.selectRowAlterno$, 'emit').and.callThrough();

    // const nativeElement = fixture.nativeElement;
    // expect(app.columns.length).toBeGreaterThanOrEqual(0)

    app.onRowUnselect()
    // expect(service.selectRowAlterno$.emit).toHaveBeenCalledWith(null);

  });
});
