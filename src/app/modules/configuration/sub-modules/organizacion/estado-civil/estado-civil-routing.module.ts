import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { EstadoCivilComponent } from './pages/estado-civil/estado-civil.component';

const routes: Routes = [
  {
    path: '', component: EstadoCivilComponent
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
export class EstadoCivilRoutingModule { }
