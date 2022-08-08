import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../../../../../../shared/shared.module';
import { SituacionRoutingModule } from './situacion-routing.module';

// Components
import { ButtonsSituacionComponent } from './components/components-situacion/buttons-situacion/buttons-situacion.component';
import { DataTableEmpresaComponent } from './components/data-table-empresa/data-table-empresa.component';
import { DataTableNominaComponent } from './components/data-table-nomina/data-table-nomina.component';
import { DataTableSituacionComponent } from './components/components-situacion/data-table-situacion/data-table-situacion.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalPrintComponent } from './components/components-situacion/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/components-situacion/modal-add-edit/modal-add-edit.component';
import { SituacionComponent } from './pages/situacion/situacion.component';
import { SituacionHomeComponent } from './pages/situacion-home/situacion-home.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';

@NgModule({
  declarations: [
    ButtonsSituacionComponent,
    DataTableEmpresaComponent,
    DataTableNominaComponent,
    DataTableSituacionComponent,
    EmpresasComponent,
    ModalPrintComponent,
    ModalAddEditComponent,
    SituacionComponent,
    SituacionHomeComponent,
    TipoNominaComponent,
  ],
  imports: [
    SharedModule,
    SituacionRoutingModule
  ]
})
export class SituacionModule { }
