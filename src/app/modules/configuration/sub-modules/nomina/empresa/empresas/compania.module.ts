import { NgModule } from '@angular/core';

// Modules
import { CompaniaRoutingModule } from './compania-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { ButtonsOdComponent } from './components/otros-datos-components/buttons-od/buttons-od.component';
import { CompaniaComponent } from './pages/compania/compania.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/compania-components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/compania-components/modal-print/modal-print.component';
import { ModalAddEditOdComponent } from './components/otros-datos-components/modal-add-edit-od/modal-add-edit-od.component';
import { OtroDatosAdicionalesComponent } from './pages/otros-datos-adicionales/otro-datos-adicionales.component';

@NgModule({
  declarations: [
    ButtonsOdComponent,
    CompaniaComponent,
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    ModalAddEditOdComponent,
    OtroDatosAdicionalesComponent
  ],
  imports: [
    SharedModule,
    CompaniaRoutingModule
  ],
  exports: [
    DataTableComponent
  ]
})
export class CompaniaModule { }
