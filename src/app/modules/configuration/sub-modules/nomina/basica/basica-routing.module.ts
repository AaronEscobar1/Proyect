import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'niveles-educativos',
    // LazyLoad
    loadChildren: () => import('./niveles-educativos/niveles-educactivos.module').then( m => m.NivelesEducactivosModule),
  },
  {
    path: 'profesiones',
    // LazyLoad
    loadChildren: () => import('./profesiones/profesiones.module').then( m => m.ProfesionesModule),
  },
  {
    path: 'formas-pago',
    // LazyLoad
    loadChildren: () => import('./formas-pago/formas-pago.module').then( m => m.FormasPagoModule),
  },
  {
    path: 'motivos-finiquito',
    // LazyLoad
    loadChildren: () => import('./motivos-finiquito/motivos-finiquito.module').then( m => m.MotivosFiniquitoModule),
  },
  {
    path: 'procesos',
    // LazyLoad
    loadChildren: () => import('./procesos/procesos.module').then( m => m.ProcesosModule),
  },
  {
    path: 'categories',
    // LazyLoad
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesModule),
  },
  {
    path: 'centros-medicos',
    // LazyLoad
    loadChildren: () => import('./centros-medicos/centros-medicos.module').then( m => m.CentrosMedicosModule),
  },
  {
    path: 'valor-oficial',
    // LazyLoad
    loadChildren: () => import('./valores-oficiales/valores-oficiales.module').then( m => m.ValoresOficialesModule),
  },
  {
    path: '**', redirectTo: '/main/config'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BasicaRoutingModule { }
