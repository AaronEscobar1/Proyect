import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';

// Components
import { OrganizationComponent } from './organization.component';
import { OrganizationHomeComponent } from './sub-modules/organization-home/organization-home.component';

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationHomeComponent
  ],
  imports: [
    SharedModule,
    OrganizationRoutingModule
  ]
})
export class OrganizationModule { }
