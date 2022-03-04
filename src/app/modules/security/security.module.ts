import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';

// Components
import { SecurityComponent } from './security.component';


@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SecurityModule { }
