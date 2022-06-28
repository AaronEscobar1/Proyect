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
      // TODO: reemplazar todo cuando se pasen los modulos a la carpeta Basica
      {
        path: 'basica-deprecated', 
        // TODO: Pasar todas estas rutas y carpetas al módulo Basico
        children: [
          
          {
            path: 'clasificacion-oficial',
            // LazyLoad
            loadChildren: () => import('./sub-modules/nomina/clasificacion-oficial/clasificacion-oficial.module').then( m => m.ClasificacionOficialModule),
          },
          
          {
            path: 'sindicatos',
            // LazyLoad
            loadChildren: () => import('./sub-modules/nomina/sindicatos/sindicatos.module').then( m => m.SindicatosModule),
          },
        ]
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
