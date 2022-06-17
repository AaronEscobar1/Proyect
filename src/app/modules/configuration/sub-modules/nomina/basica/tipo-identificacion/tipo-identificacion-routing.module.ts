import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { TipoIdentificacionComponent } from './pages/tipo-identificacion/tipo-identificacion.component';

const routes: Routes = [
  {
    path: '', component: TipoIdentificacionComponent
  },
  {
    path: '**', redirectTo: ''
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
export class TipoIdentificacionRoutingModule { }
