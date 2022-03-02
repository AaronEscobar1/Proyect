import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';

// Components
import { ConfigHomeComponent } from './pages/config-home/config-home.component';


@NgModule({
  declarations: [
    ConfigHomeComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ConfigurationModule { }
