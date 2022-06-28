import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SindicatosComponent } from './pages/sindicatos/sindicatos.component';

const routes: Routes = [
  {
    path: '', component: SindicatosComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SindicatosRoutingModule { }
