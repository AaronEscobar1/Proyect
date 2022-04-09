import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../shared/shared.module';
import { MotivosFiniquitoRoutingModule } from './motivos-finiquito-routing.module';

// Components
import { ButtonsComponent } from './components/buttons/buttons.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MotivosFiniquitoComponent } from './pages/motivos-finiquito/motivos-finiquito.component';


@NgModule({
  declarations: [
    ButtonsComponent,
    DataTableComponent,
    MotivosFiniquitoComponent
  ],
  imports: [
    SharedModule,
    MotivosFiniquitoRoutingModule
  ]
})
export class MotivosFiniquitoModule { }
