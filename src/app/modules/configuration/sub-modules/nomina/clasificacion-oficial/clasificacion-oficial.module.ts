import { NgModule } from '@angular/core';

// Modules
import { ClasificacionOficialRoutingModule } from './clasificacion-oficial-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';

// Components
import { ClasificacionOficialComponent } from './pages/clasificacion-oficial/clasificacion-oficial.component';
import { DataTableComponent } from './components/data-table/data-table.component';


@NgModule({
  declarations: [
    ClasificacionOficialComponent,
    DataTableComponent
  ],
  imports: [
    SharedModule,
    ClasificacionOficialRoutingModule
  ]
})
export class ClasificacionOficialModule { }
