import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { OrganismosPublicosComponent } from './pages/organismos-publicos/organismos-publicos.component';

const routes: Routes = [
  {
    path: '', component: OrganismosPublicosComponent
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
export class OrganismosPublicosRoutingModule { }
