import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { TarifasImpuestosRoutingModule } from './tarifas-impuestos-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { TarifasImpuestosComponent } from './pages/tarifas-impuestos/tarifas-impuestos.component';

@NgModule({
  declarations: [
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    TarifasImpuestosComponent
  ],
  imports: [
    SharedModule,
    TarifasImpuestosRoutingModule
  ]
})
export class TarifasImpuestosModule { }
