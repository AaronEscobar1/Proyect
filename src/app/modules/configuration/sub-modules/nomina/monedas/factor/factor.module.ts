import { NgModule } from '@angular/core';

// Modules
import { FactorRoutingModule } from './factor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedEmpresaModule } from '../../empresa/shared-empresa/shared-empresa.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { FactorComponent } from './pages/factor/factor.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';

@NgModule({
  declarations: [
    DataTableComponent,
    EmpresasComponent,
    FactorComponent,
    ModalAddEditComponent
  ],
  imports: [
    SharedModule,
    FactorRoutingModule,
    SharedEmpresaModule
  ]
})
export class FactorModule { }
