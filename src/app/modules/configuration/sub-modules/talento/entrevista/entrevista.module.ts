import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { EntrevistaRoutingModule } from './entrevista-routing.module';

// Components
import { EntrevistaComponent } from './pages/entrevista/entrevista.component';
import { EntrevistaHomeComponent } from './pages/entrevista-home/entrevista-home.component';
import { ModalPrintComponent } from './components/components-entrevista/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/components-entrevista/modal-add-edit/modal-add-edit.component';
import { DataTableComponent } from './components/components-entrevista/data-table/data-table.component';

@NgModule({
  declarations: [
    EntrevistaComponent,
    EntrevistaHomeComponent,
    ModalPrintComponent,
    ModalAddEditComponent,
    DataTableComponent
  ],
  imports: [
    SharedModule,
    EntrevistaRoutingModule
  ]
})
export class EntrevistaModule { }
