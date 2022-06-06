import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { RotacionGrupoComponent } from './pages/rotacion-grupo/rotacion-grupo.component';

const routes: Routes = [
  {
    path: '', component: RotacionGrupoComponent
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
export class RotacionGrupoRoutingModule { }
