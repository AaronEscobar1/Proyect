import { NgModule } from '@angular/core';

// Modules
import { MainRoutingModule } from './main-routing.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { OrganizationModule } from './organization/organization.module';
import { MailModule } from './mail/mail.module';
import { SecurityModule } from './security/security.module';
import { TalentModule } from './talent/talent.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
  ],
  imports: [
    MainRoutingModule,
    ConfigurationModule,
    OrganizationModule,
    MailModule,
    SecurityModule,
    TalentModule,
    SharedModule
  ]
})
export class MainModuleModule { }
