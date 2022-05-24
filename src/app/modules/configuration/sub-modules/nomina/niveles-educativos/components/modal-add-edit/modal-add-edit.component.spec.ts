import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/niveleseducativos`;

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        ModalAddEditComponent
      ]
    }).compileComponents()
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
  }));


  it('Crear componente de Niveles Educativos Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente Forma de Crear', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Se valida que no haya cambios en el input isEdit

    app.ngOnChanges()
    
    // Validamos los datos del formulario vacio

    expect(app.form.value.codley).toEqual('')
    expect(app.form.value.codniv).toEqual('')
    expect(app.form.value.desniv).toEqual('')
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.nivelSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.niveles = [
      {
        "codniv": "3",
        "desniv": "NuevoNivelEducativo",
        "codley": "CCC"
      },
      {
        "codniv": "1",
        "desniv": "Primaria",
        "codley": "CC"
      },
      {
        "codniv": "2",
        "desniv": "Secundaria",
        "codley": "SES"
      }
    ];
    app.nivelSelect = {
      "codniv": '3',
      "desniv": '123456789123456789123456789',
      "codley": 'CCC'
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.codley).toEqual(app.nivelSelect.codley)
    expect(app.form.value.desniv).toEqual(app.nivelSelect.desniv)
    expect(app.form.valid).toEqual(true)
  });

  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModalAdd()
    expect(app.form.value.codley).toEqual(null)
    expect(app.form.value.codniv).toEqual(null)
    expect(app.form.value.desniv).toEqual(null)
    expect(app.form.valid).toEqual(false)
    expect(app.nivelSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos', inject([NivelesEducativosService], (service: NivelesEducativosService) => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.niveles = [
      {
        "codniv": "3",
        "desniv": "NuevoNivelEducativo",
        "codley": "CCC"
      },
      {
        "codniv": "1",
        "desniv": "Primaria",
        "codley": "CC"
      },
      {
        "codniv": "2",
        "desniv": "Secundaria",
        "codley": "SES"
      }
    ];
    // datos del formulario
    const data = {
      "codniv": '4',
      "desniv": '123456789123456789123456789',
      "codley": 'CCC'
    };

    const resp = {"message":"Nivel Educativo creado."}
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)

    const response = service.createNivel(data).subscribe();
    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('POST');
    // Llamamos a la funcion de Guardado
    app.saveNivel()
  }));

  it('Probando el Editado de Datos', inject([NivelesEducativosService], (service: NivelesEducativosService) => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.niveles = [
      {
        "codniv": "3",
        "desniv": "NuevoNivelEducativo",
        "codley": "CCC"
      },
      {
        "codniv": "1",
        "desniv": "Primaria",
        "codley": "CC"
      },
      {
        "codniv": "2",
        "desniv": "Secundaria",
        "codley": "SES"
      }
    ];
    // datos del formulario
    app.nivelSelect = {
      "codniv": '3',
      "desniv": "1NuevoNivelEducativo",
      "codley": "CCC"
    };
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.value.desniv = app.nivelSelect.desniv
    app.form.value.codley = app.nivelSelect.codley 

    expect(app.form.valid).toEqual(false)
    // Llamamos a la funcion de Guardado
    app.saveNivel()

    const response = service.updateNivel(app.nivelSelect).subscribe();
    const fakeBackend = httpTestingController.expectOne(`${URL}/${app.nivelSelect.codniv}`);
    fakeBackend.flush(response);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.codley).toEqual(app.nivelSelect.codley)
    expect(app.form.value.codniv).toEqual('')
    expect(app.form.value.desniv).toEqual(app.nivelSelect.desniv)
    
  }));
});
