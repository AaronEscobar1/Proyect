import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ConceptosHomeComponent } from './pages/conceptos-home/conceptos-home.component';

const routes: Routes = [
  {
    path: '', component: ConceptosHomeComponent
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
export class ConceptosRoutingModule { }
