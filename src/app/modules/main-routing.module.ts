import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MainComponent } from './main.component';
import { SecurityComponent } from './security/security.component';
import { TalentComponent } from './talent/talent.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'archive',
        // LazyLoad
        loadChildren: () => import('./archive/archive.module').then( m => m.ArchiveModule)
      },
      {
        path: 'config',
        // LazyLoad
        loadChildren: () => import('./configuration/configuration.module').then( m => m.ConfigurationModule)
      },
      {
        path: 'mail',
        // LazyLoad
        loadChildren: () => import('./mail/mail.module').then( m => m.MailModule)
      },
      {
        path: 'organization',
        // LazyLoad
        loadChildren: () => import('./organization/organization.module').then( m => m.OrganizationModule)
      },
      {
        path: 'security',
        // LazyLoad
        loadChildren: () => import('./security/security.module').then( m => m.SecurityModule)
      },
      {
        path: 'talent',
        // LazyLoad
        loadChildren: () => import('./talent/talent.module').then( m => m.TalentModule)
      },
      {
        path: '**', redirectTo: 'home'
      }
    ]
  },
  {
    path: '**', redirectTo: 'home'
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
export class MainRoutingModule { }
