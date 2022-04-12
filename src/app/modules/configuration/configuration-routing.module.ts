import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ConfigurationComponent } from './configuration.component';
import { ConfigHomeComponent } from './sub-modules/config-home/config-home.component';

const routes: Routes = [
  {
    path: '', component: ConfigurationComponent,
    children: [
      {
        path: '', component: ConfigHomeComponent
      },
      {
        path: 'niveles-educativos',
        // LazyLoad
        loadChildren: () => import('./sub-modules/nomina/niveles-educativos/niveles-educactivos.module').then( m => m.NivelesEducactivosModule),
      },
      {
        path: 'profesiones',
        // LazyLoad
        loadChildren: () => import('./sub-modules/nomina/profesiones/profesiones.module').then( m => m.ProfesionesModule),
      },
      {
        path: 'formas-pago',
        // LazyLoad
        loadChildren: () => import('./sub-modules/nomina/formas-pago/formas-pago.module').then( m => m.FormasPagoModule),
      },
      {
        path: 'motivos-finiquito',
        // LazyLoad
        loadChildren: () => import('./sub-modules/nomina/motivos-finiquito/motivos-finiquito.module').then( m => m.MotivosFiniquitoModule),
      },
      {
        path: 'procesos',
        // LazyLoad
        loadChildren: () => import('./sub-modules/nomina/procesos/procesos.module').then( m => m.ProcesosModule),
      },
      {
        path: 'categories',
        // LazyLoad
        loadChildren: () => import('./sub-modules/nomina/categories/categories.module').then( m => m.CategoriesModule),
      },
      {
        path: 'centros-medicos',
        // LazyLoad
        loadChildren: () => import('./sub-modules/nomina/centros-medicos/centros-medicos.module').then( m => m.CentrosMedicosModule),
      },
      {
        path: '**', redirectTo: ''
      }
    ]
  },
  {
    path: '**', redirectTo: ''
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
export class ConfigurationRoutingModule { }
