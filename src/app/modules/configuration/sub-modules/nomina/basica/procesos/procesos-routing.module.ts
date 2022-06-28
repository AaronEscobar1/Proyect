import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ProcesosComponent } from './pages/procesos/procesos.component';

const routes: Routes = [
  {
    path: '', component: ProcesosComponent
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
export class ProcesosRoutingModule { }
