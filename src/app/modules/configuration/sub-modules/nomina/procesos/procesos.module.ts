import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../shared/shared.module';
import { ProcesosRoutingModule } from './procesos-routing.module';

// Components
import { ButtonsComponent } from './components/buttons/buttons.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ProcesosComponent } from './pages/procesos/procesos.component';

@NgModule({
  declarations: [
    ProcesosComponent,
    ButtonsComponent,
    DataTableComponent
  ],
  imports: [
    SharedModule,
    ProcesosRoutingModule
  ]
})
export class ProcesosModule { }
