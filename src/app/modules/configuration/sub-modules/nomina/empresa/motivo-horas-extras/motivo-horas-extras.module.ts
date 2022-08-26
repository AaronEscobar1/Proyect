import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { MotivoHorasExtrasRoutingModule } from './motivo-horas-extras-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { MotivoHorasExtrasComponent } from './pages/motivo-horas-extras/motivo-horas-extras.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';

@NgModule({
  declarations: [
    EmpresasComponent,
    DataTableComponent,
    ModalPrintComponent,
    ModalAddEditComponent,
    MotivoHorasExtrasComponent
  ],
  imports: [
    SharedModule,
    MotivoHorasExtrasRoutingModule,
    SharedEmpresaModule
  ]
})
export class MotivoHorasExtrasModule { }
