import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ValoresTabuladorRoutingModule } from './valores-tabulador-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { ValoresTabuladorComponent } from './pages/valores-tabulador/valores-tabulador.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    DataTableComponent,
    ValoresTabuladorComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    ValoresTabuladorRoutingModule,
    SharedEmpresaModule
  ]
})
export class ValoresTabuladorModule { }
