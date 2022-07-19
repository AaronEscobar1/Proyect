import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { EntrevistaHomeComponent } from './pages/entrevista-home/entrevista-home.component';

const routes: Routes = [
  {
    path: '', component: EntrevistaHomeComponent
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
export class EntrevistaRoutingModule { }
