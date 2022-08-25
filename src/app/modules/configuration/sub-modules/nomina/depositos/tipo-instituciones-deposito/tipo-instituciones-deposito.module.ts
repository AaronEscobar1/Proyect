import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';
import { TipoInstitucionesDepositoRoutingModule } from './tipo-instituciones-deposito-routing.module';
import { SharedEmpresaModule } from '../../empresa/shared-empresa/shared-empresa.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { TipoInstitucionesDepositoComponent } from './pages/tipo-instituciones-deposito/tipo-instituciones-deposito.component';

@NgModule({
  declarations: [
    DataTableComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    TipoInstitucionesDepositoComponent
  ],
  imports: [
    SharedModule,
    TipoInstitucionesDepositoRoutingModule,
    SharedEmpresaModule
  ]
})
export class TipoInstitucionesDepositoModule { }
