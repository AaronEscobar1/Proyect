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
