import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';

// Components
import { ConfigHomeComponent } from './sub-modules/config-home/config-home.component';
import { NivelesEducativosComponent } from './sub-modules/nomina/niveles-educativos/pages/niveles-educativos/niveles-educativos.component';
import { ConfigurationComponent } from './configuration.component';


@NgModule({
  declarations: [
    ConfigHomeComponent,
    NivelesEducativosComponent,
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
