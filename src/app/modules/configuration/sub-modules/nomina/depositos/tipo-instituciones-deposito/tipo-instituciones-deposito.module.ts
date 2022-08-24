import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';
import { TipoInstitucionesDepositoRoutingModule } from './tipo-instituciones-deposito-routing.module';
import { TipoInstitucionesDepositoComponent } from './pages/tipo-instituciones-deposito/tipo-instituciones-deposito.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    TipoInstitucionesDepositoComponent,
    EmpresasComponent,
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    TipoInstitucionesDepositoRoutingModule
  ]
})
export class TipoInstitucionesDepositoModule { }
