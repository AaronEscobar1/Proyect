import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { ButtonsThreeTableComponent } from './components/buttons-three-table/buttons-three-table.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { DataTableEmpresaComponent } from './components/data-table-empresa/data-table-empresa.component';
import { DataTableNominaComponent } from './components/data-table-nomina/data-table-nomina.component';

@NgModule({
  declarations: [
    ButtonsThreeTableComponent,
    EmpresasComponent,
    DataTableEmpresaComponent,
    DataTableNominaComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ButtonsThreeTableComponent,
    EmpresasComponent,
    DataTableEmpresaComponent,
    DataTableNominaComponent,
  ]
})
export class SharedEmpresaModule { }
