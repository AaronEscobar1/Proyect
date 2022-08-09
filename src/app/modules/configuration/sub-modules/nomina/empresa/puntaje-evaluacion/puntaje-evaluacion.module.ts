import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { PuntajeEvaluacionRoutingModule } from './puntaje-evaluacion-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { DataTablePuntajeComponent } from './components/data-table-puntaje/data-table-puntaje.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { PuntajeEvaluacionComponent } from './pages/puntaje-evaluacion/puntaje-evaluacion.component';
import { PuntajeEvaluacionHomeComponent } from './pages/puntaje-evaluacion-home/puntaje-evaluacion-home.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';

@NgModule({
  declarations: [
    DataTablePuntajeComponent,
    ModalAddEditComponent,
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
