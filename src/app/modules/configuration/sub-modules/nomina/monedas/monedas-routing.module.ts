import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tipo-moneda',
    // LazyLoad
    loadChildren: () => import('./tipos-monedas/tipos-monedas.module').then( m => m.TiposMonedasModule),
  },
  {
    path: 'denominacion',
    // LazyLoad
    loadChildren: () => import('./denominacion/denominacion.module').then( m => m.DenominacionModule),
  },
  {
    path: 'factor',
    // LazyLoad
    loadChildren: () => import('./factor/factor.module').then( m => m.FactorModule),
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
export class MonedasRoutingModule { }
