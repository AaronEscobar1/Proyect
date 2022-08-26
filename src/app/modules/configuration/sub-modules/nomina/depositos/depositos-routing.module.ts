import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tipo-instituciones',
    // LazyLoad
    loadChildren: () => import('./tipo-instituciones-deposito/tipo-instituciones-deposito.module').then( m => m.TipoInstitucionesDepositoModule),
  },
  {
    path: 'tipo-cuenta',
    // LazyLoad
    loadChildren: () => import('./tipo-cuenta/tipo-cuenta.module').then( m => m.TipoCuentaModule),
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
export class DepositosRoutingModule { }
