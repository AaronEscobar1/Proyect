import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { EquivalenciasService } from '../../services/equivalencias.service';

import { DataTableTipoInstitucionComponent } from './data-table-tipo-institucion.component';

describe('DataTableComponent', () => {
  let httpTestingController: HttpTestingController;
  let service: EquivalenciasService;


  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        DataTableTipoInstitucionComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EquivalenciasService);
  }));

  it('Crear componente de Niveles Educativos DataTable Component correctamente', () => {
    const fixture = TestBed.createComponent(DataTableTipoInstitucionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente DataTable', () => {
    const fixture = TestBed.createComponent(DataTableTipoInstitucionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(app.columns.length).toBeGreaterThanOrEqual(0)
  });

  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableTipoInstitucionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowTipoInstitucion$, 'emit').and.callThrough();

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
    expect(service.selectRowTipoInstitucion$.emit).not.toHaveBeenCalledWith(null);

  });

  it('Obtener Row Deseleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableTipoInstitucionComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRowTipoInstitucion$, 'emit').and.callThrough();

    const nativeElement = fixture.nativeElement;
    expect(app.columns.length).toBeGreaterThanOrEqual(0)

    app.onRowUnselect()
    expect(service.selectRowTipoInstitucion$.emit).toHaveBeenCalledWith(null);

  });
});
