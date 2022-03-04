import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';

// Components
import { MailComponent } from './mail.component';


@NgModule({
  declarations: [
    MailComponent
  ],
  imports: [
    SharedModule
  ]
})
export class MailModule { }
