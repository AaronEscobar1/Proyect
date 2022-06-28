import { NgModule } from '@angular/core';

// Modles
import { SharedModule } from 'src/app/shared/shared.module';
import { ValoresOficialesRoutingModule } from './valores-oficiales-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { ValoresOficialesComponent } from './pages/valores-oficiales/valores-oficiales.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';

@NgModule({
  declarations: [
    ValoresOficialesComponent,
    DataTableComponent,
    ModalPrintComponent,
    ModalAddEditComponent
  ],
  imports: [
    SharedModule,
    ValoresOficialesRoutingModule
  ]
})
export class ValoresOficialesModule { }
