import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ValoresOficialesComponent } from './pages/valores-oficiales/valores-oficiales.component';

const routes: Routes = [
  {
    path: '', component: ValoresOficialesComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValoresOficialesRoutingModule { }
