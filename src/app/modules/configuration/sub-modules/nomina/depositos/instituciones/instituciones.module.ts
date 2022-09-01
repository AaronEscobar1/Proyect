import { NgModule } from '@angular/core';

// Modules
import { InstitucionesRoutingModule } from './instituciones-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedEmpresaModule } from '../../empresa/shared-empresa/shared-empresa.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { InstitucionesComponent } from './pages/instituciones/instituciones.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';

@NgModule({
  declarations: [
    DataTableComponent,
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
