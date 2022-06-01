import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DistribucionNominaComponent } from './pages/distribucion-nomina/distribucion-nomina.component';

const routes: Routes = [
  {
    path: '', component: DistribucionNominaComponent
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
export class DistribucionNominaRoutingModule { }
