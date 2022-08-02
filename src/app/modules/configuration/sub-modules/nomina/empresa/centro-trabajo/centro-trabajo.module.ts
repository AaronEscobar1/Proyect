import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { CentroTrabajoRoutingModule } from './centro-trabajo-routing.module';
import { CompaniaModule } from '../empresas/compania.module';

// Components
import { ButtonsCentroTrabajoComponent } from './components/buttons-centro-trabajo/buttons-centro-trabajo.component';
import { CentroTrabajoComponent } from './pages/centro-trabajo/centro-trabajo.component';
import { DataTableCentroTrabajoComponent } from './components/data-table-centro-trabajo/data-table-centro-trabajo.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';


@NgModule({
  declarations: [
    ButtonsCentroTrabajoComponent,
    CentroTrabajoComponent,
    DataTableCentroTrabajoComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
  ],
  imports: [
    SharedModule,
    CentroTrabajoRoutingModule,
    CompaniaModule
  ]
})
export class CentroTrabajoModule { }
