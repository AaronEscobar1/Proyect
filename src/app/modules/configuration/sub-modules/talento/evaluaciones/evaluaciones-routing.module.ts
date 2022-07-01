import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { EvaluacionesComponent } from './pages/evaluaciones/evaluaciones.component';

const routes: Routes = [
  {
    path: '', component: EvaluacionesComponent
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
export class EvaluacionesRoutingModule { }
