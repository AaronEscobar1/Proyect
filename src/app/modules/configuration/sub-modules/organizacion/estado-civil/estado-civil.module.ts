import { NgModule } from '@angular/core';

// Modules
import { EstadoCivilRoutingModule } from './estado-civil-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { EstadoCivilComponent } from './pages/estado-civil/estado-civil.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';


@NgModule({
  declarations: [
    DataTableComponent,
    EstadoCivilComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    EstadoCivilRoutingModule
  ]
})
export class EstadoCivilModule { }
