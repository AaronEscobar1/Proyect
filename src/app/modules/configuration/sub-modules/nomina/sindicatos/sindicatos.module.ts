import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../shared/shared.module';
import { SindicatosRoutingModule } from './sindicatos-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { SindicatosComponent } from './pages/sindicatos/sindicatos.component';


@NgModule({
  declarations: [
    SindicatosComponent,
    DataTableComponent
  ],
  imports: [
    SharedModule,
    SindicatosRoutingModule
  ]
})
export class SindicatosModule { }
