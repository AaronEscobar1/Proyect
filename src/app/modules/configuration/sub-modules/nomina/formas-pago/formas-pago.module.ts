import { NgModule } from '@angular/core';

// Modules
import { FormasPagoRoutingModule } from './formas-pago-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';

// Componens
import { FormasPagoComponent } from './pages/formas-pago/formas-pago.component';

@NgModule({
  declarations: [
    FormasPagoComponent
  ],
  imports: [
    SharedModule,
    FormasPagoRoutingModule
  ]
})
export class FormasPagoModule { }
