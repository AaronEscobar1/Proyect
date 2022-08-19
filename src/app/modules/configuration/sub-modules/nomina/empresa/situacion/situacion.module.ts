import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';
import { SituacionRoutingModule } from './situacion-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { DataTableConceptosComponent } from './components/conceptos-situacion/data-table-conceptos/data-table-conceptos.component';
import { DataTableSituacionComponent } from './components/situacion/data-table-situacion/data-table-situacion.component';
import { DataTableProcesosComponent } from './components/procesos-situacion/data-table-procesos/data-table-procesos.component';
import { ModalAddEditComponent } from './components/situacion/modal-add-edit/modal-add-edit.component';
import { ModalConceptosComponent } from './components/conceptos-situacion/modal-conceptos/modal-conceptos.component';
import { ModalPrintComponent } from './components/situacion/modal-print/modal-print.component';
import { ModalProcesosComponent } from './components/procesos-situacion/modal-procesos/modal-procesos.component';
import { SituacionComponent } from './pages/situacion/situacion.component';
import { SituacionHomeComponent } from './pages/situacion-home/situacion-home.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';

@NgModule({
  declarations: [
    DataTableConceptosComponent,
    DataTableSituacionComponent,
    DataTableProcesosComponent,
    ModalAddEditComponent,
    ModalConceptosComponent,
    ModalPrintComponent,
    ModalProcesosComponent,
    SituacionComponent,
    SituacionHomeComponent,
    TipoNominaComponent,
  ],
  imports: [
    SharedModule,
    SituacionRoutingModule,
    SharedEmpresaModule
  ]
})
export class SituacionModule { }
