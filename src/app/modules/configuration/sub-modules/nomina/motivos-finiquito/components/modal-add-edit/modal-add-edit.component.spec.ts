import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MotivosFiniquitoService } from '../../services/motivos-finiquito.service';

import { ModalAddEditComponent } from './modal-add-edit.component';
import { environment } from 'src/environments/environment';


describe('ModalAddEditComponent', () => {
  let httpTestingController: HttpTestingController;

  const URL = `${environment.api}/motivosfiniquito`;

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
    app.isEdit = false; 

    app.ngOnChanges()
    
    // Validamos los datos del formulario vacio

    expect(app.form.value.desde1).toEqual('')
    expect(app.form.value.desde2).toEqual('')
    expect(app.form.value.impliq).toEqual(false)
    expect(app.form.value.classo).toEqual('')
    expect(app.form.value.coddes).toEqual('')
    
    // Validamos el requiere de los campos
    
    expect(app.form.valid).toEqual(false)

    // validamos que no exista el nivelSelect

    expect(app.motivoSelect).toEqual(undefined);
  
  });
  
  it('Inicializar el componente Forma de Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Seteamos los datos que irian en el input
    app.isEdit = true; 
    app.motivosFiniquito = [
      {
        "desde1": "motivo de finiquito",
        "desde2": "motivo de finiquito",
        "impliq": "1",
        "classo": "1",
        "coddes": "1"
      }
    ];
    app.motivoSelect = {
      "desde1": "motivo de finiquito",
      "desde2": "motivo de finiquito",
      "impliq": "1",
      "classo": "1",
      "coddes": "1"
    };
    // Se simula que hubo un cambio en los inputs
    app.ngOnChanges();
    // Validacion
    expect(app.form.value.desde1).toEqual("motivo de finiquito")
    expect(app.form.value.desde2).toEqual("motivo de finiquito")
    expect(app.form.value.impliq).toEqual(true)
    expect(app.form.value.classo).toEqual("1")
    expect(app.form.value.coddes).toEqual(undefined)
  });

  it('Cerrando modal de Crear-Editar', () => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Llamamos al close modal para resetear todo
    app.closeModal()
    expect(app.form.value.desde1).toEqual(null)
    expect(app.form.value.desde2).toEqual(null)
    expect(app.form.value.impliq).toEqual(null)
    expect(app.form.value.classo).toEqual(null)
    expect(app.form.value.coddes).toEqual(null)
    expect(app.form.valid).toEqual(false)
    expect(app.motivoSelect).toEqual(undefined);
  });

  it('Probando el Guardado de Datos', inject([MotivosFiniquitoService], (service: MotivosFiniquitoService) => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = false;
    app.motivosFiniquito = [
      {
        "desde1": "motivo de finiquito",
        "desde2": "motivo de finiquito",
        "impliq": "1",
        "classo": "1",
        "coddes": "1"
      }
    ];
    // datos del formulario
    const data = {
      "desde1": "motivo de finiquito new",
      "desde2": "motivo de finiquito new",
      "impliq": "4",
      "classo": "4",
      "coddes": "4"
  };

    const resp = {"message":"Nivel Educativo creado."}
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.setValue(data)
    expect(app.form.valid).toEqual(true)

    const response = service.create(data).subscribe();
    const fakeBackend = httpTestingController.expectOne(`${URL}`);
    fakeBackend.flush(resp);
    expect(fakeBackend.request.method).toBe('POST');
    // Llamamos a la funcion de Guardado
    app.save()

    app.closeModal();
    // Reset hecho por la funcion
    expect(app.form.value.desde1).toEqual(null)
    expect(app.form.value.desde2).toEqual(null)
    expect(app.form.value.impliq).toEqual(null)
    expect(app.form.value.classo).toEqual(null)
    expect(app.form.value.coddes).toEqual(null)
  }));

  it('Probando el Editado de Datos', inject([MotivosFiniquitoService], (service: MotivosFiniquitoService) => {
    const fixture = TestBed.createComponent(ModalAddEditComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // Variables de los inputs
    app.isEdit = true;
    app.motivosFiniquito = [
      {
        "desde1": "motivo de finiquito",
        "desde2": "motivo de finiquito",
        "impliq": "1",
        "classo": "1",
        "coddes": "1"
      }
    ];
    // datos del formulario
    app.motivoSelect = {
      "desde1": "motivo de finiquito new",
      "desde2": "motivo de finiquito new",
      "impliq": "4",
      "classo": "4",
      "coddes": "4"
    };
    // Guardamos los datos en el formulario y lo comprobamos
    app.form.value.coddes = app.motivoSelect.coddes
    app.form.value.desde1 = app.motivoSelect.desde1
    app.form.value.desde2 = app.motivoSelect.desde2 
    app.form.value.impliq = app.motivoSelect.impliq 
    app.form.value.classo = app.motivoSelect.classo 

    expect(app.form.valid).toEqual(false)
    // Llamamos a la funcion de Guardado
    app.save()

    const response = service.update(app.motivoSelect).subscribe();
    const fakeBackend = httpTestingController.expectOne(`${URL}/${app.motivoSelect.coddes}`);
    fakeBackend.flush(response);
    expect(fakeBackend.request.method).toBe('PUT');

    // Reset hecho por la funcion
    expect(app.form.value.coddes).toEqual('4')
    expect(app.form.value.desde1).toEqual(app.motivoSelect.desde1)
    expect(app.form.value.desde2).toEqual(app.motivoSelect.desde2)
    expect(app.form.value.impliq).toEqual(app.motivoSelect.impliq)
    expect(app.form.value.classo).toEqual(app.motivoSelect.classo)
    
  }));
});
