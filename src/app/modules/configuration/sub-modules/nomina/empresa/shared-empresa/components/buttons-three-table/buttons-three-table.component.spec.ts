import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { CompanyNominaService } from '../../services/company-nomina.service';

import { ButtonsThreeTableComponent } from './buttons-three-table.component';

describe('ButtonsComponent', () => {
  let httpTestingController: HttpTestingController;

  let service: CompanyNominaService;

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        ButtonsThreeTableComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CompanyNominaService);
  }));

  it('Crear componente de Niveles Educativos Buttons Component correctamente', () => {
    const fixture = TestBed.createComponent(ButtonsThreeTableComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.detectChanges();
  })
  it('edit Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(ButtonsThreeTableComponent);
    const app = fixture.componentInstance;
    

    app.selectRow = {
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
    
    app.editSelectRow()

    fixture.detectChanges()
  });
  it('delete Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(ButtonsThreeTableComponent);
    const app = fixture.componentInstance;
    

    app.selectRow = {
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
    
    app.deleteRow()

    fixture.detectChanges()
  });
  it('refresh', () => {
    const fixture = TestBed.createComponent(ButtonsThreeTableComponent);
    const app = fixture.componentInstance;
        
    app.refresh()

    fixture.detectChanges() 
  });
  it('print', () => {
    const fixture = TestBed.createComponent(ButtonsThreeTableComponent);
    const app = fixture.componentInstance;
        
    app.openModalPrint()

    fixture.detectChanges()
  });
  it('add', () => {
    const fixture = TestBed.createComponent(ButtonsThreeTableComponent);
    const app = fixture.componentInstance;
        
    app.openModalCreate()

    fixture.detectChanges()
  });
  it('ngOnInit row', inject([CompanyNominaService], (service: CompanyNominaService) => {
    const fixture = TestBed.createComponent(ButtonsThreeTableComponent);
    const app = fixture.componentInstance;
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

    fixture.detectChanges()
    
    spyOn(service.selectRowThirdTable$, 'emit').and.callThrough();
    
    app.ngOnInit();
    
    service.selectRowThirdTable$.emit(log.data);
    const response = service.selectRowThirdTable$.subscribe(row => app.selectRow = row);

    expect(service.selectRowThirdTable$.emit).not.toHaveBeenCalledWith(null);
    
  }));

});
