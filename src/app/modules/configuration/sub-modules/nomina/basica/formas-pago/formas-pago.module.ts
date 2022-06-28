import { NgModule } from '@angular/core';

// Modules
import { FormasPagoRoutingModule } from './formas-pago-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Componens
import { FormasPagoComponent } from './pages/formas-pago/formas-pago.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TransformeTPagoPipe } from './pipes/transforme-tpago.pipe';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';

@NgModule({
  declarations: [
    FormasPagoComponent,
    DataTableComponent,
    ModalPrintComponent,
    ModalAddEditComponent,
    TransformeTPagoPipe,
  ],
  imports: [
    SharedModule,
    FormasPagoRoutingModule
  ]
})
export class FormasPagoModule { }
