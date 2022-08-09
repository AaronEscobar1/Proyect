import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { DistribucionNominaRoutingModule } from './distribucion-nomina-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { DataTableDistribucionComponent } from './components/data-table-distribucion/data-table-distribucion.component';
import { DistribucionNominaComponent } from './pages/distribucion-nomina/distribucion-nomina.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    DataTableDistribucionComponent,
    DistribucionNominaComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    DistribucionNominaRoutingModule,
    SharedEmpresaModule
  ]
})
export class DistribucionNominaModule { }
