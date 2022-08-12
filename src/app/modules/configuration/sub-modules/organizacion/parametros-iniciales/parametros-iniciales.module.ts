import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ParametrosInicialesRoutingModule } from './parametros-iniciales-routing.module';
import { SharedEmpresaModule } from '../../nomina/empresa/shared-empresa/shared-empresa.module';

// Components
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ParametrosInicialesComponent } from './pages/parametros-iniciales/parametros-iniciales.component';

@NgModule({
  declarations: [
    EmpresasComponent,
    ParametrosInicialesComponent,
  ],
  imports: [
    SharedModule,
    ParametrosInicialesRoutingModule,
    SharedEmpresaModule
  ]
})
export class ParametrosInicialesModule { }
