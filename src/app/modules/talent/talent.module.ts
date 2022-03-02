import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../shared/shared.module';

// Components
import { TalentHomeComponent } from './pages/talent-home/talent-home.component';


@NgModule({
  declarations: [
    TalentHomeComponent
  ],
  imports: [
    SharedModule
  ]
})
export class TalentModule { }
