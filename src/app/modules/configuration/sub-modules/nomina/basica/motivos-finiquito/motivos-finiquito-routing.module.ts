import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MotivosFiniquitoComponent } from './pages/motivos-finiquito/motivos-finiquito.component';

const routes: Routes = [
  {
    path: '', component: MotivosFiniquitoComponent
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
export class MotivosFiniquitoRoutingModule { }
