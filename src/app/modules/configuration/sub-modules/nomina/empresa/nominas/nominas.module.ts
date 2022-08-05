import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { NominasRoutingModule } from './nominas-routing.module';
import { CompaniaModule } from '../empresas/compania.module';

// Components
import { ButtonsNominaComponent } from './components/buttons-nomina/buttons-nomina.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { NominasComponent } from './pages/nominas/nominas.component';


@NgModule({
  declarations: [
    ButtonsNominaComponent,
    DataTableComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    NominasComponent,
  ],
  imports: [
    SharedModule,
    NominasRoutingModule,
    CompaniaModule
  ]
})
export class NominasModule { }
