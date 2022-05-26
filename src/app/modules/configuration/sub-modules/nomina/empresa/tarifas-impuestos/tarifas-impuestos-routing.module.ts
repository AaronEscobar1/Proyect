import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { TarifasImpuestosComponent } from './pages/tarifas-impuestos/tarifas-impuestos.component';

const routes: Routes = [
  {
    path: '', component: TarifasImpuestosComponent
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
export class TarifasImpuestosRoutingModule { }
