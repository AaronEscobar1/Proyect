import { NgModule } from '@angular/core';

// Modules
import { NivelesEducactivosRoutingModule } from './niveles-educactivos-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';

// Components
import { NivelesEducativosComponent } from './pages/niveles-educativos/niveles-educativos.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';

@NgModule({
  declarations: [
    NivelesEducativosComponent,
    DataTableComponent,
    ButtonsComponent,
    ModalPrintComponent,
    ModalAddEditComponent,
  ],
  imports: [
    SharedModule,
    NivelesEducactivosRoutingModule
  ]
})
export class NivelesEducactivosModule { }
