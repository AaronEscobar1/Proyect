import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { TipoCuentaComponent } from './pages/tipo-cuenta/tipo-cuenta.component';

const routes: Routes = [
  {
    path: '', component: TipoCuentaComponent
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
export class TipoCuentaRoutingModule { }
