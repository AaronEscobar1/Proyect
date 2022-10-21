import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'conceptos',
    // LazyLoad
    loadChildren: () => import('./conceptos/conceptos.module').then( m => m.ConceptosModule),
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
export class FormulacionRoutingModule { }
