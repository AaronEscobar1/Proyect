import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { FormasPagoComponent } from './pages/formas-pago/formas-pago.component';

const routes: Routes = [
  {
    path: '', component: FormasPagoComponent
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
export class FormasPagoRoutingModule { }
