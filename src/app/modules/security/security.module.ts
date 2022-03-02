import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';

// Components
import { SecurityHomeComponent } from './pages/security-home/security-home.component';


@NgModule({
  declarations: [
    SecurityHomeComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SecurityModule { }
