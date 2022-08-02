import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { GrupoTrabajoRoutingModule } from './grupo-trabajo-routing.module';

// Components
import { ButtonsGruposComponent } from './components/components-grupo-trabajo/buttons-grupos/buttons-grupos.component';
import { DataTableComponent } from './components/data-table-empresa/data-table.component';
import { DataTableGruposComponent } from './components/components-grupo-trabajo/data-table-grupos/data-table-grupos.component';
import { DataTableNominaComponent } from './components/data-table-nomina/data-table-nomina.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { GrupoTrabajoComponent } from './pages/grupo-trabajo/grupo-trabajo.component';
import { GrupoTrabajoHomeComponent } from './pages/grupo-trabajo-home/grupo-trabajo-home.component';
import { ModalAddEditComponent } from './components/components-grupo-trabajo/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/components-grupo-trabajo/modal-print/modal-print.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';

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
    TipoNominaComponent
  ],
  imports: [
    SharedModule,
    GrupoTrabajoRoutingModule
  ]
})
export class GrupoTrabajoModule { }
