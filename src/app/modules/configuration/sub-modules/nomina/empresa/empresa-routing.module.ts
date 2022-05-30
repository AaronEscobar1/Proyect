import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'empresa',
    // LazyLoad
    loadChildren: () => import('./empresa/empresa.module').then( m => m.EmpresaModule),
  },
  {
    path: 'empresa-consultar/tarifas',
    // LazyLoad
    loadChildren: () => import('./tarifas-impuestos/tarifas-impuestos.module').then( m => m.TarifasImpuestosModule),
  },
  {
    path: 'localidades',
    // LazyLoad
    loadChildren: () => import('./localidades/localidades.module').then( m => m.LocalidadesModule),
  },
  {
    path: 'nominas',
    // LazyLoad
    loadChildren: () => import('./nominas/nominas.module').then( m => m.NominasModule),
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
