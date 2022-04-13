import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../shared/shared.module';
import { SindicatosRoutingModule } from './sindicatos-routing.module';

// Components
import { ButtonsComponent } from './components/buttons/buttons.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SindicatosComponent } from './pages/sindicatos/sindicatos.component';


@NgModule({
  declarations: [
    SindicatosComponent,
    ButtonsComponent,
    DataTableComponent
  ],
  imports: [
    SharedModule,
    SindicatosRoutingModule
  ]
})
export class SindicatosModule { }
