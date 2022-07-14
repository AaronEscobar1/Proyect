import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { MotivosCambiosRoutingModule } from './motivos-cambios-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { MotivosCambiosComponent } from './pages/motivos-cambios/motivos-cambios.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';


@NgModule({
  declarations: [
    DataTableComponent,
    MotivosCambiosComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    MotivosCambiosRoutingModule
  ]
})
export class MotivosCambiosModule { }
