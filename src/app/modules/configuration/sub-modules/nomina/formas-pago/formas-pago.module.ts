import { NgModule } from '@angular/core';

// Modules
import { FormasPagoRoutingModule } from './formas-pago-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';

// Componens
import { FormasPagoComponent } from './pages/formas-pago/formas-pago.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TransformeTPagoPipe } from './pipes/transforme-tpago.pipe';

@NgModule({
  declarations: [
    FormasPagoComponent,
    DataTableComponent,
    TransformeTPagoPipe
  ],
  imports: [
    SharedModule,
    FormasPagoRoutingModule
  ]
})
export class FormasPagoModule { }
