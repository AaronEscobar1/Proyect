import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ParametrosInicialesRoutingModule } from './parametros-iniciales-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ParametrosInicialesComponent } from './pages/parametros-iniciales/parametros-iniciales.component';

@NgModule({
  declarations: [
    DataTableComponent,
    EmpresasComponent,
    ParametrosInicialesComponent,
  ],
  imports: [
    SharedModule,
    ParametrosInicialesRoutingModule
  ]
})
export class ParametrosInicialesModule { }
