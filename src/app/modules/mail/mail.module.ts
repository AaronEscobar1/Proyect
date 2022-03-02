import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';

// Components
import { MailHomeComponent } from './pages/mail-home/mail-home.component';


@NgModule({
  declarations: [
    MailHomeComponent
  ],
  imports: [
    SharedModule
  ]
})
export class MailModule { }
