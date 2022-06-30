import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CompetenciasHomeComponent } from './pages/competencias-home/competencias-home.component';

const routes: Routes = [
  {
    path: '', component: CompetenciasHomeComponent
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
