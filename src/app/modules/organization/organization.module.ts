import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';

// Components
import { OrganizationHomeComponent } from './pages/organization-home/organization-home.component';

@NgModule({
  declarations: [
    OrganizationHomeComponent
  ],
  imports: [
    SharedModule
  ]
})
export class OrganizationModule { }
