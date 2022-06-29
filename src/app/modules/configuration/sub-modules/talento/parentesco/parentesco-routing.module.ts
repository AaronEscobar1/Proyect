import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ParentescoComponent } from './pages/parentesco/parentesco.component';

const routes: Routes = [
  {
    path: '', component: ParentescoComponent
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
export class ParentescoRoutingModule { }
