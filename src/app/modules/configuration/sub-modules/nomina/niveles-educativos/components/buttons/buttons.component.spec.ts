import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';

import { ButtonsComponent } from './buttons.component';

describe('ButtonsComponent', () => {
  let httpTestingController: HttpTestingController;

  let service: NivelesEducativosService;

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
    service = TestBed.inject(NivelesEducativosService);
  }));

  it('Crear componente de Niveles Educativos Buttons Component correctamente', () => {
    const fixture = TestBed.createComponent(ButtonsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })
  it('Obtener Row Seleccionada ', () => {
    const fixture = TestBed.createComponent(ButtonsComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service.selectRow$, 'emit').and.callThrough();

    const nativeElement = fixture.nativeElement;
    console.log(nativeElement);

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

    expect(service.selectRow$.emit).toHaveBeenCalledWith(null);

  });
});
