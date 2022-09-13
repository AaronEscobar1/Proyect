import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { DenominacionRoutingModule } from './denominacion-routing.module';
import { SharedEmpresaModule } from '../../empresa/shared-empresa/shared-empresa.module';

// Components
import { DataTableDenominacionComponent } from './components/data-table-denominacion/data-table-denominacion.component';
import { DataTableMonedasComponent } from './components/data-table-monedas/data-table-monedas.component';
import { DenominacionComponent } from './pages/denominacion/denominacion.component';
import { DenominacionHomeComponent } from './pages/denominacion-home/denominacion-home.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';

@NgModule({
  declarations: [
    DataTableDenominacionComponent,
    DataTableMonedasComponent,
    DenominacionComponent,
    DenominacionHomeComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    TipoNominaComponent
  ],
  imports: [
    SharedModule,
    DenominacionRoutingModule,
    SharedEmpresaModule
  ]
})
export class DenominacionModule { }
