import { NgModule } from '@angular/core';

// Modules
import { RotacionGrupoRoutingModule } from './rotacion-grupo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { RotacionGrupoComponent } from './pages/rotacion-grupo/rotacion-grupo.component';


@NgModule({
  declarations: [
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    RotacionGrupoComponent
  ],
  imports: [
    SharedModule,
    RotacionGrupoRoutingModule
  ]
})
export class RotacionGrupoModule { }
