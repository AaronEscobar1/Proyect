import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { GrupoTrabajoComponent } from './pages/grupo-trabajo/grupo-trabajo.component';

const routes: Routes = [
  {
    path: '', component: GrupoTrabajoComponent
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
