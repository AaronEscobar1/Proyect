import { NgModule } from '@angular/core';

// Modules
import { InstitucionesRoutingModule } from './instituciones-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedEmpresaModule } from '../../empresa/shared-empresa/shared-empresa.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataTableProgramasComponent } from './components/modal-add-edit/data-table-programas/data-table-programas.component';
import { DepositoTercerosComponent } from './components/modal-add-edit/deposito-terceros/deposito-terceros.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { InstitucionesComponent } from './pages/instituciones/instituciones.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    DataTableComponent,
    DataTableProgramasComponent,
    DepositoTercerosComponent,
    EmpresasComponent,
    InstitucionesComponent,
    ModalAddEditComponent,
    ModalPrintComponent
  ],
  imports: [
    SharedModule,
    InstitucionesRoutingModule,
    SharedEmpresaModule
  ]
})
export class InstitucionesModule { }
