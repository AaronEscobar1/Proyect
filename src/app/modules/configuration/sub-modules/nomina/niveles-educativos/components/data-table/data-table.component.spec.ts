import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NivelesEducativos } from '../../interfaces/niveles-educativos.interfaces';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';

import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let httpTestingController: HttpTestingController;
  let service: NivelesEducativosService;


  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        DataTableComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(NivelesEducativosService);
  }));

  it('Crear componente de Niveles Educativos DataTable Component correctamente', () => {
    const fixture = TestBed.createComponent(DataTableComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente DataTable', () => {
    const fixture = TestBed.createComponent(DataTableComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(app.columns.length).toBeGreaterThanOrEqual(0)
  });

  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(DataTableComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRow$, 'emit').and.callThrough();

    const nativeElement = fixture.nativeElement;
    console.log(nativeElement);
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
    const fixture = TestBed.createComponent(DataTableComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRow$, 'emit').and.callThrough();

    const nativeElement = fixture.nativeElement;
    console.log(nativeElement);
    expect(app.columns.length).toBeGreaterThanOrEqual(0)

    app.onRowUnselect()
    expect(service.selectRow$.emit).toHaveBeenCalledWith(null);

  });
});
