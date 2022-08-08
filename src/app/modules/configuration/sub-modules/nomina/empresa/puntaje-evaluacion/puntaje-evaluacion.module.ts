import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { PuntajeEvaluacionRoutingModule } from './puntaje-evaluacion-routing.module';

// Components
import { ButtonsPuntajeComponent } from './components/components-puntaje-evaluacion/buttons-puntaje/buttons-puntaje.component';
import { DataTableEmpresaComponent } from './components/data-table-empresa/data-table-empresa.component';
import { DataTableNominaComponent } from './components/data-table-nomina/data-table-nomina.component';
import { DataTablePuntajeComponent } from './components/components-puntaje-evaluacion/data-table-puntaje/data-table-puntaje.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/components-puntaje-evaluacion/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/components-puntaje-evaluacion/modal-print/modal-print.component';
import { PuntajeEvaluacionComponent } from './pages/puntaje-evaluacion/puntaje-evaluacion.component';
import { PuntajeEvaluacionHomeComponent } from './pages/puntaje-evaluacion-home/puntaje-evaluacion-home.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';

@NgModule({
  declarations: [
    ButtonsPuntajeComponent,
    DataTableEmpresaComponent,
    DataTableNominaComponent,
    DataTablePuntajeComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    PuntajeEvaluacionComponent,
    PuntajeEvaluacionHomeComponent,
    TipoNominaComponent
  ],
  imports: [
    SharedModule,
    PuntajeEvaluacionRoutingModule
  ]
})
export class PuntajeEvaluacionModule { }
