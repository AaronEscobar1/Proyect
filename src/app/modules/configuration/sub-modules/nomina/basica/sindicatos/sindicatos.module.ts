import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { SindicatosRoutingModule } from './sindicatos-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { SindicatosComponent } from './pages/sindicatos/sindicatos.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';


@NgModule({
  declarations: [
    SindicatosComponent,
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    SindicatosRoutingModule
  ]
})
export class SindicatosModule { }
