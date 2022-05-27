import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { LocalidadesRoutingModule } from './localidades-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { LocalidadesComponent } from './pages/localidades/localidades.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';


@NgModule({
  declarations: [
    DataTableComponent,
    LocalidadesComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    LocalidadesRoutingModule
  ]
})
export class LocalidadesModule { }
