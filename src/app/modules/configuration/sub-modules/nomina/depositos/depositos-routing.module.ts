import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tipo-instituciones-deposito',
    // LazyLoad
    loadChildren: () => import('./tipo-instituciones-deposito/tipo-instituciones-deposito.module').then( m => m.TipoInstitucionesDepositoModule),
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
