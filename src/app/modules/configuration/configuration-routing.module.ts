import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ConfigurationComponent } from './configuration.component';
import { ConfigHomeComponent } from './pages/config-home/config-home.component';
import { NivelesEducativosComponent } from './pages/nomina/niveles-educativos/niveles-educativos.component';

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
