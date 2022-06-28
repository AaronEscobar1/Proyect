import { NgModule } from '@angular/core';

// Modules
import { CentrosMedicosRoutingModule } from './centros-medicos-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';

// Components
import { CentrosMedicosComponent } from './pages/centros-medicos/centros-medicos.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';


@NgModule({
  declarations: [
    CentrosMedicosComponent,
    DataTableComponent,
    ModalPrintComponent,
    ModalAddEditComponent
  ],
  imports: [
    SharedModule,
    CentrosMedicosRoutingModule
  ]
})
export class CentrosMedicosModule { }
