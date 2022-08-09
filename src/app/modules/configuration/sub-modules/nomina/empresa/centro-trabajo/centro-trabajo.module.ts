import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { CentroTrabajoRoutingModule } from './centro-trabajo-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { CentroTrabajoComponent } from './pages/centro-trabajo/centro-trabajo.component';
import { DataTableCentroTrabajoComponent } from './components/data-table-centro-trabajo/data-table-centro-trabajo.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';


@NgModule({
  declarations: [
    CentroTrabajoComponent,
    DataTableCentroTrabajoComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
  ],
  imports: [
    SharedModule,
    CentroTrabajoRoutingModule,
    SharedEmpresaModule
  ]
})
export class CentroTrabajoModule { }
