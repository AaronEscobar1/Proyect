import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfesionesRoutingModule } from './profesiones-routing.module';

// Components
import { ProfesionesComponent } from './pages/profesiones/profesiones.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';


@NgModule({
  declarations: [
    ProfesionesComponent,
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    ProfesionesRoutingModule
  ]
})
export class ProfesionesModule { }
