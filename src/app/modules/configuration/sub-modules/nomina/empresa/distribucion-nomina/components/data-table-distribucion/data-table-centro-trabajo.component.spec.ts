import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

import { DataTableDistribucionComponent } from './data-table-distribucion.component';

describe('DataTableComponent', () => {
  let httpTestingController: HttpTestingController;
  let service: SelectRowService;

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        DataTableDistribucionComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SelectRowService);
  }));

  it('Crear componente de Motivos Finiquito DataTable Component correctamente', () => {
    const fixture = TestBed.createComponent(DataTableDistribucionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente DataTable', () => {
    const fixture = TestBed.createComponent(DataTableDistribucionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(app.columns.length).toBeGreaterThanOrEqual(0)
  });

  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableDistribucionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRow$, 'emit').and.callThrough();

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
    expect(service.selectRow$.emit).not.toHaveBeenCalledWith(null);

  });

  it('Obtener Row Deseleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableDistribucionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRow$, 'emit').and.callThrough();

    const nativeElement = fixture.nativeElement;
    expect(app.columns.length).toBeGreaterThanOrEqual(0)

    app.onRowUnselect()
  });

  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableDistribucionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowAlterno$, 'emit').and.callThrough();

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
    expect(service.selectRowAlterno$.emit).not.toHaveBeenCalledWith(null);

  });

  it('Obtener Row Deseleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableDistribucionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowAlterno$, 'emit').and.callThrough();

    const nativeElement = fixture.nativeElement;
    expect(app.columns.length).toBeGreaterThanOrEqual(0)

    app.onRowUnselect()
    expect(service.selectRowAlterno$.emit).toHaveBeenCalledWith(null);

  });

  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableDistribucionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowAlterno$, 'emit').and.callThrough();

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
    expect(service.selectRowAlterno$.emit).not.toHaveBeenCalledWith(null);

  });

  it('Obtener Row Deseleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableDistribucionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    // spyOn(service.selectRowAlterno$, 'emit').and.callThrough();

    // const nativeElement = fixture.nativeElement;
    // expect(app.columns.length).toBeGreaterThanOrEqual(0)

    app.onRowUnselect()
    // expect(service.selectRowAlterno$.emit).toHaveBeenCalledWith(null);

  });
});
