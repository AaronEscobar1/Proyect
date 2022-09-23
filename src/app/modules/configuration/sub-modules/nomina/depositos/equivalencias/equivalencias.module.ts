import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedEmpresaModule } from '../../empresa/shared-empresa/shared-empresa.module';
import { EquivalenciasRoutingModule } from './equivalencias-routing.module';

// Components
import { DataTableEquivalenciasComponent } from './components/equivalencias/data-table-equivalencias/data-table-equivalencias.component';
import { DataTableInstitucionesComponent } from './components/data-table-instituciones/data-table-instituciones.component';
import { DataTableTipoInstitucionComponent } from './components/data-table-tipo-institucion/data-table-tipo-institucion.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { EquivalenciasComponent } from './pages/equivalencias/equivalencias.component';
import { ModalPrintComponent } from './components/equivalencias/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/equivalencias/modal-add-edit/modal-add-edit.component';


@NgModule({
  declarations: [
    DataTableEquivalenciasComponent,
    DataTableInstitucionesComponent,
    DataTableTipoInstitucionComponent,
    EmpresasComponent,
    EquivalenciasComponent,
    ModalPrintComponent,
    ModalAddEditComponent
  ],
  imports: [
    SharedModule,
    EquivalenciasRoutingModule,
    SharedEmpresaModule
  ]
})
export class EquivalenciasModule { }
