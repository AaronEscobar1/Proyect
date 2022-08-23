import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { NivelesExcepcionHomeComponent } from './pages/niveles-excepcion-home/niveles-excepcion-home.component';

const routes: Routes = [
  {
    path: '', component: NivelesExcepcionHomeComponent
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
export class NivelesExcepcionRoutingModule { }
