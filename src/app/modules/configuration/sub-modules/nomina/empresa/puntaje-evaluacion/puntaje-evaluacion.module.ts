import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { PuntajeEvaluacionRoutingModule } from './puntaje-evaluacion-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { AumentoEvaluacionComponent } from './pages/aumento-evaluacion/aumento-evaluacion.component';
import { ButtonsAumentoComponent } from './components/aumento-evaluacion/buttons-aumento/buttons-aumento.component';
import { DataTableAumentoComponent } from './components/aumento-evaluacion/data-table-aumento/data-table-aumento.component';
import { DataTablePuntajeComponent } from './components/puntaje-evaluacion/data-table-puntaje/data-table-puntaje.component';
import { ModalAddEditAumentoComponent } from './components/aumento-evaluacion/modal-add-edit-aumento/modal-add-edit-aumento.component';
import { ModalAddEditComponent } from './components/puntaje-evaluacion/modal-add-edit/modal-add-edit.component';
import { ModalPrintAumentoComponent } from './components/aumento-evaluacion/modal-print-aumento/modal-print-aumento.component';
import { ModalPrintComponent } from './components/puntaje-evaluacion/modal-print/modal-print.component';
import { PuntajeEvaluacionComponent } from './pages/puntaje-evaluacion/puntaje-evaluacion.component';
import { PuntajeEvaluacionHomeComponent } from './pages/puntaje-evaluacion-home/puntaje-evaluacion-home.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';

@NgModule({
  declarations: [
    AumentoEvaluacionComponent,
    ButtonsAumentoComponent,
    DataTableAumentoComponent,
    DataTablePuntajeComponent,
    ModalAddEditAumentoComponent,
    ModalAddEditComponent,
    ModalPrintAumentoComponent,
    ModalPrintComponent,
    PuntajeEvaluacionComponent,
    PuntajeEvaluacionHomeComponent,
    TipoNominaComponent
  ],
  imports: [
    SharedModule,
    PuntajeEvaluacionRoutingModule,
    SharedEmpresaModule
  ]
})
export class PuntajeEvaluacionModule { }
