import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';

// Components
import { TalentComponent } from './talent.component';


@NgModule({
  declarations: [
    TalentComponent
  ],
  imports: [
    SharedModule
  ]
})
export class TalentModule { }
