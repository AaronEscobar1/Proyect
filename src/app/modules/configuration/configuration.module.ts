import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';

// Components
import { ConfigHomeComponent } from './sub-modules/config-home/config-home.component';
import { ConfigurationComponent } from './configuration.component';


@NgModule({
  declarations: [
    ConfigHomeComponent,
    ConfigurationComponent
  ],
  imports: [
    ConfigurationRoutingModule,
    SharedModule
  ],
  exports: [
    ConfigurationComponent
  ]
})
export class ConfigurationModule { }
