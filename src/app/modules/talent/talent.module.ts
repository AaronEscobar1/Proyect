import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { TalentRoutingModule } from './talent-routing.module';

// Components
import { TalentComponent } from './talent.component';
import { TalentHomeComponent } from './sub-modules/talent-home/talent-home.component';


@NgModule({
  declarations: [
    TalentComponent,
    TalentHomeComponent
  ],
  imports: [
    SharedModule,
    TalentRoutingModule
  ]
})
export class TalentModule { }
