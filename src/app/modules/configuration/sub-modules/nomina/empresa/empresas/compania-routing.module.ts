import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CompaniaComponent } from './pages/compania/compania.component';

const routes: Routes = [
  {
    path: '', component: CompaniaComponent
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
export class CompaniaRoutingModule { }
