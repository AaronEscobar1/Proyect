import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { TipoMonedaComponent } from './pages/tipo-moneda/tipo-moneda.component';

const routes: Routes = [
  {
    path: '', component: TipoMonedaComponent
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
export class TiposMonedasRoutingModule { }
