import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CentrosMedicosComponent } from './pages/centros-medicos/centros-medicos.component';

const routes: Routes = [
  {
    path: '', component: CentrosMedicosComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentrosMedicosRoutingModule { }
