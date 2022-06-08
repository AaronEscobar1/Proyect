import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LocalidadesComponent } from './pages/localidades/localidades.component';

const routes: Routes = [
  {
    path: '', component: LocalidadesComponent
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
export class LocalidadesRoutingModule { }
