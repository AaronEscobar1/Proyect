import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { TipoCuentaRoutingModule } from './tipo-cuenta-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { TipoCuentaComponent } from './pages/tipo-cuenta/tipo-cuenta.component';

@NgModule({
  declarations: [
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    TipoCuentaComponent
  ],
  imports: [
    SharedModule,
    TipoCuentaRoutingModule
  ]
})
export class TipoCuentaModule { }
