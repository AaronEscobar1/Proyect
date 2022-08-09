import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { TarifasImpuestosRoutingModule } from './tarifas-impuestos-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { TarifasImpuestosComponent } from './pages/tarifas-impuestos/tarifas-impuestos.component';

@NgModule({
  declarations: [
    DataTableComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    TarifasImpuestosComponent
  ],
  imports: [
    SharedModule,
    TarifasImpuestosRoutingModule,
    SharedEmpresaModule
  ]
})
export class TarifasImpuestosModule { }
