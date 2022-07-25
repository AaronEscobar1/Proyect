import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { DistribucionNominaRoutingModule } from './distribucion-nomina-routing.module';
import { CompaniaModule } from '../empresas/compania.module';

// Components
import { DataTableDistribucionComponent } from './components/data-table-distribucion/data-table-distribucion.component';
import { DataTableEditComponent } from './components/modal-add-edit/data-table-edit/data-table-edit.component';
import { DistribucionNominaComponent } from './pages/distribucion-nomina/distribucion-nomina.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    DataTableDistribucionComponent,
    DataTableEditComponent,
    DistribucionNominaComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    DistribucionNominaRoutingModule,
    CompaniaModule
  ]
})
export class DistribucionNominaModule { }
