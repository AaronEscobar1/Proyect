import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../shared/shared.module';
import { MotivosFiniquitoRoutingModule } from './motivos-finiquito-routing.module';

// Components
import { MotivosFiniquitoComponent } from './pages/motivos-finiquito/motivos-finiquito.component';


@NgModule({
  declarations: [
    MotivosFiniquitoComponent
  ],
  imports: [
    SharedModule,
    MotivosFiniquitoRoutingModule
  ]
})
export class MotivosFiniquitoModule { }
