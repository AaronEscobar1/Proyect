import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { EvaluacionesRoutingModule } from './evaluaciones-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { EvaluacionesComponent } from './pages/evaluaciones/evaluaciones.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    DataTableComponent,
    EvaluacionesComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    EvaluacionesRoutingModule
  ]
})
export class EvaluacionesModule { }
