import { NgModule } from '@angular/core';

// Modules
import { CompaniaRoutingModule } from './compania-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { CompaniaComponent } from './pages/compania/compania.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

// Components

@NgModule({
  declarations: [
    CompaniaComponent,
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    CompaniaRoutingModule
  ]
})
export class CompaniaModule { }
