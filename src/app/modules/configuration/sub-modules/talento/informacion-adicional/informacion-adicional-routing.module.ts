import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { InformacionAdicionalComponent } from './pages/informacion-adicional/informacion-adicional.component';

const routes: Routes = [
  {
    path: '', component: InformacionAdicionalComponent
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
export class InformacionAdicionalRoutingModule { }
