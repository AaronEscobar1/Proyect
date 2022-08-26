import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

import { DataTableGruposComponent } from './data-table-grupos.component';

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
        DataTableGruposComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CompanyNominaService);
    serviceRow = TestBed.inject(SelectRowService);
  }));

  it('Crear componente de Motivos Finiquito DataTable Component correctamente', () => {
    const fixture = TestBed.createComponent(DataTableGruposComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente DataTable', () => {
    const fixture = TestBed.createComponent(DataTableGruposComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(app.columns.length).toBeGreaterThanOrEqual(0)
  });

  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableGruposComponent);
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
    const fixture = TestBed.createComponent(DataTableGruposComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowThirdTable$, 'emit').and.callThrough();

    const nativeElement = fixture.nativeElement;
    expect(app.columns.length).toBeGreaterThanOrEqual(0)

    app.onRowUnselect()
    expect(service.selectRowThirdTable$.emit).toHaveBeenCalledWith(null);

  });

  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableGruposComponent);
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
    const fixture = TestBed.createComponent(DataTableGruposComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowThirdTable$, 'emit').and.callThrough();

    const nativeElement = fixture.nativeElement;
    expect(app.columns.length).toBeGreaterThanOrEqual(0)

    app.onRowUnselect()
    expect(service.selectRowThirdTable$.emit).toHaveBeenCalledWith(null);

  });

  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableGruposComponent);
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
    const fixture = TestBed.createComponent(DataTableGruposComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    // spyOn(service.selectRowAlterno$, 'emit').and.callThrough();

    // const nativeElement = fixture.nativeElement;
    // expect(app.columns.length).toBeGreaterThanOrEqual(0)

    app.onRowUnselect()
    // expect(service.selectRowAlterno$.emit).toHaveBeenCalledWith(null);

  });
});
