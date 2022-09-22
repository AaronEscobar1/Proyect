import { NgModule } from '@angular/core';

// Modules
import { FormasPagoRoutingModule } from './formas-pago-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Componens
import { DataTableComponent } from './components/data-table/data-table.component';
import { FormasPagoComponent } from './pages/formas-pago/formas-pago.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    DataTableComponent,
    FormasPagoComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    FormasPagoRoutingModule
  ]
})
export class FormasPagoModule { }
