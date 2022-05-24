import { NgModule } from '@angular/core';

// Modules
import { CentrosMedicosRoutingModule } from './centros-medicos-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';

// Components
import { CentrosMedicosComponent } from './pages/centros-medicos/centros-medicos.component';
import { DataTableComponent } from './components/data-table/data-table.component';


@NgModule({
  declarations: [
    CentrosMedicosComponent,
    DataTableComponent
  ],
  imports: [
    SharedModule,
    CentrosMedicosRoutingModule
  ]
})
export class CentrosMedicosModule { }
