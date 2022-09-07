import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ParametrosInicialesRoutingModule } from './parametros-iniciales-routing.module';
import { SharedEmpresaModule } from '../../nomina/empresa/shared-empresa/shared-empresa.module';

// Components
import { ButtonsImagenComponent } from './components/imagenes/buttons-imagen/buttons-imagen.component';
import { DataTableImagenesComponent } from './components/imagenes/data-table-imagenes/data-table-imagenes.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ImagenesComponent } from './pages/imagenes/imagenes.component';
import { ModalAddEditComponent } from './components/imagenes/modal-add-edit/modal-add-edit.component';
import { ParametrosInicialesComponent } from './pages/parametros-iniciales/parametros-iniciales.component';

@NgModule({
  declarations: [
    ButtonsImagenComponent,
    DataTableImagenesComponent,
    EmpresasComponent,
    ImagenesComponent,
    ModalAddEditComponent,
    ParametrosInicialesComponent
  ],
  imports: [
    SharedModule,
    ParametrosInicialesRoutingModule,
    SharedEmpresaModule
  ]
})
export class ParametrosInicialesModule { }
