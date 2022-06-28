import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ProfesionesComponent } from './pages/profesiones/profesiones.component';


const routes: Routes = [
  {
    path: '', component: ProfesionesComponent
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
export class ProfesionesRoutingModule { }
