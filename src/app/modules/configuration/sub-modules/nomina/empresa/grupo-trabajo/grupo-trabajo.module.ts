import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { GrupoTrabajoRoutingModule } from './grupo-trabajo-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { DataTableGruposComponent } from './components/grupos-trabajo/data-table-grupos/data-table-grupos.component';
import { GrupoTrabajoComponent } from './pages/grupo-trabajo/grupo-trabajo.component';
import { GrupoTrabajoHomeComponent } from './pages/grupo-trabajo-home/grupo-trabajo-home.component';
import { ModalAddEditComponent } from './components/grupos-trabajo/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/grupos-trabajo/modal-print/modal-print.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';
import { DataTableRotacionComponent } from './components/rotacion-grupos/data-table-rotacion/data-table-rotacion.component';
import { ModalRotacionComponent } from './components/rotacion-grupos/modal-rotacion/modal-rotacion.component';

@NgModule({
  declarations: [
    DataTableGruposComponent,
    GrupoTrabajoComponent,
    GrupoTrabajoHomeComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    TipoNominaComponent,
    DataTableRotacionComponent,
    ModalRotacionComponent
  ],
  imports: [
    SharedModule,
    GrupoTrabajoRoutingModule,
    SharedEmpresaModule
  ]
})
export class GrupoTrabajoModule { }
