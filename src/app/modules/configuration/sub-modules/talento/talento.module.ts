import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { TalentoRoutingModule } from './talento-routing.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    TalentoRoutingModule
  ]
})
export class TalentoModule { }
