import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ConfigurationComponent } from './configuration.component';
import { ConfigHomeComponent } from './sub-modules/config-home/config-home.component';
import { NivelesEducativosComponent } from './sub-modules/nomina/niveles-educativos/pages/niveles-educativos/niveles-educativos.component';
import { ProfesionesComponent } from './sub-modules/nomina/profesiones/pages/profesiones/profesiones.component';

const routes: Routes = [
  {
    path: '', component: ConfigurationComponent,
    children: [
      {
        path: '', component: ConfigHomeComponent
      },
      {
        path: 'niveles-educativos', component: NivelesEducativosComponent
      },
      {
        path: 'profesiones', component: ProfesionesComponent
      },
      {
        path: '**', redirectTo: ''
      }
    ]
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
export class ConfigurationRoutingModule { }
