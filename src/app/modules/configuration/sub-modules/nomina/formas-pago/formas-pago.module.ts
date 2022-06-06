import { NgModule } from '@angular/core';

// Modules
import { FormasPagoRoutingModule } from './formas-pago-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';

// Componens
import { FormasPagoComponent } from './pages/formas-pago/formas-pago.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TransformeTPagoPipe } from './pipes/transforme-tpago.pipe';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    FormasPagoComponent,
    DataTableComponent,
    ModalPrintComponent,
    TransformeTPagoPipe,
  ],
  imports: [
    SharedModule,
    FormasPagoRoutingModule
  ]
})
export class FormasPagoModule { }
