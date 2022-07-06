import { NgModule } from '@angular/core';

// Modules
import { InformacionAdicionalRoutingModule } from './informacion-adicional-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { InformacionAdicionalComponent } from './pages/informacion-adicional/informacion-adicional.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    DataTableComponent,
    InformacionAdicionalComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    InformacionAdicionalRoutingModule
  ]
})
export class InformacionAdicionalModule { }
