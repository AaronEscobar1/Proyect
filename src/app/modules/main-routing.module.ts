import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MainComponent } from './main.component';
import { ArchiveHomeComponent } from './archive/pages/archive-home/archive-home.component';
import { MailHomeComponent } from './mail/pages/mail-home/mail-home.component';
import { OrganizationHomeComponent } from './organization/pages/organization-home/organization-home.component';
import { SecurityHomeComponent } from './security/pages/security-home/security-home.component';
import { TalentHomeComponent } from './talent/pages/talent-home/talent-home.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'archive', component: ArchiveHomeComponent
      },
      {
        path: 'config',
        // LazyLoad
        loadChildren: () => import('./configuration/configuration.module').then( m => m.ConfigurationModule)
      },
      {
        path: 'mail', component: MailHomeComponent,
      },
      {
        path: 'organization', component: OrganizationHomeComponent,
      },
      {
        path: 'security', component: SecurityHomeComponent,
      },
      {
        path: 'talent', component: TalentHomeComponent,
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
