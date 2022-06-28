import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../shared/shared.module';
import { ProcesosRoutingModule } from './procesos-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { ProcesosComponent } from './pages/procesos/procesos.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';

@NgModule({
  declarations: [
    ProcesosComponent,
    DataTableComponent, 
    ModalPrintComponent,
    ModalAddEditComponent
  ],
  imports: [
    SharedModule,
    ProcesosRoutingModule
  ]
})
export class ProcesosModule { }
