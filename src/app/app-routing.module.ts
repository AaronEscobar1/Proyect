import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// Components
import { LoginComponent } from './auth/pages/login/login.component';
import { MainComponent } from './modules/main/main.component';
import { ConfigHomeComponent } from './modules/configuration/pages/config-home/config-home.component';
import { MailHomeComponent } from './modules/mail/pages/mail-home/mail-home.component';
import { OrganizationHomeComponent } from './modules/organization/pages/organization-home/organization-home.component';
import { SecurityHomeComponent } from './modules/security/pages/security-home/security-home.component';
import { TalentHomeComponent } from './modules/talent/pages/talent-home/talent-home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {
        path: 'config', component: ConfigHomeComponent, 
        children: [
          // rutas hijas de config
        ]
      },
      {
        path: 'mail', component: MailHomeComponent,
        children: [
          // rutas hijas de mail
        ]
      },
      {
        path: 'organization', component: OrganizationHomeComponent,
        children: [
          // rutas hijas de organization
        ]
      },
      {
        path: 'security', component: SecurityHomeComponent,
        children: [
          // rutas hijas de security
        ]
      },
      {
        path: 'talent', component: TalentHomeComponent,
        children: [
          // rutas hijas de talent
        ]
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
