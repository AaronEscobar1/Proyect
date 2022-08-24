import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { EmpresasComponent } from './pages/empresas/empresas.component';

const routes: Routes = [
  {
    path: '', component: EmpresasComponent
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
export class MotivoHorasExtrasRoutingModule { }
