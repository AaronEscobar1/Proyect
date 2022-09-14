import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ClaseInformacionRoutingModule } from './clase-informacion-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components
import { ButtonClaseInfoComponent } from './components/clase-informacion/button-clase-info/button-clase-info.component';
import { ClaseInformacionComponent } from './pages/clase-informacion/clase-informacion.component';
import { DataTableClaseInfoComponent } from './components/clase-informacion/data-table-clase-info/data-table-clase-info.component';
import { DataTableTipoInfoComponent } from './components/tipo-informacion/data-table-tipo-info/data-table-tipo-info.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ModalAddEditComponent } from './components/clase-informacion/modal-add-edit/modal-add-edit.component';
import { ModalAddEditTipoComponent } from './components/tipo-informacion/modal-add-edit-tipo/modal-add-edit-tipo.component';
import { ModalPrintComponent } from './components/clase-informacion/modal-print/modal-print.component';
import { ModalPrintTipoComponent } from './components/tipo-informacion/modal-print-tipo/modal-print-tipo.component';
import { TipoInformacionComponent } from './pages/tipo-informacion/tipo-informacion.component';

@NgModule({
  declarations: [
    ButtonClaseInfoComponent,
    ClaseInformacionComponent,
    DataTableClaseInfoComponent,
    DataTableTipoInfoComponent,
    EmpresasComponent,
    ModalAddEditComponent,
    ModalAddEditTipoComponent,
    ModalPrintComponent,
    ModalPrintTipoComponent,
    TipoInformacionComponent
  ],
  imports: [
    SharedModule,
    ClaseInformacionRoutingModule,
    SharedEmpresaModule
  ]
})
export class ClaseInformacionModule { }
