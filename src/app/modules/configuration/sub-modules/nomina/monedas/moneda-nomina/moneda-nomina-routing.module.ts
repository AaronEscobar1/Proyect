import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MonedaNominaHomeComponent } from './pages/moneda-nomina-home/moneda-nomina-home.component';

const routes: Routes = [
  {
    path: '', component: MonedaNominaHomeComponent
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
export class MonedaNominaRoutingModule { }
