import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ConceptosRoutingModule } from './conceptos-routing.module';

// Components Concepto
import { ConceptosComponent } from './pages/conceptos/conceptos.component';
import { ConceptosHomeComponent } from './pages/conceptos-home/conceptos-home.component';
import { DataTableConceptoComponent } from './components/concepto/data-table-concepto/data-table-concepto.component';
import { ModalAddEditConceptoComponent } from './components/concepto/modal-add-edit-concepto/modal-add-edit-concepto.component';
import { ModalPrintConceptoComponent } from './components/concepto/modal-print-concepto/modal-print-concepto.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';

@NgModule({
  declarations: [
    ConceptosComponent,
    ConceptosHomeComponent,
    DataTableConceptoComponent,
    ModalAddEditConceptoComponent,
    ModalPrintConceptoComponent,
    TipoNominaComponent
  ],
  imports: [
    SharedModule,
    ConceptosRoutingModule
  ]
})
export class ConceptosModule { }
