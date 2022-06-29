import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ParentescoRoutingModule } from './parentesco-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { ParentescoComponent } from './pages/parentesco/parentesco.component';

@NgModule({
  declarations: [
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    ParentescoComponent
  ],
  imports: [
    SharedModule,
    ParentescoRoutingModule
  ]
})
export class ParentescoModule { }
