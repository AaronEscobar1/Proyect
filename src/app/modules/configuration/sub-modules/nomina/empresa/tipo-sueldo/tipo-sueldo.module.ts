import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';
import { TipoSueldoRoutingModule } from './tipo-sueldo-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { TipoSueldoComponent } from './pages/tipo-sueldo/tipo-sueldo.component';

@NgModule({
  declarations: [
    DataTableComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    TipoSueldoComponent,
  ],
  imports: [
    SharedModule,
    TipoSueldoRoutingModule,
    SharedEmpresaModule
  ]
})
export class TipoSueldoModule { }
