import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { GrupoTrabajoRoutingModule } from './grupo-trabajo-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { GrupoTrabajoComponent } from './pages/grupo-trabajo/grupo-trabajo.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';


@NgModule({
  declarations: [
    DataTableComponent,
    GrupoTrabajoComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    GrupoTrabajoRoutingModule
  ]
})
export class GrupoTrabajoModule { }
