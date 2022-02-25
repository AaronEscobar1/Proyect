import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ConfigHomeComponent } from './configuration/pages/config-home/config-home.component';
import { MailHomeComponent } from './mail/pages/mail-home/mail-home.component';
import { OrganizationHomeComponent } from './organization/pages/organization-home/organization-home.component';
import { SecurityHomeComponent } from './security/pages/security-home/security-home.component';
import { TalentHomeComponent } from './talent/pages/talent-home/talent-home.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {
        path: 'config', component: ConfigHomeComponent
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
export class AppRoutingModule { }
