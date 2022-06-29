import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { CompetenciasRoutingModule } from './competencias-routing.module';
import { CompetenciasComponent } from './pages/competencias/competencias.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    CompetenciasComponent,
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    CompetenciasRoutingModule
  ]
})
export class CompetenciasModule { }
