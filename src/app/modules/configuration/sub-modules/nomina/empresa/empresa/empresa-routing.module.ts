import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { EmpresaComponent } from './pages/empresa/empresa.component';

const routes: Routes = [
  {
    path: '', component: EmpresaComponent
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
export class EmpresaRoutingModule { }
