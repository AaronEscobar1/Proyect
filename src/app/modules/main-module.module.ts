import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';

// Modules
import { ArchiveModule } from './archive/archive.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { OrganizationModule } from './organization/organization.module';
import { MailModule } from './mail/mail.module';
import { SecurityModule } from './security/security.module';
import { TalentModule } from './talent/talent.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
  ],
  imports: [
    MainRoutingModule,
    ArchiveModule,
    ConfigurationModule,
    OrganizationModule,
    MailModule,
    SecurityModule,
    TalentModule,
    SharedModule
  ]
})
export class MainModuleModule { }
