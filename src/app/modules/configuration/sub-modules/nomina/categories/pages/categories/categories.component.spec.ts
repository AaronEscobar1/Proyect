import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { By } from '@angular/platform-browser';

// Servicios y componentes requeridos
import { environment } from 'src/environments/environment';
import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {

  let httpTestingController: HttpTestingController;

  const routes: Routes = [{ path: '', children: [ { path: 'login', component: CategoriesComponent }, { path: '**', redirectTo: 'login' }]} ];

  beforeEach( waitForAsync  (() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        CategoriesComponent
      ]
    }).compileComponents();
    
    // Peticiones mock
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  it('Crear componente de Categories correctamente', () => {
    const fixture = TestBed.createComponent(CategoriesComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Inicializar el componente', async () => {
    const fixture = TestBed.createComponent(CategoriesComponent);
    const app = fixture.componentInstance;
    expect(app.categories.length).toBe(0);
    expect(app.typesFile.length).toBe(0);
    app.ngOnInit();
    await app.loadData();
    expect(app.categories.length).toBeGreaterThanOrEqual(1);
    expect(app.typesFile.length).toBeGreaterThanOrEqual(1);
    fixture.detectChanges();
  });

  it('Validando Refrescar', async () => {
    const fixture = TestBed.createComponent(CategoriesComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de carga despues del boton 
    app.refresh();
    expect(app.categories.length).toBe(0);
    await app.loadData();
    fixture.detectChanges();
    expect(app.categories.length).toBeGreaterThan(0);
  
  })

  it('Abrir modal de impresion', async () => {
    const fixture = TestBed.createComponent(CategoriesComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printModal).toBeFalse();
    app.openModalPrint();
    fixture.detectChanges();
    expect(app.printModal).toBeTrue();  
  })

  it('Abrir modal de Crear Categoria', async () => {
    const fixture = TestBed.createComponent(CategoriesComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de Creacion 
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.createModal).toBeTrue();  
  })

  it('Cerrar Modal Imprimir', async () => {
    const fixture = TestBed.createComponent(CategoriesComponent);
    const app = fixture.componentInstance;

    // Simulamos el proceso de abrir el modal de impresion 
    expect(app.printModal).toBeFalse();
    app.openModalPrint();
    expect(app.printModal).toBeTrue();
    fixture.detectChanges();

    // Simulamos el proceso de cerrar modal print  
    app.printModal = false;    
    expect(app.printModal).toBeFalse();
    
    expect(app.createModal).toBeFalse();
    app.openModalCreate();
    fixture.detectChanges();
    expect(app.createModal).toBeTrue();
    
  })

});
