import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CompetenciasComponent } from './pages/competencias/competencias.component';

const routes: Routes = [
  {
    path: '', component: CompetenciasComponent
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
export class CompetenciasRoutingModule { }
