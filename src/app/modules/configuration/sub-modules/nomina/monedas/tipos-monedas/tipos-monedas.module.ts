import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { TiposMonedasRoutingModule } from './tipos-monedas-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { TipoMonedaComponent } from './pages/tipo-moneda/tipo-moneda.component';

@NgModule({
  declarations: [
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    TipoMonedaComponent
  ],
  imports: [
    SharedModule,
    TiposMonedasRoutingModule
  ]
})
export class TiposMonedasModule { }
