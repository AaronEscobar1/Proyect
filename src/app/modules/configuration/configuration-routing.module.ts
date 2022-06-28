import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ConfigurationComponent } from './configuration.component';
import { ConfigHomeComponent } from './sub-modules/config-home/config-home.component';

const routes: Routes = [
  {
    path: '', component: ConfigurationComponent,
    children: [
      {
        path: '', component: ConfigHomeComponent
      },
      {
        path: 'basica',
        // LazyLoad
        loadChildren: () => import('./sub-modules/nomina/basica/basica.module').then( m => m.BasicaModule)
      },
      {
        path: 'empresa',
        // LazyLoad
        loadChildren: () => import('./sub-modules/nomina/empresa/empresa.module').then( m => m.EmpresaModule)
      },
      {
        path: 'organizacion',
        // LazyLoad
        loadChildren: () => import('./sub-modules/organizacion/organizacion.module').then( m => m.OrganizacionModule)
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
