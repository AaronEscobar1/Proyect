import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SituacionHomeComponent } from './pages/situacion-home/situacion-home.component';

const routes: Routes = [
  {
    path: '', component: SituacionHomeComponent
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
export class SituacionRoutingModule { }
