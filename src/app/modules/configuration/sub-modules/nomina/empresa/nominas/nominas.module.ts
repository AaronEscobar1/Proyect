import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { NominasRoutingModule } from './nominas-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { NominasComponent } from './pages/nominas/nominas.component';

@NgModule({
  declarations: [
    DataTableComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    NominasComponent,
  ],
  imports: [
    SharedModule,
    NominasRoutingModule,
    SharedEmpresaModule
  ]
})
export class NominasModule { }
