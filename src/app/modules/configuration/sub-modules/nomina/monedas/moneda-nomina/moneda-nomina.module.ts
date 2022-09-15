import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { MonedaNominaRoutingModule } from './moneda-nomina-routing.module';
import { SharedEmpresaModule } from '../../empresa/shared-empresa/shared-empresa.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { MonedaNominaHomeComponent } from './pages/moneda-nomina-home/moneda-nomina-home.component';
import { MonedaNominaComponent } from './pages/moneda-nomina/moneda-nomina.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';


@NgModule({
  declarations: [
    DataTableComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    MonedaNominaHomeComponent,
    MonedaNominaComponent,
    TipoNominaComponent
  ],
  imports: [
    SharedModule,
    MonedaNominaRoutingModule,
    SharedEmpresaModule
  ]
})
export class MonedaNominaModule { }
