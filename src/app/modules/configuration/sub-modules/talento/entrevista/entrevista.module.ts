import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { EntrevistaRoutingModule } from './entrevista-routing.module';

// Components
import { ButtonsPreguntaComponent } from './components/components-pregunta/buttons-pregunta/buttons-pregunta.component';
import { DataTableComponent } from './components/components-entrevista/data-table/data-table.component';
import { DataTablePreguntaComponent } from './components/components-pregunta/data-table-pregunta/data-table-pregunta.component';
import { EntrevistaComponent } from './pages/entrevista/entrevista.component';
import { EntrevistaHomeComponent } from './pages/entrevista-home/entrevista-home.component';
import { ModalAddEditComponent } from './components/components-entrevista/modal-add-edit/modal-add-edit.component';
import { ModalAddEditPreguntaComponent } from './components/components-pregunta/modal-add-edit-pregunta/modal-add-edit-pregunta.component';
import { ModalPrintComponent } from './components/components-entrevista/modal-print/modal-print.component';
import { PreguntaComponent } from './pages/pregunta/pregunta.component';

@NgModule({
  declarations: [
    ButtonsPreguntaComponent,
    DataTableComponent,
    DataTablePreguntaComponent,
    EntrevistaComponent,
    EntrevistaHomeComponent,
    ModalAddEditComponent,
    ModalAddEditPreguntaComponent,
    ModalPrintComponent,
    PreguntaComponent
  ],
  imports: [
    SharedModule,
    EntrevistaRoutingModule
  ]
})
export class EntrevistaModule { }
