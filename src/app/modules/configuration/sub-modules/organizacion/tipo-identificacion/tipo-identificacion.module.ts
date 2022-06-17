import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { TipoIdentificacionRoutingModule } from './tipo-identificacion-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { TipoIdentificacionComponent } from './pages/tipo-identificacion/tipo-identificacion.component';


@NgModule({
  declarations: [
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    TipoIdentificacionComponent
  ],
  imports: [
    SharedModule,
    TipoIdentificacionRoutingModule
  ]
})
export class TipoIdentificacionModule { }
