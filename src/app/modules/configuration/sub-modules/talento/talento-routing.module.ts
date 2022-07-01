import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'parentesco',
    // LazyLoad
    loadChildren: () => import('./parentesco/parentesco.module').then( m => m.ParentescoModule )
  },
  {
    path: 'competencias',
    // LazyLoad
    loadChildren: () => import('./competencias/competencias.module').then( m => m.CompetenciasModule )
  },
  {
    path: 'evaluaciones',
    // LazyLoad
    loadChildren: () => import('./evaluaciones/evaluaciones.module').then( m => m.EvaluacionesModule )
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
export class TalentoRoutingModule { }
