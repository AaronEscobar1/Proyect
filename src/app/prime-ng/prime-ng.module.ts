import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    FieldsetModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
  ]
})
export class PrimeNgModule { }