import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ConceptosRoutingModule } from './conceptos-routing.module';
import { SharedEmpresaModule } from '../../empresa/shared-empresa/shared-empresa.module';

// Components Concepto
import { ConceptosComponent } from './pages/conceptos/conceptos.component';
import { ConceptosHomeComponent } from './pages/conceptos-home/conceptos-home.component';
import { DataTableConceptoComponent } from './components/concepto/data-table-concepto/data-table-concepto.component';
import { ModalAddEditConceptoComponent } from './components/concepto/modal-add-edit-concepto/modal-add-edit-concepto.component';
import { ModalPrintConceptoComponent } from './components/concepto/modal-print-concepto/modal-print-concepto.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';

// Components Concepto Tope
import { ModalConceptoTopeComponent } from './components/concepto-tope/modal-concepto-tope/modal-concepto-tope.component';

@NgModule({
  declarations: [
    ConceptosComponent,
    ConceptosHomeComponent,
    DataTableConceptoComponent,
    ModalAddEditConceptoComponent,
    ModalPrintConceptoComponent,
    TipoNominaComponent,

    // Components Tope
    ModalConceptoTopeComponent
  ],
  imports: [
    SharedModule,
    ConceptosRoutingModule,
    SharedEmpresaModule
  ]
})
export class ConceptosModule { }
