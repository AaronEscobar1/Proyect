import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../shared/shared.module';
import { ProfesionesRoutingModule } from './profesiones-routing.module';

// Components
import { ProfesionesComponent } from './pages/profesiones/profesiones.component';
import { DataTableComponent } from './components/data-table/data-table.component';


@NgModule({
  declarations: [
    ProfesionesComponent,
    DataTableComponent,
  ],
  imports: [
    SharedModule,
    ProfesionesRoutingModule
  ]
})
export class ProfesionesModule { }
