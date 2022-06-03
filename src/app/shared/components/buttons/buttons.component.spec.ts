import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { SelectRowService } from '../../services/select-row/select-row.service';

import { ButtonsComponent } from './buttons.component';

describe('ButtonsComponent', () => {
  let httpTestingController: HttpTestingController;

  let service: SelectRowService;

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        ButtonsComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SelectRowService);
  }));

  it('Crear componente de Niveles Educativos Buttons Component correctamente', () => {
    const fixture = TestBed.createComponent(ButtonsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.detectChanges();
  })
  it('edit Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(ButtonsComponent);
    const app = fixture.componentInstance;
    
    spyOn(app.onEditRow, 'emit').and.callThrough();

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
    
    const nativeElement = fixture.debugElement.nativeElement.querySelector('#edit');;
    nativeElement.dispatchEvent(new Event('click'));    
    
    fixture.detectChanges();
    
    expect(app.onEditRow.emit).toHaveBeenCalledWith(app.selectRow);
    fixture.detectChanges();
  });
  it('delete Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(ButtonsComponent);
    const app = fixture.componentInstance;
    
    spyOn(app.onDeleteRow, 'emit').and.callThrough();

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
    
    const nativeElement = fixture.debugElement.nativeElement.querySelector('#delete');;
    nativeElement.dispatchEvent(new Event('click'));    
    
    fixture.detectChanges();
    
    expect(app.onDeleteRow.emit).toHaveBeenCalledWith(app.selectRow);
  });
  it('refresh', () => {
    const fixture = TestBed.createComponent(ButtonsComponent);
    const app = fixture.componentInstance;
    
    spyOn(app.onRefresh, 'emit').and.callThrough();
    
    const nativeElement = fixture.debugElement.nativeElement.querySelector('#refresh');;
    nativeElement.dispatchEvent(new Event('click')); 
    fixture.detectChanges();   
  });
  it('print', () => {
    const fixture = TestBed.createComponent(ButtonsComponent);
    const app = fixture.componentInstance;
    
    spyOn(app.onRefresh, 'emit').and.callThrough();
    
    const nativeElement = fixture.debugElement.nativeElement.querySelector('#print');;
    nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();    
  });
  it('add', () => {
    const fixture = TestBed.createComponent(ButtonsComponent);
    const app = fixture.componentInstance;
    
    spyOn(app.onRefresh, 'emit').and.callThrough();
    
    const nativeElement = fixture.debugElement.nativeElement.querySelector('#add');;
    nativeElement.dispatchEvent(new Event('click'));    
    fixture.detectChanges();
  });
  it('ngOnInit row', inject([SelectRowService], (service: SelectRowService) => {
    const fixture = TestBed.createComponent(ButtonsComponent);
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

    spyOn(service.selectRow$, 'emit').and.callThrough();
    
    app.ngOnInit();
    
    service.selectRow$.emit(log.data);
    const response = service.selectRow$.subscribe(row => app.selectRow = row);

    expect(service.selectRow$.emit).not.toHaveBeenCalledWith(null);
    
  }));

});
