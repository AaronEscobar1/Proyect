import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MotivosCambiosComponent } from './pages/motivos-cambios/motivos-cambios.component';

const routes: Routes = [
  {
    path: '', component: MotivosCambiosComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)]
    ,
  exports: [
    RouterModule
  ]
})
export class MotivosCambiosRoutingModule { }
