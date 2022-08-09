import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';
import { SituacionRoutingModule } from './situacion-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { DataTableSituacionComponent } from './components/data-table-situacion/data-table-situacion.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { SituacionComponent } from './pages/situacion/situacion.component';
import { SituacionHomeComponent } from './pages/situacion-home/situacion-home.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';

@NgModule({
  declarations: [
    DataTableSituacionComponent,
    ModalPrintComponent,
    ModalAddEditComponent,
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
