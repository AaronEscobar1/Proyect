import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ClasificacionOficialComponent } from './pages/clasificacion-oficial/clasificacion-oficial.component';

const routes: Routes = [
  {
    path: '', component: ClasificacionOficialComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasificacionOficialRoutingModule { }
