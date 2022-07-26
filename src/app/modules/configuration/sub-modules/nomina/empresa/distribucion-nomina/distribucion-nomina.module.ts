import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { DistribucionNominaRoutingModule } from './distribucion-nomina-routing.module';
import { CompaniaModule } from '../empresas/compania.module';

// Components
import { ButtonsDistribucionComponent } from './components/buttons-distribucion/buttons-distribucion.component';
import { DataTableDistribucionComponent } from './components/data-table-distribucion/data-table-distribucion.component';
import { DistribucionNominaComponent } from './pages/distribucion-nomina/distribucion-nomina.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    ButtonsDistribucionComponent,
    DataTableDistribucionComponent,
    DistribucionNominaComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    DistribucionNominaRoutingModule,
    CompaniaModule
  ]
})
export class DistribucionNominaModule { }
