import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { SecurityRoutingModule } from './security-routing.module';

// Components
import { SecurityComponent } from './security.component';
import { SecurityHomeComponent } from './sub-modules/security-home/security-home.component';


@NgModule({
  declarations: [
    SecurityComponent,
    SecurityHomeComponent
  ],
  imports: [
    SharedModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
