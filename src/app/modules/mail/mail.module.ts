import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { MailRoutingModule } from './mail-routing.module';

// Components
import { MailComponent } from './mail.component';
import { MailHomeComponent } from './sub-modules/mail-home/mail-home.component';


@NgModule({
  declarations: [
    MailComponent,
    MailHomeComponent
  ],
  imports: [
    SharedModule,
    MailRoutingModule
  ]
})
export class MailModule { }
