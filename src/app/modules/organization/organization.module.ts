import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';

// Components
import { OrganizationComponent } from './organization.component';

@NgModule({
  declarations: [
    OrganizationComponent
  ],
  imports: [
    SharedModule
  ]
})
export class OrganizationModule { }
