import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { DistribucionNominaRoutingModule } from './distribucion-nomina-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataTableEditComponent } from './components/modal-add-edit/data-table-edit/data-table-edit.component';
import { DistribucionNominaComponent } from './pages/distribucion-nomina/distribucion-nomina.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    DataTableComponent,
    DataTableEditComponent,
    DistribucionNominaComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    DistribucionNominaRoutingModule
  ]
})
export class DistribucionNominaModule { }
