import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ValoresTabuladorRoutingModule } from './valores-tabulador-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { CargosTabuladorComponent } from './pages/cargos-tabulador/cargos-tabulador.component';
import { DataTableCargosComponent } from './components/cargos-tabulador/data-table-cargos/data-table-cargos.component';
import { DataTableComponent } from './components/grados-tabulador/data-table/data-table.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/grados-tabulador/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/grados-tabulador/modal-print/modal-print.component';
import { ValoresTabuladorComponent } from './pages/valores-tabulador/valores-tabulador.component';

@NgModule({
  declarations: [
    CargosTabuladorComponent,
    DataTableCargosComponent,
    DataTableComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    ValoresTabuladorComponent
  ],
  imports: [
    SharedModule,
    ValoresTabuladorRoutingModule,
    SharedEmpresaModule
  ]
})
export class ValoresTabuladorModule { }
