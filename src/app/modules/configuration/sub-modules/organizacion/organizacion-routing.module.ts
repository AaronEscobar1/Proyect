import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tipo-identificacion',
    // LazyLoad
    loadChildren: () => import('./tipo-identificacion/tipo-identificacion.module').then( m => m.TipoIdentificacionModule )
  },
  {
    path: 'estado-civil',
    // LazyLoad
    loadChildren: () => import('./estado-civil/estado-civil.module').then( m => m.EstadoCivilModule )
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
export class OrganizacionRoutingModule { }
