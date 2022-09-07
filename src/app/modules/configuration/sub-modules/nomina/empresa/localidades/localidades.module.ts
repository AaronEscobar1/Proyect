import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';
import { LocalidadesRoutingModule } from './localidades-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { LocalidadesComponent } from './pages/localidades/localidades.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    DataTableComponent,
    EmpresasComponent,
    LocalidadesComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    LocalidadesRoutingModule,
    SharedEmpresaModule
  ]
})
export class LocalidadesModule { }
