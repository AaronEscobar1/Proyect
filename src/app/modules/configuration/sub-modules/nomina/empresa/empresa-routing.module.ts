import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'compania',
    // LazyLoad
    loadChildren: () => import('./empresas/compania.module').then( m => m.CompaniaModule),
  },
  {
    path: 'empresa-consultar/tarifas',
    // LazyLoad
    loadChildren: () => import('./tarifas-impuestos/tarifas-impuestos.module').then( m => m.TarifasImpuestosModule),
  },
  {
    path: 'nominas',
    // LazyLoad
    loadChildren: () => import('./nominas/nominas.module').then( m => m.NominasModule),
  },
  {
    path: 'distribucion-nomina',
    // LazyLoad
    loadChildren: () => import('./distribucion-nomina/distribucion-nomina.module').then( m => m.DistribucionNominaModule),
  },
  {
    path: 'grupos-trabajo',
    // LazyLoad
    loadChildren: () => import('./grupo-trabajo/grupo-trabajo.module').then( m => m.GrupoTrabajoModule),
  },
  {
    path: 'centro-trabajo',
    // LazyLoad
    loadChildren: () => import('./centro-trabajo/centro-trabajo.module').then( m => m.CentroTrabajoModule),
  },
  {
    path: 'puntaje-evaluacion',
    // LazyLoad
    loadChildren: () => import('./puntaje-evaluacion/puntaje-evaluacion.module').then( m => m.PuntajeEvaluacionModule),
  },
  {
    path: 'situacion',
    // LazyLoad
    loadChildren: () => import('./situacion/situacion.module').then( m => m.SituacionModule),
  },
  {
    path: 'tipos-sueldos',
    // LazyLoad
    loadChildren: () => import('./tipo-sueldo/tipo-sueldo.module').then( m => m.TipoSueldoModule),
  },
  {
    path: 'niveles-excepcion',
    // LazyLoad
    loadChildren: () => import('./niveles-excepcion/niveles-excepcion.module').then( m => m.NivelesExcepcionModule),
  },
  {
    path: 'motivo-horas-extras',
    // LazyLoad
    loadChildren: () => import('./motivo-horas-extras/motivo-horas-extras.module').then( m => m.MotivoHorasExtrasModule),
  },
  {
    path: 'localidades',
    // LazyLoad
    loadChildren: () => import('./localidades/localidades.module').then( m => m.LocalidadesModule),
  },
  {
    path: 'clase-informacion',
    // LazyLoad
    loadChildren: () => import('./clase-informacion/clase-informacion.module').then( m => m.ClaseInformacionModule),
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
export class EmpresaRoutingModule { }
