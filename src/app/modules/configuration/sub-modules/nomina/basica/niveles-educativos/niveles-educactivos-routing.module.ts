import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { NivelesEducativosComponent } from './pages/niveles-educativos/niveles-educativos.component';

const routes: Routes = [
  {
    path: '', component: NivelesEducativosComponent
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
export class NivelesEducactivosRoutingModule { }
