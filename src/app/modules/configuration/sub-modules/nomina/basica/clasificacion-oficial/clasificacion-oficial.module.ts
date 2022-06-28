import { NgModule } from '@angular/core';

// Modules
import { ClasificacionOficialRoutingModule } from './clasificacion-oficial-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { ClasificacionOficialComponent } from './pages/clasificacion-oficial/clasificacion-oficial.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';


@NgModule({
  declarations: [
    ClasificacionOficialComponent,
    DataTableComponent,
    ModalPrintComponent,
    ModalAddEditComponent
  ],
  imports: [
    SharedModule,
    ClasificacionOficialRoutingModule
  ]
})
export class ClasificacionOficialModule { }
