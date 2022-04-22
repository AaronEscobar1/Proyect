import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { By } from '@angular/platform-browser';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { NivelesEducativosComponent } from './niveles-educativos.component';

describe('NivelesEducativosComponent', () => {

  let httpTestingController: HttpTestingController;

  const routes: Routes = [{ path: '', children: [ { path: 'login', component: NivelesEducativosComponent }, { path: '**', redirectTo: 'login' }]} ];

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        NivelesEducativosComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  it('Crear componente de Niveles Educativos correctamente', () => {
    const fixture = TestBed.createComponent(NivelesEducativosComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

//   it('Inicializar el componente', () => {
//     const fixture = TestBed.createComponent(NivelesEducativosComponent);
//     const app = fixture.componentInstance;
//     expect(app.niveles.length).toBe(0);
//     expect(app.typesFile.length).toBe(0);
//     app.ngOnInit();
//     app.loadData();
//     expect(app.niveles.length).toBeGreaterThanOrEqual(1);
//     expect(app.typesFile.length).toBeGreaterThanOrEqual(1);
//     fixture.detectChanges();
//   });

//   it('Validando Refrescar', async () => {
//     const fixture = TestBed.createComponent(CategoriesComponent);
//     const app = fixture.componentInstance;

//     // Simulamos el proceso de carga despues del boton 
//     app.refresh();
//     expect(app.categories.length).toBe(0);
//     await app.loadData();
//     fixture.detectChanges();
//     expect(app.categories.length).toBeGreaterThan(0);
  
//   })

//   it('Abrir modal de impresion', async () => {
//     const fixture = TestBed.createComponent(CategoriesComponent);
//     const app = fixture.componentInstance;

//     // Simulamos el proceso de abrir el modal de impresion 
//     expect(app.printModal).toBeFalse();
//     app.openModalPrint();
//     fixture.detectChanges();
//     expect(app.printModal).toBeTrue();  
//   })

//   it('Abrir modal de Crear Categoria', async () => {
//     const fixture = TestBed.createComponent(CategoriesComponent);
//     const app = fixture.componentInstance;

//     // Simulamos el proceso de abrir el modal de Creacion 
//     expect(app.createModal).toBeFalse();
//     app.openModalCreate();
//     fixture.detectChanges();
//     expect(app.createModal).toBeTrue();  
//   })

//   it('Cerrar Modal Imprimir', async () => {
//     const fixture = TestBed.createComponent(CategoriesComponent);
//     const app = fixture.componentInstance;

//     // Simulamos el proceso de abrir el modal de impresion 
//     expect(app.printModal).toBeFalse();
//     app.openModalPrint();
//     expect(app.printModal).toBeTrue();
//     fixture.detectChanges();

//     // Simulamos el proceso de cerrar modal print  
//     app.printModal = false;    
//     expect(app.printModal).toBeFalse();
    
//     expect(app.createModal).toBeFalse();
//     app.openModalCreate();
//     fixture.detectChanges();
//     expect(app.createModal).toBeTrue();
    
//   })

});
