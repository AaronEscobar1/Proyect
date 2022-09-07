import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tipo-moneda',
    // LazyLoad
    loadChildren: () => import('./tipos-monedas/tipos-monedas.module').then( m => m.TiposMonedasModule),
  },
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
