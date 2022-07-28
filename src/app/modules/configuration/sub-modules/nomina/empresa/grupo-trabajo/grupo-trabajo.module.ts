import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { GrupoTrabajoRoutingModule } from './grupo-trabajo-routing.module';

// Components
import { ButtonsGruposComponent } from './components/components-grupo-trabajo/buttons-grupos/buttons-grupos.component';
import { DataTableComponent } from './components/components-empresa/data-table/data-table.component';
import { DataTableGruposComponent } from './components/components-grupo-trabajo/data-table-grupos/data-table-grupos.component';
import { DataTableNominaComponent } from './components/components-tipo-nomina/data-table-nomina/data-table-nomina.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { GrupoTrabajoComponent } from './pages/grupo-trabajo/grupo-trabajo.component';
import { GrupoTrabajoHomeComponent } from './pages/grupo-trabajo-home/grupo-trabajo-home.component';
import { ModalAddEditComponent } from './components/components-empresa/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/components-empresa/modal-print/modal-print.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';
import { TransformTJornadaPipe } from './pipes/transform-t-jornada.pipe';

@NgModule({
  declarations: [
    ButtonsGruposComponent,
    DataTableComponent,
    DataTableGruposComponent,
    DataTableNominaComponent,
    EmpresaComponent,
    GrupoTrabajoComponent,
    GrupoTrabajoHomeComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    TipoNominaComponent,
    TransformTJornadaPipe
  ],
  imports: [
    SharedModule,
    GrupoTrabajoRoutingModule
  ]
})
export class GrupoTrabajoModule { }
