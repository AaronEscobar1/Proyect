import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { EmpresaRoutingModule } from './empresa-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    DataTableComponent,
    EmpresaComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    EmpresaRoutingModule
  ]
})
export class EmpresaModule { }
