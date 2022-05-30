import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { NominasComponent } from './pages/nominas/nominas.component';

const routes: Routes = [
  {
    path: '', component: NominasComponent
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
export class NominasRoutingModule { }
