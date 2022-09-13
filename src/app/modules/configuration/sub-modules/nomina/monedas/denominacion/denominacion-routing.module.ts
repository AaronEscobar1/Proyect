import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DenominacionHomeComponent } from './pages/denominacion-home/denominacion-home.component';

const routes: Routes = [
  {
    path: '', component: DenominacionHomeComponent
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
export class DenominacionRoutingModule { }
