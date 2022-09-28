import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ValoresTabuladorRoutingModule } from './valores-tabulador-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { ButtonsGradosComponent } from './components/grados-tabulador/buttons-grados/buttons-grados.component';
import { CargosTabuladorComponent } from './pages/cargos-tabulador/cargos-tabulador.component';
import { DataTableCargosComponent } from './components/cargos-tabulador/data-table-cargos/data-table-cargos.component';
import { DataTableComponent } from './components/grados-tabulador/data-table/data-table.component';
import { DataTableValoresComponent } from './components/valores-grados-tabuladores/data-table-valores/data-table-valores.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { GradosTabuladorComponent } from './pages/grados-tabulador/grados-tabulador.component';
import { ModalAddEditCargoComponent } from './components/cargos-tabulador/modal-add-edit-cargo/modal-add-edit-cargo.component';
import { ModalAddEditComponent } from './components/grados-tabulador/modal-add-edit/modal-add-edit.component';
import { ModalAddEditValoresComponent } from './components/valores-grados-tabuladores/modal-add-edit-valores/modal-add-edit-valores.component';
import { ModalPrintCargoComponent } from './components/cargos-tabulador/modal-print-cargo/modal-print-cargo.component';
import { ModalPrintComponent } from './components/grados-tabulador/modal-print/modal-print.component';
import { ModalPrintValoresComponent } from './components/valores-grados-tabuladores/modal-print-valores/modal-print-valores.component';
import { ValoresGradosTabuladorComponent } from './pages/valores-grados-tabulador/valores-grados-tabulador.component';

@NgModule({
  declarations: [
    ButtonsGradosComponent,
    CargosTabuladorComponent,
    DataTableCargosComponent,
    DataTableComponent,
    DataTableValoresComponent,
    EmpresasComponent,
    GradosTabuladorComponent,
    ModalAddEditCargoComponent,
    ModalAddEditComponent,
    ModalAddEditValoresComponent,
    ModalPrintCargoComponent,
    ModalPrintComponent,
    ModalPrintValoresComponent,
    ValoresGradosTabuladorComponent
  ],
  imports: [
    SharedModule,
    ValoresTabuladorRoutingModule,
    SharedEmpresaModule
  ]
})
export class ValoresTabuladorModule { }
