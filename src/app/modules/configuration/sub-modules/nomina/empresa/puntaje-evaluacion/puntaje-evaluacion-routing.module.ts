import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { PuntajeEvaluacionHomeComponent } from './pages/puntaje-evaluacion-home/puntaje-evaluacion-home.component';

const routes: Routes = [
  {
    path: '', component: PuntajeEvaluacionHomeComponent
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
export class PuntajeEvaluacionRoutingModule { }
