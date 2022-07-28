import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { GrupoTrabajoHomeComponent } from './pages/grupo-trabajo-home/grupo-trabajo-home.component';

const routes: Routes = [
  {
    path: '', component: GrupoTrabajoHomeComponent
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
export class GrupoTrabajoRoutingModule { }
