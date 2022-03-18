import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MainComponent } from './main.component';
import { MailComponent } from './mail/mail.component';
import { OrganizationComponent } from './organization/organization.component';
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
        path: 'mail', component: MailComponent,
      },
      {
        path: 'organization', component: OrganizationComponent,
      },
      {
        path: 'security', component: SecurityComponent,
      },
      {
        path: 'talent', component: TalentComponent,
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
